import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CompaniesService } from '../service/companies.service';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';

@Component({
    selector: 'app-create-company',
    templateUrl: './create-company.component.html',
    styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

    name: any = null;
    slug: any = null;
    email_admin: any = null;
    password_admin: any = null;
    logo: any = null;
    file_logo: any = null;
    logo_preview: any = null;
    description: any = null;

    // Membership Fields
    membership_duration: number = 1;
    payment_method: string = 'free';
    payment_amount: number = 0;
    payment_proof: any = null;
    file_proof: any = null;
    reason: string = '';

    isLoading: any;

    constructor(
        public _companyService: CompaniesService,
        public router: Router,
        public toaster: Toaster,
        public cdr: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
    }

    processFile($event: any) {
        if ($event.target.files.length === 0) {
            return;
        }
        this.file_logo = $event.target.files[0];

        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.logo_preview = e.target.result;
            this.cdr.detectChanges();
        }
        reader.readAsDataURL(this.file_logo);
    }

    processProof($event: any) {
        if ($event.target.files.length === 0) {
            return;
        }
        this.file_proof = $event.target.files[0];
    }

    save() {
        if (!this.name || !this.slug || !this.email_admin || !this.password_admin) {
            this.toaster.open({ text: "Completa los campos obligatorios", caption: 'Validación', type: 'danger' });
            return;
        }

        if (this.payment_method !== 'free' && !this.file_proof) {
            this.toaster.open({ text: "Sube el comprobante de pago", caption: 'Validación', type: 'danger' });
            return;
        }

        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("slug", this.slug);
        formData.append("email_admin", this.email_admin);
        formData.append("password_admin", this.password_admin);
        if (this.description) formData.append("description", this.description);
        if (this.file_logo) formData.append("logo_file", this.file_logo);

        // Membership Data
        formData.append("membership_duration", this.membership_duration.toString());
        formData.append("payment_method", this.payment_method);
        if (this.payment_method === 'free') {
            formData.append("reason", this.reason);
        } else {
            formData.append("payment_amount", this.payment_amount.toString());
            if (this.file_proof) formData.append("payment_proof", this.file_proof);
        }

        this._companyService.createCompany(formData).subscribe((resp: any) => {
            console.log(resp);
            this.toaster.open({ text: "La empresa se registró correctamente", caption: 'Éxito', type: 'success' });
            this.router.navigate(['/companies/list']);
        }, (err: any) => {
            console.error(err);
            if (err.error && err.error.message) {
                this.toaster.open({ text: err.error.message, caption: 'Error', type: 'danger' });
            } else {
                this.toaster.open({ text: "Ocurrió un error al registrar la empresa.", caption: 'Error', type: 'danger' });
            }
        })
    }
}
