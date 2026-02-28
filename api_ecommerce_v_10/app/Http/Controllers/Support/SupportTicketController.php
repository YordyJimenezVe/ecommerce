<?php

namespace App\Http\Controllers\Support;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use App\Models\TicketMessage;
use App\Models\TicketDailyNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SupportTicketController extends Controller
{
    // ─── Company: List my tickets ───────────────────────────────────────────
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = SupportTicket::with(['creator', 'assignedTo', 'survey'])
            ->where('company_id', $user->company_id);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $tickets = $query->orderByDesc('created_at')->paginate(15);
        return response()->json($tickets);
    }

    // ─── Admin: List all tickets ─────────────────────────────────────────────
    public function adminIndex(Request $request)
    {
        $query = SupportTicket::with(['company', 'creator', 'assignedTo', 'survey']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('company_id')) {
            $query->where('company_id', $request->company_id);
        }

        $tickets = $query->orderByDesc('created_at')->paginate(20);
        return response()->json($tickets);
    }

    // ─── Create ticket ───────────────────────────────────────────────────────
    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:billing,technical,account,suspension,other',
            'priority' => 'sometimes|in:low,medium,high',
        ]);

        $user = Auth::user();
        $ticket = SupportTicket::create([
            'company_id' => $user->company_id,
            'created_by' => $user->id,
            'subject' => $request->subject,
            'description' => $request->description,
            'category' => $request->category,
            'priority' => $request->priority ?? 'medium',
            'status' => 'open',
        ]);

        // First message = description
        $ticket->messages()->create([
            'user_id' => $user->id,
            'message' => $request->description,
            'is_from_staff' => false,
        ]);

        return response()->json($ticket->load(['messages.user', 'assignedTo']), 201);
    }

    // ─── Show ticket detail ───────────────────────────────────────────────────
    public function show($id)
    {
        $user = Auth::user();
        $ticket = SupportTicket::with(['messages.user', 'assignedTo', 'creator', 'company', 'survey'])->findOrFail($id);

        // Company users can only see their own tickets
        if (!$this->isStaff($user) && $ticket->company_id !== $user->company_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json($ticket);
    }

    // ─── Polling: Get messages newer than a given ID ──────────────────────────
    public function getMessages(Request $request, $id)
    {
        $user = Auth::user();
        $ticket = SupportTicket::findOrFail($id);

        if (!$this->isStaff($user) && $ticket->company_id !== $user->company_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $afterId = $request->query('after_id', 0);
        $messages = $ticket->messages()
            ->with('user:id,name,surname')
            ->where('id', '>', $afterId)
            ->orderBy('id')
            ->get();

        return response()->json([
            'messages' => $messages,
            'ticket_status' => $ticket->status,
            'latest_id' => $messages->last()?->id ?? $afterId,
        ]);
    }

    // ─── Send a message ───────────────────────────────────────────────────────
    public function sendMessage(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
            'attachments' => 'sometimes|array',
            'attachments.*' => 'file|mimes:jpg,jpeg,png,gif,pdf,docx,txt|max:5120',
        ]);

        $user = Auth::user();
        $ticket = SupportTicket::findOrFail($id);

        if (!$this->isStaff($user) && $ticket->company_id !== $user->company_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if ($ticket->status === 'closed') {
            return response()->json(['message' => 'Cannot reply to a closed ticket.'], 422);
        }

        // Handle file uploads
        $attachmentPaths = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('tickets/attachments', 'public');
                $attachmentPaths[] = $path;
            }
        }

        // If staff replies, update status to in_progress
        $isStaff = $this->isStaff($user);
        if ($isStaff && $ticket->status === 'open') {
            $ticket->update(['status' => 'in_progress', 'assigned_to' => $user->id]);
        }

        $message = $ticket->messages()->create([
            'user_id' => $user->id,
            'message' => $request->message,
            'attachments' => count($attachmentPaths) ? $attachmentPaths : null,
            'is_from_staff' => $isStaff,
        ]);

        // Send daily notification email to client if this is first staff response today
        if ($isStaff && !$ticket->wasDailyNotificationSentToday()) {
            $this->sendDailyNotificationEmail($ticket, $message);
            TicketDailyNotification::create([
                'ticket_id' => $ticket->id,
                'notification_date' => today(),
                'sent_at' => now(),
            ]);
        }

        return response()->json($message->load('user'), 201);
    }

    // ─── Admin: Close ticket ──────────────────────────────────────────────────
    public function close($id)
    {
        $user = Auth::user();
        if (!$this->isStaff($user)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $ticket = SupportTicket::with(['messages.user', 'assignedTo', 'creator'])->findOrFail($id);
        if ($ticket->status === 'closed') {
            return response()->json(['message' => 'Ticket is already closed.'], 422);
        }

        $ticket->update(['status' => 'closed', 'closed_at' => now()]);

        // Send summary email to the client (wrapped so failure doesn't block close)
        $this->sendClosureSummaryEmail($ticket);

        // Auto-run AI analysis in background (non-blocking)
        $this->runAndStoreAiAnalysis($ticket);

        return response()->json(['message' => 'Ticket closed. Summary sent to client.', 'ticket' => $ticket]);
    }

    // ─── Internal: Analyze ticket with AI and store result ────────────────────
    private function runAndStoreAiAnalysis(SupportTicket $ticket): void
    {
        try {
            $apiKey = env('GEMINI_API_KEY') ?? env('OPENAI_API_KEY');
            if (!$apiKey || $ticket->messages->isEmpty())
                return;

            $conversation = $ticket->messages->map(function ($msg) {
                $role = $msg->is_from_staff ? 'Agente' : 'Cliente';
                return "[{$role}]: {$msg->message}";
            })->implode("\n");

            $prompt = "Eres un analista de calidad de servicio al cliente para Megarys.\n"
                . "Analiza la siguiente conversación de soporte y responde SOLO con JSON válido con estas claves:\n"
                . "staff_rating (1-5), treated_poorly (bool), poor_treatment_reason (string|null), "
                . "main_issue (string), resolved (string: sí/no/parcialmente), summary (string 2 frases)\n\n"
                . "Conversación:\n{$conversation}";

            $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";
            $body = ['contents' => [['parts' => [['text' => $prompt]]]]];

            $response = \Illuminate\Support\Facades\Http::timeout(15)->post($url, $body);
            $raw = $response->json('candidates.0.content.parts.0.text', '{}');
            $raw = preg_replace('/```json\s*|\s*```/', '', $raw);
            $data = json_decode($raw, true);

            if ($data) {
                // Store on the ticket record itself (add ai_analysis column if needed)
                // For now store in a dedicated JSON column or log it
                \App\Models\TicketAiAnalysis::updateOrCreate(
                    ['ticket_id' => $ticket->id],
                    [
                        'staff_rating' => $data['staff_rating'] ?? null,
                        'treated_poorly' => $data['treated_poorly'] ?? false,
                        'poor_treatment_reason' => $data['poor_treatment_reason'] ?? null,
                        'main_issue' => $data['main_issue'] ?? null,
                        'resolved' => $data['resolved'] ?? null,
                        'summary' => $data['summary'] ?? null,
                        'analyzed_at' => now(),
                    ]
                );
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning('Auto AI analysis failed for ticket ' . $ticket->id . ': ' . $e->getMessage());
        }
    }

    // ─── Admin: Assign ticket ─────────────────────────────────────────────────
    public function assign(Request $request, $id)
    {
        $user = Auth::user();
        if (!$this->isStaff($user)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate(['assigned_to' => 'required|exists:users,id']);
        $ticket = SupportTicket::findOrFail($id);
        $ticket->update(['assigned_to' => $request->assigned_to, 'status' => 'in_progress']);

        return response()->json($ticket->load('assignedTo'));
    }

    // ─── Submit survey ────────────────────────────────────────────────────────
    public function submitSurvey(Request $request, $id)
    {
        $request->validate([
            'attention_rating' => 'required|integer|min:1|max:5',
            'issue_resolved' => 'required|boolean',
            'improvement_suggestion' => 'nullable|string|max:1000',
        ]);

        $user = Auth::user();
        $ticket = SupportTicket::findOrFail($id);

        if ($ticket->company_id !== $user->company_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        if ($ticket->status !== 'closed') {
            return response()->json(['message' => 'Survey available only after ticket is closed.'], 422);
        }
        if ($ticket->survey) {
            return response()->json(['message' => 'Survey already submitted.'], 422);
        }

        $survey = $ticket->survey()->create([
            'attention_rating' => $request->attention_rating,
            'issue_resolved' => $request->issue_resolved,
            'improvement_suggestion' => $request->improvement_suggestion,
        ]);

        return response()->json($survey, 201);
    }

    // ─── Admin: Analytics ─────────────────────────────────────────────────────
    public function analytics(Request $request)
    {
        $user = Auth::user();
        $roleName = $user->role ? strtolower($user->role->name) : '';
        $isSuperAdmin = in_array($roleName, ['super_admin', 'administrador general', 'soporte', 'support']) || strtolower($user->email) === 'yordyalejandro13@gmail.com';
        $isCompanyAdmin = strtolower($roleName) === strtolower('ADMINISTRADOR DE EMPRESA');

        if (!$isSuperAdmin && !$isCompanyAdmin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $companyId = $isSuperAdmin ? $request->company_id : $user->company_id;

        // Fetch companies list for super admins
        $companiesList = [];
        if ($isSuperAdmin) {
            $companiesList = \App\Models\Company::select('id', 'name', 'logotipo')->get();
        }

        // Ticket stats by status
        $statusStats = SupportTicket::selectRaw('status, count(*) as total')
            ->when($companyId, function ($q) use ($companyId) {
                return $q->where('company_id', $companyId); })
            ->groupBy('status')
            ->pluck('total', 'status');

        // Stats by category
        $categoryStats = SupportTicket::selectRaw('category, count(*) as total')
            ->when($companyId, function ($q) use ($companyId) {
                return $q->where('company_id', $companyId); })
            ->groupBy('category')
            ->orderByDesc('total')
            ->get();

        $surveyQuery = \App\Models\TicketSurvey::join('support_tickets', 'support_tickets.id', '=', 'ticket_surveys.ticket_id');
        if ($companyId) {
            $surveyQuery->where('support_tickets.company_id', $companyId);
        }

        // Average ratings
        $avgRating = (clone $surveyQuery)->average('attention_rating');
        $totalSurveys = (clone $surveyQuery)->count();
        $resolutionRate = $totalSurveys > 0 ? ((clone $surveyQuery)->where('issue_resolved', true)->count() / $totalSurveys) * 100 : 0;

        // Rating distribution
        $ratingDistribution = (clone $surveyQuery)->selectRaw('attention_rating, count(*) as total')
            ->groupBy('attention_rating')
            ->orderBy('attention_rating')
            ->get();

        // Operator rankings (by assigned_to average rating, min 1 tickets closed)
        $operators = \App\Models\TicketSurvey::selectRaw(
            'support_tickets.assigned_to as user_id,
                 AVG(ticket_surveys.attention_rating) as avg_rating,
                 COUNT(ticket_surveys.id) as total_reviewed,
                 SUM(CASE WHEN ticket_surveys.issue_resolved = 1 THEN 1 ELSE 0 END) as resolved_count'
        )
            ->join('support_tickets', 'support_tickets.id', '=', 'ticket_surveys.ticket_id')
            ->when($companyId, function ($q) use ($companyId) {
                return $q->where('support_tickets.company_id', $companyId); })
            ->whereNotNull('support_tickets.assigned_to')
            ->groupBy('support_tickets.assigned_to')
            ->having('total_reviewed', '>=', 1)
            ->orderByDesc('avg_rating')
            ->get();

        // Attach user info
        $userIds = $operators->pluck('user_id')->toArray();
        $users = \App\Models\User::whereIn('id', $userIds)->get()->keyBy('id');
        $operators = $operators->map(function ($op) use ($users) {
            $opUser = $users->get($op->user_id);
            $op->name = $opUser ? $opUser->name . ' ' . $opUser->surname : 'Unknown';
            $op->email = $opUser ? $opUser->email : '';
            return $op;
        });

        $bestOperators = $operators->take(3);
        $worstOperators = $operators->sortBy('avg_rating')->take(3)->values();

        // Common improvement suggestions (from surveys)
        $recentSuggestions = (clone $surveyQuery)->whereNotNull('improvement_suggestion')
            ->orderByDesc('ticket_surveys.created_at')
            ->limit(20)
            ->pluck('improvement_suggestion');

        // ─── AI Analysis Stats ─────────────────────────────────────────────────
        $aiQuery = \App\Models\TicketAiAnalysis::join('support_tickets', 'support_tickets.id', '=', 'ticket_ai_analyses.ticket_id');
        if ($companyId) {
            $aiQuery->where('support_tickets.company_id', $companyId);
        }

        $aiAnalysesCount = (clone $aiQuery)->count();
        $avgAiStaffRating = $aiAnalysesCount > 0 ? round((clone $aiQuery)->avg('staff_rating'), 2) : null;
        $poorTreatmentCount = (clone $aiQuery)->where(function ($q) {
            $q->where('treated_poorly', 1)->orWhere('treated_poorly', true);
        })->count();
        $aiResolvedCounts = (clone $aiQuery)->selectRaw('resolved, count(*) as total')->groupBy('resolved')->pluck('total', 'resolved');
        $recentAiSummaries = (clone $aiQuery)->with(['ticket:id,subject,assigned_to', 'ticket.assignedTo:id,name,surname,email'])
            ->whereNotNull('summary')
            ->whereIn('staff_rating', [1, 2, 4, 5])
            ->orderByDesc('ticket_ai_analyses.analyzed_at')
            ->limit(30)
            ->get(['ticket_ai_analyses.ticket_id', 'staff_rating', 'treated_poorly', 'resolved', 'summary', 'analyzed_at', 'poor_treatment_reason']);

        \Illuminate\Support\Facades\Log::info("Analytics AI Stats: count={$aiAnalysesCount}, poor={$poorTreatmentCount}");

        return response()->json([
            'status_stats' => $statusStats,
            'category_stats' => $categoryStats,
            'avg_rating' => round((float) $avgRating, 2),
            'resolution_rate' => round((float) $resolutionRate, 1),
            'rating_distribution' => $ratingDistribution,
            'best_operators' => $bestOperators->values(),
            'worst_operators' => $worstOperators,
            'recent_suggestions' => $recentSuggestions,
            // AI analytics
            'ai_analyses_count' => $aiAnalysesCount,
            'ai_avg_staff_rating' => $avgAiStaffRating,
            'ai_poor_treatment' => $poorTreatmentCount,
            'ai_resolved_counts' => $aiResolvedCounts,
            'ai_recent_summaries' => $recentAiSummaries,
            // Companies list for filter (if applicable)
            'companies_list' => $companiesList,
            'selected_company_id' => $companyId,
        ]);
    }

    // ─── Admin: Send Feedback to Employee ─────────────────────────────────────
    public function sendFeedback(Request $request, $employee_id)
    {
        $request->validate([
            'message' => 'required|string|max:2500',
        ]);

        $user = Auth::user();
        $roleName = $user->role ? strtolower($user->role->name) : '';
        $isSuperAdmin = in_array($roleName, ['super_admin', 'administrador general', 'soporte', 'support']) || strtolower($user->email) === 'yordyalejandro13@gmail.com';
        $isCompanyAdmin = strtolower($roleName) === strtolower('ADMINISTRADOR DE EMPRESA');

        if (!$isSuperAdmin && !$isCompanyAdmin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $employee = \App\Models\User::with('company')->findOrFail($employee_id);

        if ($isCompanyAdmin && $employee->company_id !== $user->company_id) {
            return response()->json(['message' => 'You can only send feedback to employees of your own company.'], 403);
        }

        $company = $employee->company;
        $companyName = $company ? $company->name : 'Nuestra Empresa';
        $companyLogo = $company ? $company->logotipo : null;
        $color = $company && isset($company->colors) ? (is_array($company->colors) ? ($company->colors['primary'] ?? null) : json_decode($company->colors, true)['primary'] ?? null) : null;

        try {
            Mail::send('emails.employee_feedback', [
                'employeeName' => $employee->name,
                'feedbackMessage' => $request->message,
                'companyName' => $companyName,
                'companyLogo' => $companyLogo,
                'color' => $color,
            ], function ($m) use ($employee, $companyName) {
                $m->to($employee->email, $employee->name)
                    ->subject("Nuevo Feedback de Calidad - {$companyName}");
            });

            return response()->json(['message' => 'Feedback sent successfully.']);
        } catch (\Exception $e) {
            Log::error('Failed to send employee feedback email: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send feedback email. Please check server logs.'], 500);
        }
    }

    // ─── Admin: AI Analysis for single ticket ─────────────────────────────────
    public function aiAnalyzeTicket($id)
    {
        $user = Auth::user();
        if (!$this->isStaff($user)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $ticket = SupportTicket::with('messages.user')->findOrFail($id);

        // Build conversation text for AI
        $conversation = $ticket->messages->map(function ($msg) {
            $role = $msg->is_from_staff ? 'Agente Megarys' : 'Cliente';
            return "[{$role}]: {$msg->message}";
        })->implode("\n");

        $systemPrompt = <<<PROMPT
Eres un analista de calidad de servicio al cliente para Megarys. 
Analiza la siguiente conversación de soporte técnico y proporciona:
1. Calificación del trato al cliente por el equipo (1-5): ¿Fue amable, profesional, resolutivo?
2. ¿Fue el cliente tratado de forma inapropiada? (sí/no y por qué)
3. Categoría del problema principal
4. ¿Se resolvió el problema? (sí/no/parcialmente)
5. Resumen ejecutivo de 2 oraciones
Responde en formato JSON con las claves: staff_rating, treated_poorly, poor_treatment_reason, main_issue, resolved, summary
PROMPT;

        try {
            $apiKey = env('OPENAI_API_KEY') ?? env('GEMINI_API_KEY');
            if (!$apiKey) {
                return response()->json([
                    'analysis' => null,
                    'message' => 'AI not configured. Set OPENAI_API_KEY or GEMINI_API_KEY in .env'
                ]);
            }

            // Use Gemini API
            $geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";
            $body = [
                'contents' => [
                    [
                        'parts' => [
                            [
                                'text' => $systemPrompt . "\n\nConversación:\n" . $conversation
                            ]
                        ]
                    ]
                ]
            ];

            $response = \Illuminate\Support\Facades\Http::post($geminiUrl, $body);
            $text = $response->json('candidates.0.content.parts.0.text', '{}');
            // Clean markdown code blocks if present
            $text = preg_replace('/```json\s*|\s*```/', '', $text);
            $analysis = json_decode($text, true);

            return response()->json(['analysis' => $analysis, 'conversation_length' => $ticket->messages->count()]);
        } catch (\Exception $e) {
            Log::error('AI ticket analysis failed: ' . $e->getMessage());
            return response()->json(['analysis' => null, 'error' => $e->getMessage()]);
        }
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────
    private function isStaff($user): bool
    {
        $roleName = $user->role ? $user->role->name : '';
        return in_array(strtolower($roleName), ['super_admin', 'administrador general', 'soporte', 'support'])
            || strtolower($user->email) === 'yordyalejandro13@gmail.com';
    }

    private function sendDailyNotificationEmail(SupportTicket $ticket, TicketMessage $message): void
    {
        try {
            $clientEmail = $ticket->creator->email;
            $clientName = $ticket->creator->name;

            Mail::send('emails.ticket_notification', [
                'clientName' => $clientName,
                'ticketId' => $ticket->id,
                'subject' => $ticket->subject,
                'staffMessage' => $message->message,
                'ticketUrl' => env('FRONTEND_URL', 'http://localhost:4200') . '/support/tickets/' . $ticket->id,
            ], function ($m) use ($clientEmail, $clientName, $ticket) {
                $m->to($clientEmail, $clientName)
                    ->subject("Actualización en tu ticket #{$ticket->id}: {$ticket->subject}");
            });
        } catch (\Exception $e) {
            Log::error('Failed to send ticket notification email: ' . $e->getMessage());
        }
    }

    private function sendClosureSummaryEmail(SupportTicket $ticket): void
    {
        try {
            $clientEmail = $ticket->creator->email;
            $clientName = $ticket->creator->name;

            Mail::send('emails.ticket_closure', [
                'clientName' => $clientName,
                'ticket' => $ticket,
                'messages' => $ticket->messages,
                'surveyUrl' => env('FRONTEND_URL', 'http://localhost:4200') . '/support/tickets/' . $ticket->id . '/survey',
            ], function ($m) use ($clientEmail, $clientName, $ticket) {
                $m->to($clientEmail, $clientName)
                    ->subject("Ticket #{$ticket->id} Cerrado - Resumen de tu caso");
            });
        } catch (\Exception $e) {
            Log::error('Failed to send ticket closure email: ' . $e->getMessage());
        }
    }
}
