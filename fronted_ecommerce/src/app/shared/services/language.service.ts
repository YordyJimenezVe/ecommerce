import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private currentLang = new BehaviorSubject<string>('es');
    public currentLang$ = this.currentLang.asObservable();

    private dictionary: any = {
        'es': {
            'Home': 'Inicio',
            'Shop': 'Tienda',
            'Pages': 'Páginas',
            'Contact': 'Contacto',
            'Others pages': 'Otras páginas',
            'Account pages': 'Páginas de cuenta',
            'Checkout page': 'Página de pago',
            'Login': 'Ingresar',
            'Register': 'Registrarse',
            'Forgot password': 'Olvidé contraseña',
            'My Account': 'Mi Cuenta',
            'Wishlist': 'Lista de Deseos',
            'Order complete': 'Orden completa',
            'Payment': 'Pago',
            'Track order': 'Rastrear orden',
            'About us': 'Sobre nosotros',
            'Contact us': 'Contáctanos',
            'List view': 'Vista de lista',
            'Grid view': 'Vista de cuadrícula',
            'Shopping cart': 'Carrito de compras',
            'Product view': 'Vista de producto',
            'All categories': 'Todas las categorías',
            'Search': 'Buscar',
            'Cart': 'Carrito',
            'Language': 'Idioma',
            'Currency': 'Moneda',
            'Hello': 'Hola',
            'Welcome': 'Bienvenido',
            'Log out': 'Cerrar sesión',
            'Theme': 'Tema',
            'English': 'Inglés',
            'Spanish': 'Español'
        },
        'en': {
            'Home': 'Home',
            'Shop': 'Shop',
            'Pages': 'Pages',
            'Contact': 'Contact',
            'Others pages': 'Others pages',
            'Account pages': 'Account pages',
            'Checkout page': 'Checkout page',
            'Login': 'Login',
            'Register': 'Register',
            'Forgot password': 'Forgot password',
            'My Account': 'My Account',
            'Wishlist': 'Wishlist',
            'Order complete': 'Order complete',
            'Payment': 'Payment',
            'Track order': 'Track order',
            'About us': 'About us',
            'Contact us': 'Contact us',
            'List view': 'List view',
            'Grid view': 'Grid view',
            'Shopping cart': 'Shopping cart',
            'Product view': 'Product view',
            'All categories': 'All categories',
            'Search': 'Search',
            'Cart': 'Cart',
            'Language': 'Language',
            'Currency': 'Currency',
            'Hello': 'Hello',
            'Welcome': 'Welcome',
            'Log out': 'Log out',
            'Theme': 'Theme',
            'English': 'English',
            'Spanish': 'Spanish'
        }
    };

    constructor() { }

    changeLanguage(lang: string) {
        this.currentLang.next(lang);
    }

    translate(key: string): string {
        const lang = this.currentLang.value;
        return this.dictionary[lang][key] || key;
    }
}
