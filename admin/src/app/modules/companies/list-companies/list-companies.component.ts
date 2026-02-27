import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../service/companies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URL_BACKEND } from 'src/app/config/config';
import { CompanyManagementComponent } from '../components/company-management/company-management.component';

@Component({
    selector: 'app-list-companies',
    templateUrl: './list-companies.component.html',
    styleUrls: ['./list-companies.component.scss']
})
export class ListCompaniesComponent implements OnInit {

    companies: any = [];
    isLoading$: any;
    URL_BACKEND: any = URL_BACKEND;

    constructor(
        public _companyService: CompaniesService,
        public modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.isLoading$ = this._companyService.isLoading$;
        this.listCompanies();
    }

    listCompanies() {
        this._companyService.listCompanies().subscribe((resp: any) => {
            console.log(resp);
            this.companies = resp.companies;
        })
    }

    openManagement(company: any) {
        const modalRef = this.modalService.open(CompanyManagementComponent, { size: 'lg', centered: true });
        modalRef.componentInstance.company = company;
    }

    delete(company: any) {
        // Confirmation Logic would go here (or simple alert)
        if (confirm("Are you sure you want to delete this company?")) {
            this._companyService.deleteCompany(company.id).subscribe((resp: any) => {
                this.listCompanies();
            })
        }
    }

    toggleStatus(company: any) {
        this._companyService.toggleStatus(company.id).subscribe((resp: any) => {
            this.listCompanies();
        })
    }

    toggleFreeShipping(company: any) {
        this._companyService.toggleFreeShipping(company.id).subscribe((resp: any) => {
            this.listCompanies();
        })
    }
}
