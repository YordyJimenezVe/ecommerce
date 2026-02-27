import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../auth';

@Injectable({ providedIn: 'root' })
export class TicketService {
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private auth: AuthService) { }

    private headers() {
        return new HttpHeaders({ Authorization: 'Bearer ' + this.auth.token });
    }

    // ─── Company endpoints ─────────────────────────────────────────────────────
    getMyTickets(status?: string): Observable<any> {
        this.isLoading$.next(true);
        const params = status ? `?status=${status}` : '';
        return this.http.get(`${URL_SERVICIOS}/tickets/${params}`, { headers: this.headers() })
            .pipe(finalize(() => this.isLoading$.next(false)));
    }

    getTicket(id: number): Observable<any> {
        return this.http.get(`${URL_SERVICIOS}/tickets/${id}`, { headers: this.headers() });
    }

    pollMessages(ticketId: number, afterId: number): Observable<any> {
        return this.http.get(`${URL_SERVICIOS}/tickets/${ticketId}/messages?after_id=${afterId}`, { headers: this.headers() });
    }

    createTicket(data: any): Observable<any> {
        this.isLoading$.next(true);
        return this.http.post(`${URL_SERVICIOS}/tickets/`, data, { headers: this.headers() })
            .pipe(finalize(() => this.isLoading$.next(false)));
    }

    sendMessage(ticketId: number, formData: FormData): Observable<any> {
        // The backend detects isStaff by the token, so one endpoint works for all
        return this.http.post(`${URL_SERVICIOS}/tickets/${ticketId}/messages`, formData, { headers: this.headers() });
    }

    submitSurvey(ticketId: number, data: any): Observable<any> {
        return this.http.post(`${URL_SERVICIOS}/tickets/${ticketId}/survey`, data, { headers: this.headers() });
    }

    // ─── Admin endpoints ──────────────────────────────────────────────────────
    getAllTickets(status?: string, companyId?: number): Observable<any> {
        this.isLoading$.next(true);
        let params = '';
        if (status) params += `?status=${status}`;
        if (companyId) params += `${params ? '&' : '?'}company_id=${companyId}`;
        return this.http.get(`${URL_SERVICIOS}/admin/tickets/${params}`, { headers: this.headers() })
            .pipe(finalize(() => this.isLoading$.next(false)));
    }

    getAdminTicket(id: number): Observable<any> {
        return this.http.get(`${URL_SERVICIOS}/tickets/${id}`, { headers: this.headers() });
    }

    adminSendMessage(ticketId: number, formData: FormData): Observable<any> {
        return this.http.post(`${URL_SERVICIOS}/tickets/${ticketId}/messages`, formData, { headers: this.headers() });
    }

    closeTicket(id: number): Observable<any> {
        return this.http.post(`${URL_SERVICIOS}/admin/tickets/${id}/close`, {}, { headers: this.headers() });
    }

    assignTicket(id: number, assignedTo: number): Observable<any> {
        return this.http.post(`${URL_SERVICIOS}/admin/tickets/${id}/assign`, { assigned_to: assignedTo }, { headers: this.headers() });
    }

    getAnalytics(): Observable<any> {
        return this.http.get(`${URL_SERVICIOS}/admin/tickets/analytics`, { headers: this.headers() });
    }
}
