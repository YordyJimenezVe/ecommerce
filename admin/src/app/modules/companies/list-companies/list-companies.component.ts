import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../service/companies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-list-companies',
    templateUrl: './list-companies.component.html',
    styleUrls: ['./list-companies.component.scss']
})
export class ListCompaniesComponent implements OnInit {

    companies: any = [];
    isLoading: any;

    constructor(
        public _companyService: CompaniesService,
        public modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.listCompanies();
    }

    listCompanies() {
        this.isLoading = this._companyService.listCompanies().subscribe((resp: any) => {
            this.companies = resp.companies;
        }, (error) => {
            console.error('Error fetching companies:', error);
            if (error.status === 401) {
                // Handle unauthorized error, possibly redirect or show message
                // this.auth.logout(); // Optional: Auto logout if session invalid
            }
        })
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
}
