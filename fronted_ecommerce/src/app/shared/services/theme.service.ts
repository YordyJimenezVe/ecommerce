import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor() { }

    setTheme(primary: string, accent: string) {
        document.documentElement.style.setProperty('--primary', primary);
        document.documentElement.style.setProperty('--accent', accent);
    }
}
