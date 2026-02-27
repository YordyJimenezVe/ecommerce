import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SuspensionService {
    private _isSuspended = new BehaviorSubject<boolean>(false);
    isSuspended$ = this._isSuspended.asObservable();

    constructor(private router: Router) { }

    setSuspended() {
        if (!this._isSuspended.value) {
            this._isSuspended.next(true);
            // Navigate immediately and replace history so back button doesn't go to broken state
            this.router.navigate(['/suspended'], { replaceUrl: true });
        }
    }

    get isSuspended() {
        return this._isSuspended.value;
    }

    clearSuspension() {
        this._isSuspended.next(false);
    }
}
