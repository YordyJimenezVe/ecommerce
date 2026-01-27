import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-review-payments',
    templateUrl: './review-payments.component.html',
})
export class ReviewPaymentsComponent implements OnInit {

    sales: any[] = [];
    URL_API = 'http://127.0.0.1:8000/api';
    URL_BACKEND = 'http://127.0.0.1:8000/storage/'; // Adjust storage path

    showModal = false;
    showRejectModal = false;
    selectedSale: any = null;
    rejection_reason = '';

    constructor(
        private http: HttpClient,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadSales();
    }

    loadSales() {
        this.http.get(this.URL_API + '/admin/billing/orders').subscribe((resp: any) => {
            this.sales = resp.sales.data;
            this.cdr.detectChanges();
        });
    }

    viewProof(sale: any) {
        this.selectedSale = sale;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this.selectedSale = null;
    }

    approve(sale: any) {
        if (confirm('¿Estás seguro de aprobar este pago?')) {
            this.http.post(this.URL_API + '/admin/billing/orders/' + sale.id + '/approve', {}).subscribe(() => {
                alert('Pago aprobado correctamente');
                this.loadSales();
            });
        }
    }

    reject(sale: any) {
        this.selectedSale = sale;
        this.showRejectModal = true;
    }

    closeRejectModal() {
        this.showRejectModal = false;
        this.selectedSale = null;
        this.rejection_reason = '';
    }

    confirmReject() {
        if (!this.rejection_reason) return alert('Debes ingresar un motivo');

        this.http.post(this.URL_API + '/admin/billing/orders/' + this.selectedSale.id + '/reject', { reason: this.rejection_reason }).subscribe(() => {
            alert('Pago rechazado');
            this.closeRejectModal();
            this.loadSales();
        });
    }
}
