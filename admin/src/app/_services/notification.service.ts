import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../modules/auth';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    unreadCount$ = new BehaviorSubject<number>(0);
    notifications$ = new BehaviorSubject<any[]>([]);

    private pollSub: Subscription;

    constructor(private http: HttpClient, private auth: AuthService) { }

    private headers() {
        return new HttpHeaders({ Authorization: 'Bearer ' + this.auth.token });
    }

    // ─── Start polling every 30s ──────────────────────────────────────────────
    startPolling() {
        if (this.pollSub) return;
        this.pollSub = interval(30000).pipe(startWith(0),
            switchMap(() => this.http.get<any>(`${URL_SERVICIOS}/notifications/unread-count`, { headers: this.headers() }))
        ).subscribe(res => this.unreadCount$.next(res.unread_count || 0));
    }

    stopPolling() {
        this.pollSub?.unsubscribe();
        this.pollSub = null;
    }

    // ─── Load notifications ───────────────────────────────────────────────────
    load() {
        return this.http.get<any>(`${URL_SERVICIOS}/notifications`, { headers: this.headers() });
    }

    markRead(id: number) {
        return this.http.post(`${URL_SERVICIOS}/notifications/read/${id}`, {}, { headers: this.headers() });
    }

    markAllRead() {
        return this.http.post(`${URL_SERVICIOS}/notifications/read-all`, {}, { headers: this.headers() });
    }

    delete(id: number) {
        return this.http.delete(`${URL_SERVICIOS}/notifications/${id}`, { headers: this.headers() });
    }

    // ─── Admin send ───────────────────────────────────────────────────────────
    send(payload: any) {
        return this.http.post(`${URL_SERVICIOS}/notifications/send`, payload, { headers: this.headers() });
    }

    getTargets() {
        return this.http.get<any>(`${URL_SERVICIOS}/notifications/targets`, { headers: this.headers() });
    }

    getSentHistory() {
        return this.http.get<any[]>(`${URL_SERVICIOS}/notifications/sent-history`, { headers: this.headers() });
    }
}
