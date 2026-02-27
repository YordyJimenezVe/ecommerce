import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Component({
    selector: 'app-payment-configs',
    templateUrl: './payment-configs.component.html',
})
export class PaymentConfigsComponent implements OnInit {

    payment_methods = {
        paypal: { is_active: false, client_id: '', secret_id: '' },
        yape: { is_active: false, details: '', qr_image: '' },
        plin: { is_active: false, details: '', qr_image: '' },
        transfer_bcp: { is_active: false, details: '' },
        transfer_bbva: { is_active: false, details: '' },
        transfer_interbank: { is_active: false, details: '' },
        credit_card: { is_active: false, public_key: '', secret_key: '', provider: 'stripe' }
    };

    constructor(
        private http: HttpClient,
        private cdr: ChangeDetectorRef,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        this.loadConfigs();
    }

    loadConfigs() {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        this.http.get(URL_SERVICIOS + '/company_admin/payment-config', { headers: headers }).subscribe((resp: any) => {
            resp.configs.forEach((config: any) => {
                const type = config.method_type.toLowerCase();
                if (this.payment_methods[type]) {
                    this.payment_methods[type] = { ...config.configuration, is_active: config.is_active, id: config.id };
                }
            });
            this.cdr.detectChanges();
        });
    }

    saveConfig() {
        Object.keys(this.payment_methods).forEach(key => {
            this.saveMethod(key.toUpperCase(), this.payment_methods[key]);
        });
        alert('Configuración de pagos actualizada correctamente.');
    }

    saveMethod(type: string, data: any) {
        const payload = {
            method_type: type,
            configuration: data,
            is_active: data.is_active
        };

        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token });
        if (data.id) {
            this.http.put(URL_SERVICIOS + '/company_admin/payment-config/' + data.id, payload, { headers: headers }).subscribe();
        } else {
            this.http.post(URL_SERVICIOS + '/company_admin/payment-config', payload, { headers: headers }).subscribe((resp: any) => {
                if (resp.config) data.id = resp.config.id;
            });
        }
    }
}
