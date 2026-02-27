import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class SuspendedInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403) {
                    let body = error.error;
                    if (typeof body === 'string') {
                        try { body = JSON.parse(body); } catch (e) { }
                    }
                    // When suspended, redirect to dashboard (which shows the suspension notice)
                    const isSuspended = body && body.status === 'suspended';
                    const isNotDashboard = !this.router.url.startsWith('/dashboard');
                    if (isSuspended && isNotDashboard) {
                        this.router.navigate(['/dashboard']);
                    }
                }
                return throwError(error);
            })
        );
    }
}
