import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProductsService } from './products.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Injectable({ providedIn: 'root' })
export class PaymentCheckGuard implements CanActivate {
    constructor(
        private productService: ProductsService, 
        private router: Router,
        public toaster: Toaster
    ) {}

    canActivate() {
        return this.productService.getInfo().pipe(
            map((resp: any) => {
                // Verificamos si la empresa tiene métodos de pago. 
                // Se asume que el backend devuelve 'has_payment_methods' o similar.
                if (resp.company && (resp.company.has_payment_methods || resp.company.payment_methods_count > 0)) {
                    return true;
                } else {
                    // Si no tiene métodos de pago, redirigimos y avisamos con un enlace HTML
                    this.toaster.open(NoticyAlertComponent, { 
                        text: `warning-'Debes configurar primero tu método de pago <a href="/companies/payment-configs" style="font-weight: bold; text-decoration: underline;">aquí</a>.'` 
                    });
                    // Redirigimos a la lista de productos para que no se quede bloqueado en blanco
                    this.router.navigate(['/products/list-product']);
                    return false;
                }
            }),
            catchError(() => {
                // En caso de error de red, permitimos el paso por defecto
                return of(true);
            })
        );
    }
}
