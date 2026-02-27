import { Component } from '@angular/core';
import { AuthService } from '../auth';

@Component({
    selector: 'app-suspended',
    templateUrl: './suspended.component.html',
    styleUrls: ['./suspended.component.scss']
})
export class SuspendedComponent {
    today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '');

    constructor(private authService: AuthService) { }

    logout() {
        this.authService.logout();
    }
}
