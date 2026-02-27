import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../service/companies.service';
import { UsersService } from '../../../users/_services/users.service';
import { ProductsService } from '../../../products/_services/products.service';

@Component({
    selector: 'app-company-management',
    templateUrl: './company-management.component.html',
    styleUrls: ['./company-management.component.scss']
})
export class CompanyManagementComponent implements OnInit {

    @Input() company: any;

    activeTab = 'users'; // 'users' | 'products' | 'billing'

    users: any = [];
    products: any = [];
    payments: any = [];

    isLoading = false;

    constructor(
        public modal: NgbActiveModal,
        private companyService: CompaniesService,
        private userService: UsersService,
        private productService: ProductsService,
    ) { }

    ngOnInit(): void {
        this.loadCompanyUsers();
    }

    loadCompanyUsers() {
        this.isLoading = true;
        // We pass company_id to a new specialized method or reuse allUsers with filtering
        this.userService.allUsers(1, '', '', 'companies').subscribe((resp: any) => {
            this.users = resp.users.data.filter((u: any) => u.company_id === this.company.id);
            this.isLoading = false;
        });
    }

    loadCompanyProducts() {
        this.isLoading = true;
        this.productService.allProducts(1).subscribe((resp: any) => {
            // Filter by company
            if (resp.products && resp.products.data) {
                this.products = resp.products.data.filter((p: any) => p.company_id === this.company.id);
            }
            this.isLoading = false;
        });
    }

    setTab(tab: string) {
        this.activeTab = tab;
        if (tab === 'users') this.loadCompanyUsers();
        if (tab === 'products') this.loadCompanyProducts();
        // if (tab === 'billing') this.loadBilling();
    }

    resetPassword(user: any) {
        if (confirm(`¿Estás seguro que deseas resetear la contraseña de ${user.email}? Se enviará al correo si está configurado o se pondrá una por defecto.`)) {
            // Logic for reset (to be implemented)
        }
    }

    updateEmail(user: any) {
        const newEmail = prompt("Nuevo correo electrónico:", user.email);
        if (newEmail && newEmail !== user.email) {
            this.userService.update(user.id, { email: newEmail }).subscribe(() => {
                this.loadCompanyUsers();
            });
        }
    }

    close() {
        this.modal.dismiss();
    }
}
