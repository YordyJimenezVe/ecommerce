import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CompaniesService } from '../service/companies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

    name: any = null;
    slug: any = null;
    file_logo: any = null;
    description: any = null;
    company_id: any;
    company: any = {};

    URL_BACKEND: any = URL_BACKEND;
    image_preview: any = null;

    constructor(
        public _companyService: CompaniesService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((resp: any) => {
            this.company_id = resp.id;
            this.showCompany();
        })
    }

    showCompany() {
        console.log("Fetching company for ID:", this.company_id);
        this._companyService.getCompany(this.company_id).subscribe((resp: any) => {
            console.log("Response received:", resp);
            this.company = resp.company;
            if (this.company) {
                this.name = this.company.name;
                this.slug = this.company.slug;
                this.description = this.company.description;
                console.log("Data bound to variables:", { name: this.name, slug: this.slug, logo: this.company.logo });
            }
            this.cdr.detectChanges();
        }, error => {
            console.error("Error fetching company", error);
        })
    }

    processFile($event: any) {
        if ($event.target.files.length === 0) {
            return;
        }
        this.file_logo = $event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.file_logo);
        reader.onloadend = () => this.image_preview = reader.result;
    }

    save() {
        let formData = new FormData();
        formData.append("name", this.name);
        // formData.append("slug", this.slug); // Usually slug shouldn't change or carefully
        if (this.description) formData.append("description", this.description);
        if (this.file_logo) formData.append("logo_file", this.file_logo);

        formData.append("_method", "PUT");

        this._companyService.updateCompany(this.company_id, formData).subscribe((resp: any) => {
            console.log(resp);
            this.router.navigate(['/companies/list']);
        })
    }
}
