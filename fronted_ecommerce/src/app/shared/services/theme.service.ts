import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor() {
        this.setTheme('default');
    }

    private themes: { [key: string]: { [key: string]: string } } = {
        'default': {
            '--primary': '#002663',
            '--accent': '#F5A200',
            '--text-color': '#464545',
            '--bg-color': '#ffffff',
            '--header-bg': '#002663',
            '--footer-bg': '#ffffff',
            '--nav-bg': '#002663'
        },
        'dark': {
            '--primary': '#bb86fc', // Light Purple
            '--accent': '#03dac6', // Teal
            '--text-color': '#e1e1e1',
            '--bg-color': '#121212',
            '--header-bg': '#1f1f1f',
            '--footer-bg': '#1f1f1f',
            '--nav-bg': '#2c2c2c'
        },
        'red': {
            '--primary': '#b71c1c',
            '--accent': '#ff5252',
            '--text-color': '#464545',
            '--bg-color': '#fff5f5',
            '--header-bg': '#b71c1c',
            '--footer-bg': '#fff5f5',
            '--nav-bg': '#b71c1c'
        },
        'blue': {
            '--primary': '#0d47a1',
            '--accent': '#448aff',
            '--text-color': '#464545',
            '--bg-color': '#e3f2fd',
            '--header-bg': '#0d47a1',
            '--footer-bg': '#e3f2fd',
            '--nav-bg': '#0d47a1'
        },
        'green': {
            '--primary': '#1b5e20',
            '--accent': '#69f0ae',
            '--text-color': '#464545',
            '--bg-color': '#e8f5e9',
            '--header-bg': '#1b5e20',
            '--footer-bg': '#e8f5e9',
            '--nav-bg': '#1b5e20'
        },
        'white': {
            '--primary': '#ffffff',
            '--accent': '#000000',
            '--text-color': '#ffffff',
            '--bg-color': '#000000', // Smart Contrast: Black bg for white theme
            '--header-bg': '#1a1a1a',
            '--footer-bg': '#000000',
            '--nav-bg': '#1a1a1a'
        }
    };

    setTheme(themeName: string) {
        const theme = this.themes[themeName] || this.themes['default'];

        // Remove all previous theme classes
        Object.keys(this.themes).forEach(key => {
            document.body.classList.remove(key);
        });

        // Add current theme class
        document.body.classList.add(themeName);

        Object.keys(theme).forEach(key => {
            document.documentElement.style.setProperty(key, theme[key]);
        });
    }
}
