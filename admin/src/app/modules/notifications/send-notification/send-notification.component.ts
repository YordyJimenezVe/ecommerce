import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from '../../auth';

@Component({
    selector: 'app-send-notification',
    templateUrl: './send-notification.component.html',
    styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {
    isAdmin = false;
    isCompanyAdmin = false;
    sending = false;
    showHistory = false;
    historyLoading = false;
    successMsg = '';
    errorMsg = '';
    history: any[] = [];
    targets: any = { companies: [], staff: [] };
    selectedCompanyIds: number[] = [];
    selectedStaffIds: number[] = [];
    companySearch = '';
    staffSearch = '';

    form = {
        target_type: 'all_companies',
        title: '',
        message: '',
        type: 'info',
        icon: 'fas fa-bell',
        color: '#6366f1',
        link: '',
    };

    targetOptions: any[] = [];

    notifTypes = [
        { value: 'info', label: 'Info', icon: 'ℹ️', color: '#6366f1', notifIcon: 'fas fa-info-circle' },
        { value: 'success', label: 'Éxito', icon: '✅', color: '#22c55e', notifIcon: 'fas fa-check-circle' },
        { value: 'warning', label: 'Aviso', icon: '⚠️', color: '#f59e0b', notifIcon: 'fas fa-exclamation-triangle' },
        { value: 'danger', label: 'Urgente', icon: '🔴', color: '#ef4444', notifIcon: 'fas fa-times-circle' },
        { value: 'system', label: 'Sistema', icon: '⚙️', color: '#0ea5e9', notifIcon: 'fas fa-cog' },
    ];

    constructor(
        private notifService: NotificationService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        const user = this.authService.user;
        const role = (user?.role?.name || '').toLowerCase();
        this.isAdmin = ['super_admin', 'administrador general', 'soporte'].some(r => role.includes(r));
        this.isCompanyAdmin = !this.isAdmin && (role.includes('admin') || role.includes('empresa'));

        if (this.isAdmin) {
            this.targetOptions = [
                { value: 'all_companies', icon: '🏢', label: 'Todas las Empresas' },
                { value: 'company', icon: '🎯', label: 'Empresa Específica' },
                { value: 'user', icon: '👤', label: 'Usuario Específico' },
                { value: 'company_staff', icon: '👥', label: 'Staff Administrativo' },
            ];
            this.form.target_type = 'all_companies';
        } else {
            this.targetOptions = [
                { value: 'company_staff', icon: '👥', label: 'Mi Equipo (todos)' },
                { value: 'user', icon: '👤', label: 'Miembro Específico' },
            ];
            this.form.target_type = 'company_staff';
        }

        this.loadTargets();
    }

    loadTargets() {
        this.notifService.getTargets().subscribe((data: any) => {
            this.targets = data;
            this.cdr.detectChanges();
        });
    }

    get filteredCompanies() {
        const q = this.companySearch.toLowerCase();
        return (this.targets.companies || []).filter((c: any) =>
            !q || c.name.toLowerCase().includes(q));
    }

    get filteredStaff() {
        const q = this.staffSearch.toLowerCase();
        return (this.targets.staff || []).filter((u: any) =>
            !q || `${u.name} ${u.surname} ${u.email}`.toLowerCase().includes(q));
    }

    selectTarget(val: string) {
        this.form.target_type = val;
        this.selectedCompanyIds = [];
        this.selectedStaffIds = [];
    }

    toggleId(id: number, group: 'companies' | 'staff') {
        const arr = group === 'companies' ? this.selectedCompanyIds : this.selectedStaffIds;
        const idx = arr.indexOf(id);
        if (idx > -1) arr.splice(idx, 1);
        else arr.push(id);
    }

    selectType(t: any) {
        this.form.type = t.value;
        this.form.color = t.color;
        this.form.icon = t.notifIcon;
    }

    send() {
        if (!this.form.title || !this.form.message) return;
        this.sending = true;
        this.successMsg = '';
        this.errorMsg = '';

        const payload: any = { ...this.form };
        if (this.form.target_type === 'company') {
            payload.target_ids = this.selectedCompanyIds;
        } else if (this.form.target_type === 'user' || this.form.target_type === 'company_staff') {
            payload.target_ids = this.selectedStaffIds.length ? this.selectedStaffIds : undefined;
        }

        this.notifService.send(payload).subscribe((res: any) => {
            this.successMsg = `Enviado a ${res.sent} destinatario(s) exitosamente`;
            this.sending = false;
            this.resetForm();
            this.cdr.detectChanges();
            if (this.showHistory) this.loadHistory();
        }, (err) => {
            this.errorMsg = err.error?.message || 'Error al enviar';
            this.sending = false;
            this.cdr.detectChanges();
        });
    }

    resetForm() {
        this.form = {
            target_type: this.isAdmin ? 'all_companies' : 'company_staff',
            title: '', message: '', type: 'info',
            icon: 'fas fa-bell', color: '#6366f1', link: '',
        };
        this.selectedCompanyIds = [];
        this.selectedStaffIds = [];
        this.companySearch = '';
        this.staffSearch = '';
    }

    loadHistory() {
        this.historyLoading = true;
        this.notifService.getSentHistory().subscribe((data: any) => {
            this.history = data;
            this.historyLoading = false;
            this.cdr.detectChanges();
        }, () => { this.historyLoading = false; this.cdr.detectChanges(); });
    }

    get _showHistory() { return this.showHistory; }
    set _showHistory(val: boolean) {
        this.showHistory = val;
        if (val && !this.history.length) this.loadHistory();
    }
}
