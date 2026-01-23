import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../service/companies.service';
import { Router } from '@angular/router';

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
    ) { }

    ngOnInit(): void {
    }

    processFile($event: any) {
        if ($event.target.files.length === 0) {
            return;
        }
        this.file_logo = $event.target.files[0];
    }

    save() {
        if (!this.name || !this.slug || !this.email_admin || !this.password_admin) {
            alert("Completa los campos obligatorios");
            return;
        }

        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("slug", this.slug);
        formData.append("email_admin", this.email_admin);
        formData.append("password_admin", this.password_admin);
        if (this.description) formData.append("description", this.description);
        if (this.file_logo) formData.append("logo_file", this.file_logo);

        this._companyService.createCompany(formData).subscribe((resp: any) => {
            console.log(resp);
            this.router.navigate(['/companies/list']);
        })
    }
}
