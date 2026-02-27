import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from '../../auth';

@Component({
    selector: 'app-notification-bell',
    templateUrl: './notification-bell.component.html',
    styleUrls: ['./notification-bell.component.scss']
})
export class NotificationBellComponent implements OnInit, OnDestroy {
    open = false;
    loading = false;
    notifications: any[] = [];
    unreadCount = 0;
    isAdmin = false;
    isCompanyAdmin = false;
    private sub: Subscription;

    constructor(
        private notifService: NotificationService,
        private authService: AuthService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        const user = this.authService.user;
        const role = (user?.role?.name || '').toLowerCase();
        this.isAdmin = ['super_admin', 'administrador general', 'soporte'].some(r => role.includes(r));
        this.isCompanyAdmin = role.includes('admin') || role.includes('empresa');

        this.sub = this.notifService.unreadCount$.subscribe(c => {
            this.unreadCount = c;
            this.cdr.detectChanges();
        });

        this.notifService.startPolling();
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

    @HostListener('document:click')
    onDocumentClick() {
        if (this.open) {
            this.open = false;
            this.cdr.detectChanges();
        }
    }

    togglePanel() {
        this.open = !this.open;
        if (this.open && this.notifications.length === 0) {
            this.loadNotifications();
        }
        this.cdr.detectChanges();
    }

    loadNotifications() {
        this.loading = true;
        this.notifService.load().subscribe((res: any) => {
            this.notifications = res.notifications || [];
            this.unreadCount = res.unread_count || 0;
            this.notifService.unreadCount$.next(this.unreadCount);
            this.loading = false;
            this.cdr.detectChanges();
        }, () => { this.loading = false; this.cdr.detectChanges(); });
    }

    markAllRead() {
        this.notifService.markAllRead().subscribe(() => {
            this.notifications.forEach(n => n.is_read = true);
            this.unreadCount = 0;
            this.notifService.unreadCount$.next(0);
            this.cdr.detectChanges();
        });
    }

    onClickNotif(n: any) {
        if (!n.is_read) {
            this.notifService.markRead(n.id).subscribe();
            n.is_read = true;
            this.unreadCount = Math.max(0, this.unreadCount - 1);
            this.notifService.unreadCount$.next(this.unreadCount);
        }
        if (n.link) {
            this.router.navigateByUrl(n.link);
            this.open = false;
        }
        this.cdr.detectChanges();
    }

    deleteNotif(n: any, event: Event) {
        event.stopPropagation();
        this.notifService.delete(n.id).subscribe(() => {
            this.notifications = this.notifications.filter(x => x.id !== n.id);
            if (!n.is_read && this.unreadCount > 0) {
                this.unreadCount--;
                this.notifService.unreadCount$.next(this.unreadCount);
            }
            this.cdr.detectChanges();
        });
    }

    timeAgo(dateStr: string): string {
        const now = new Date();
        const then = new Date(dateStr);
        const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
        if (diff < 60) return 'Ahora mismo';
        if (diff < 3600) return `${Math.floor(diff / 60)} min`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
        return `${Math.floor(diff / 86400)}d`;
    }
}
