<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AIKnowledge;
use App\Models\AILog;

class AIStudioController extends Controller
{
    public function getKnowledges(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('GET_KNOWLEDGES_START');
        $company_id = $request->get('company_id');
        $query = AIKnowledge::with('company');

        if ($company_id) {
            $query->where('company_id', $company_id);
        }

        $knowledges = $query->get()->values();
        \Illuminate\Support\Facades\Log::info('GET_KNOWLEDGES_COUNT: ' . $knowledges->count());
        return response()->json(['knowledges' => $knowledges]);
    }

    public function storeKnowledge(Request $request)
    {
        $data = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'category' => 'nullable|string',
            'company_id' => 'nullable|exists:companies,id',
            'is_admin_only' => 'nullable|boolean'
        ]);

        $knowledge = AIKnowledge::create($data);
        return response()->json(['knowledge' => $knowledge]);
    }

    public function updateKnowledge(Request $request, $id)
    {
        $knowledge = AIKnowledge::findOrFail($id);
        $knowledge->update($request->all());
        return response()->json(['knowledge' => $knowledge]);
    }

    public function deleteKnowledge($id)
    {
        $knowledge = AIKnowledge::findOrFail($id);
        $knowledge->delete();
        return response()->json(['message' => 'Knowledge deleted']);
    }

    public function getLogs()
    {
        $logs = AILog::with('user')->latest()->get()->values();
        return response()->json(['logs' => $logs]);
    }

    public function askAI(Request $request)
    {
        $request->validate([
            'query' => 'required|string',
            'source' => 'nullable|string', // 'web' or 'admin'
            'company_id' => 'nullable|exists:companies,id'
        ]);

        $query = $request->input('query');
        $source = $request->input('source', 'web');
        $company_id = $request->input('company_id');
        $user = auth('api')->user();

        // BASE FILTERING
        $kbQuery = AIKnowledge::query();

        // 1. Multitenant Isolation: Knowledge must be Global (null) or match the company
        $kbQuery->where(function ($q) use ($company_id) {
            $q->whereNull('company_id');
            if ($company_id) {
                $q->orWhere('company_id', $company_id);
            }
        });

        // 2. Security: Web source cannot see admin-only knowledge
        if ($source === 'web') {
            $kbQuery->where('is_admin_only', false);
        }

        // 3. Search
        $match = $kbQuery->where('question', 'like', "%{$query}%")->first();

        $response = $match ? $match->answer : "Lo siento, no tengo una respuesta específica para eso. ¿Deseas contactar con un asesor humano?";
        $wasAnswered = $match ? true : false;

        AILog::create([
            'user_id' => $user->id ?? null,
            'query' => $query,
            'response' => $response,
            'was_answered' => $wasAnswered
        ]);

        return response()->json([
            'response' => $response,
            'was_answered' => $wasAnswered
        ]);
    }
}
