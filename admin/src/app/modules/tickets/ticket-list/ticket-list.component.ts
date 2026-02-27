import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../ticket.service';
import { AuthService } from '../../auth';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
    tickets: any = null;
    loading = false;
    creating = false;
    showCreate = false;
    activeFilter = '';
    isAdmin = false;

    newTicket = { subject: '', description: '', category: 'other', priority: 'medium' };

    statusFilters = [
        { label: 'Todos', value: '' },
        { label: '🟡 Abiertos', value: 'open' },
        { label: '🔵 En Progreso', value: 'in_progress' },
        { label: '✅ Cerrados', value: 'closed' },
    ];

    priorities = [
        { value: 'low', label: 'Baja', icon: '🟢' },
        { value: 'medium', label: 'Media', icon: '🟡' },
        { value: 'high', label: 'Alta', icon: '🔴' },
    ];

    statusLabel: any = { open: 'Abierto', in_progress: 'En Progreso', closed: 'Cerrado' };
    categoryLabel: any = {
        billing: 'Facturación', technical: 'Técnico',
        account: 'Cuenta', suspension: 'Suspensión', other: 'Otro'
    };

    constructor(
        private ticketService: TicketService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        const user = this.authService.user;
        const role = (user?.role?.name || '').toLowerCase();
        const isAdminByRole = ['super_admin', 'administrador general', 'soporte', 'support']
            .some(r => role.includes(r));
        const isAdminByUrl = this.router.url.includes('/support/admin');
        this.isAdmin = isAdminByRole || isAdminByUrl;

        this.loadTickets();
    }

    loadTickets() {
        this.loading = true;
        this.cdr.detectChanges();
        const fn = this.isAdmin
            ? this.ticketService.getAllTickets(this.activeFilter || undefined)
            : this.ticketService.getMyTickets(this.activeFilter || undefined);

        fn.subscribe((data: any) => {
            this.tickets = data;
            this.loading = false;
            this.cdr.detectChanges();
        }, () => {
            this.loading = false;
            this.cdr.detectChanges();
        });
    }

    setFilter(status: string) {
        this.activeFilter = status;
        this.loadTickets();
    }

    createTicket() {
        if (!this.newTicket.subject.trim() || !this.newTicket.description.trim()) return;
        this.creating = true;
        this.ticketService.createTicket(this.newTicket).subscribe((t: any) => {
            this.showCreate = false;
            this.creating = false;
            this.newTicket = { subject: '', description: '', category: 'other', priority: 'medium' };
            this.router.navigate(['/support', t.id]);
        }, () => {
            this.creating = false;
            this.cdr.detectChanges();
        });
    }
}
