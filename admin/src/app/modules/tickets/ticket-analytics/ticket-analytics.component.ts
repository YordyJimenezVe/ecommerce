import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TicketService } from '../ticket.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
    selector: 'app-ticket-analytics',
    templateUrl: './ticket-analytics.component.html',
    styleUrls: ['./ticket-analytics.component.scss']
})
export class TicketAnalyticsComponent implements OnInit {
    data: any = null;
    loading = false;
    URL = URL_BACKEND;

    selectedCompanyId: number | null = null;

    categoryLabel: any = {
        billing: 'Facturación', technical: 'Técnico', account: 'Cuenta',
        suspension: 'Suspensión', other: 'Otro'
    };
    ratingLabel: any = { 1: 'Muy Mala ☆', 2: 'Mala ☆☆', 3: 'Normal ☆☆☆', 4: 'Buena ☆☆☆☆', 5: 'Excelente ☆☆☆☆☆' };

    constructor(
        private ticketService: TicketService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.loadAnalytics();
    }

    loadAnalytics(companyId?: number) {
        this.loading = true;
        this.selectedCompanyId = companyId || null;
        this.cdr.detectChanges();
        this.ticketService.getAnalytics(companyId).subscribe((d: any) => {
            this.data = d;
            this.loading = false;
            this.cdr.detectChanges();
        }, () => {
            this.loading = false;
            this.cdr.detectChanges();
        });
    }

    sendFeedbackTo(employee: any) {
        if (!employee || (!employee.user_id && !employee.assigned_to && !employee.assignedTo)) return;
        const employeeId = employee.user_id || employee.assignedTo?.id;
        const employeeName = employee.name || employee.assignedTo?.name;

        if (!employeeId) return;

        const message = window.prompt(`Enviar Feedback a ${employeeName}:\n\nEscribe el mensaje de retroalimentación que se enviará a su correo:`);

        if (message && message.trim().length > 0) {
            this.ticketService.sendEmployeeFeedback(employeeId, message).subscribe({
                next: () => alert('¡Enviado! El feedback ha sido enviado al correo del empleado exitosamente.'),
                error: (err) => alert(`Fallo al enviar: ${err.error?.message || 'Error del servidor'}`)
            });
        }
    }

    getBarWidth(count: number): number {
        const max = Math.max(...(this.data?.category_stats?.map((c: any) => +c.total) || [1]));
        return max > 0 ? (+count / max) * 100 : 0;
    }

    getRatingWidth(count: number): number {
        const max = Math.max(...(this.data?.rating_distribution?.map((r: any) => +r.total) || [1]));
        return max > 0 ? (+count / max) * 100 : 0;
    }

    getStars(rating: number): string {
        const r = Math.min(5, Math.max(0, Math.round(+rating || 0)));
        return '★'.repeat(r) + '☆'.repeat(5 - r);
    }

    formatRating(rating: number): string {
        return (+rating || 0).toFixed(1);
    }

    // Pagination for AI summaries
    aiPageIndex = 0;
    aiPageSize = 8;

    nextAiPage() {
        if (this.canNextAiPage()) {
            this.aiPageIndex++;
            this.cdr.detectChanges();
        }
    }

    prevAiPage() {
        if (this.aiPageIndex > 0) {
            this.aiPageIndex--;
            this.cdr.detectChanges();
        }
    }

    canNextAiPage(): boolean {
        return (this.aiPageIndex + 1) * this.aiPageSize < (this.data?.ai_recent_summaries?.length || 0);
    }

    get totalAiPages(): number {
        return Math.ceil((this.data?.ai_recent_summaries?.length || 0) / this.aiPageSize);
    }

    getPaginatedAiSummaries() {
        if (!this.data?.ai_recent_summaries) return [];
        const start = this.aiPageIndex * this.aiPageSize;
        return this.data.ai_recent_summaries.slice(start, start + this.aiPageSize);
    }

    getAiResolvedCount(status: string): number {
        return this.data?.ai_resolved_counts?.[status] || 0;
    }
}
