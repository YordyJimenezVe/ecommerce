import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TicketService } from '../ticket.service';
import { AuthService } from '../../auth';

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit, OnDestroy {
    @ViewChild('messagesEnd') messagesEnd: ElementRef;

    ticket: any = null;
    loading = false;
    sending = false;
    closing = false;
    showAssign = false;
    showSurvey = false;
    surveySubmitting = false;
    selectedOperator: number | null = null;
    operators: any[] = [];
    replyText = '';
    selectedFiles: File[] = [];
    storageUrl = 'http://127.0.0.1:8000/storage/';
    isAdmin = false;
    starOptions = [1, 2, 3, 4, 5];
    latestMessageId = 0;

    private pollSub: Subscription;

    survey = {
        attention_rating: 0,
        issue_resolved: null as boolean | null,
        improvement_suggestion: ''
    };

    statusLabel: any = { open: 'Abierto', in_progress: 'En Progreso', closed: 'Cerrado' };
    categoryLabel: any = {
        billing: 'Facturación', technical: 'Técnico',
        account: 'Cuenta', suspension: 'Suspensión', other: 'Otro'
    };
    ratingLabel: any = { 1: 'Muy mala', 2: 'Mala', 3: 'Normal', 4: 'Buena', 5: 'Excelente' };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ticketService: TicketService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        const user = this.authService.user;
        const role = (user?.role?.name || '').toLowerCase();
        this.isAdmin = ['super_admin', 'administrador general', 'soporte', 'support']
            .some(r => role.includes(r)) || this.router.url.includes('/support/admin');

        const id = this.route.snapshot.paramMap.get('id');
        if (id && !isNaN(+id)) {
            this.loadTicket(+id);
        } else {
            this.router.navigate(['/support']);
        }
    }

    ngOnDestroy() {
        this.pollSub?.unsubscribe();
    }

    loadTicket(id: number) {
        this.loading = true;
        this.cdr.detectChanges();
        this.ticketService.getTicket(id).subscribe((data: any) => {
            this.ticket = data;
            // Track latest message id for polling
            const msgs = data.messages || [];
            this.latestMessageId = msgs.length ? msgs[msgs.length - 1].id : 0;
            this.loading = false;
            this.cdr.detectChanges();
            setTimeout(() => this.scrollToBottom(), 150);
            // Start polling only for open / in-progress tickets
            if (data.status !== 'closed') {
                this.startPolling(id);
            }
        }, (err) => {
            this.loading = false;
            this.cdr.detectChanges();
            if (err.status === 403 || err.status === 404) {
                this.router.navigate(['/support']);
            }
        });
    }

    private startPolling(ticketId: number) {
        this.pollSub?.unsubscribe();
        // Poll every 2 seconds for near-real-time updates
        this.pollSub = interval(2000).pipe(
            switchMap(() => this.ticketService.pollMessages(ticketId, this.latestMessageId))
        ).subscribe((res: any) => {
            if (res.messages && res.messages.length > 0) {
                // Append only truly new messages
                this.ticket = {
                    ...this.ticket,
                    messages: [...(this.ticket.messages || []), ...res.messages]
                };
                this.latestMessageId = res.latest_id;
                this.cdr.detectChanges();
                setTimeout(() => this.scrollToBottom(), 100);
            }
            // Sync status if ticket was closed remotely
            if (res.ticket_status && res.ticket_status !== this.ticket.status) {
                this.ticket = { ...this.ticket, status: res.ticket_status };
                this.cdr.detectChanges();
                if (res.ticket_status === 'closed') {
                    this.pollSub?.unsubscribe(); // stop polling for closed tickets
                }
            }
        }, () => { }); // silently ignore poll errors
    }

    sendReply() {
        if (!this.replyText.trim()) return;
        this.sending = true;
        const fd = new FormData();
        fd.append('message', this.replyText);
        this.selectedFiles.forEach(f => fd.append('attachments[]', f));

        this.ticketService.sendMessage(this.ticket.id, fd).subscribe((msg: any) => {
            this.ticket = { ...this.ticket, messages: [...(this.ticket.messages || []), msg] };
            this.latestMessageId = msg.id;
            if (this.isAdmin && this.ticket.status === 'open') {
                this.ticket.status = 'in_progress';
            }
            this.replyText = '';
            this.selectedFiles = [];
            this.sending = false;
            this.cdr.detectChanges();
            setTimeout(() => this.scrollToBottom(), 150);
        }, () => {
            this.sending = false;
            this.cdr.detectChanges();
        });
    }

    onFileSelect(event: any) {
        this.selectedFiles = Array.from(event.target.files);
    }

    closeTicket() {
        if (!confirm('¿Cerrar este ticket? Se enviará un resumen al cliente por correo.')) return;
        this.closing = true;
        this.ticketService.closeTicket(this.ticket.id).subscribe(() => {
            this.ticket = { ...this.ticket, status: 'closed', closed_at: new Date().toISOString() };
            this.closing = false;
            this.pollSub?.unsubscribe(); // stop polling on close
            this.cdr.detectChanges();
        }, (err) => {
            this.closing = false;
            this.cdr.detectChanges();
            alert('Error al cerrar el ticket: ' + (err.error?.message || err.statusText));
        });
    }

    confirmAssign() {
        if (!this.selectedOperator) return;
        this.ticketService.assignTicket(this.ticket.id, this.selectedOperator).subscribe((t: any) => {
            this.ticket = { ...this.ticket, assigned_to: t.assigned_to, status: t.status };
            this.showAssign = false;
            this.cdr.detectChanges();
        });
    }


    submitSurvey() {
        if (this.survey.attention_rating === 0 || this.survey.issue_resolved === null) return;
        this.surveySubmitting = true;
        this.ticketService.submitSurvey(this.ticket.id, this.survey).subscribe((s: any) => {
            this.ticket = { ...this.ticket, survey: s };
            this.showSurvey = false;
            this.surveySubmitting = false;
            this.cdr.detectChanges();
        }, (err) => {
            this.surveySubmitting = false;
            this.cdr.detectChanges();
            alert('Error al enviar encuesta: ' + (err.error?.message || err.statusText));
        });
    }

    getStars(rating: number): string {
        const r = Math.min(5, Math.max(0, Math.round(+rating || 0)));
        return '★'.repeat(r) + '☆'.repeat(5 - r);
    }

    private scrollToBottom() {
        try {
            if (this.messagesEnd?.nativeElement) {
                this.messagesEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (e) { }
    }
}
