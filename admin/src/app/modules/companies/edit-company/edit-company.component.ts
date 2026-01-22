import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../service/companies.service';
import { Router, ActivatedRoute } from '@angular/router';

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

    constructor(
        public _companyService: CompaniesService,
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((resp: any) => {
            this.company_id = resp.id;
            this.showCompany();
        })
    }

    showCompany() {
        // Ideally create a show() endpoint or reuse list logic filtering
        // For now assuming list approach or implementing show later.
        // Quick fix: list and filter client side if backend show missing, but better backend show.
        // Assuming backend show doesn't exist yet based on my previous code, I'll stick to basic update logic assuming backend accepts PUT.
        // Wait, backend CompanyController didn't have show().
        // I will mock it or just rely on the user to fix backend.
        // Actually, I can use the list and find.
        this._companyService.listCompanies().subscribe((resp: any) => {
            let companies = resp.companies;
            this.company = companies.find((c: any) => c.id == this.company_id);
            if (this.company) {
                this.name = this.company.name;
                this.slug = this.company.slug;
                this.description = this.company.description;
            }
        })
    }

    processFile($event: any) {
        if ($event.target.files.length === 0) {
            return;
        }
        this.file_logo = $event.target.files[0];
    }

    save() {
        let formData = new FormData();
        formData.append("name", this.name);
        // formData.append("slug", this.slug); // Usually slug shouldn't change or carefully
        if (this.description) formData.append("description", this.description);
        if (this.file_logo) formData.append("logo_file", this.file_logo);

        this._companyService.updateCompany(this.company_id, formData).subscribe((resp: any) => {
            console.log(resp);
            this.router.navigate(['/companies/list']);
        })
    }
}
