import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-payment-configs',
    templateUrl: './payment-configs.component.html',
})
export class PaymentConfigsComponent implements OnInit {

    payment_methods = {
        paypal: { is_active: false, client_id: '', secret_id: '' },
        mobile: { is_active: false, details: '' },
        transfer: { is_active: false, details: '' }
    };

    URL_API = 'http://127.0.0.1:8000/api'; // Or environment variable

    constructor(
        private http: HttpClient,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadConfigs();
    }

    loadConfigs() {
        // Mock or Real Call
        this.http.get(this.URL_API + '/company_admin/payment-config').subscribe((resp: any) => {
            resp.configs.forEach((config: any) => {
                if (config.method_type === 'PAYPAL') {
                    this.payment_methods.paypal = { ...config.configuration, is_active: config.is_active };
                }
                if (config.method_type === 'MANUAL_MOBILE') {
                    this.payment_methods.mobile = { ...config.configuration, is_active: config.is_active };
                }
                if (config.method_type === 'MANUAL_TRANSFER') {
                    this.payment_methods.transfer = { ...config.configuration, is_active: config.is_active };
                }
            });
            this.cdr.detectChanges();
        });
    }

    saveConfig() {
        // Save PayPal
        this.saveMethod('PAYPAL', this.payment_methods.paypal);
        // Save Mobile
        this.saveMethod('MANUAL_MOBILE', this.payment_methods.mobile);
        // Save Transfer
        this.saveMethod('MANUAL_TRANSFER', this.payment_methods.transfer);

        alert('Configuración guardada correctamente.');
    }

    saveMethod(type: string, data: any) {
        if (!data.is_active && !data.client_id && !data.details) return; // Skip empty inactive

        const payload = {
            method_type: type,
            configuration: data,
            is_active: data.is_active
        };

        this.http.post(this.URL_API + '/company_admin/payment-config', payload).subscribe();
    }
}
