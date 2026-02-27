import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { CompanyManagementComponent } from './components/company-management/company-management.component';
import { PaymentConfigsComponent } from './payment-configs/payment-configs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

@NgModule({
    declarations: [
        CompaniesComponent,
        ListCompaniesComponent,
        CreateCompanyComponent,
        EditCompanyComponent,
        CompanyManagementComponent,
        PaymentConfigsComponent
    ],
    imports: [
        CommonModule,
        CompaniesRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgbModalModule,
        NgbDatepickerModule,
        InlineSVGModule,
        CRUDTableModule
    ]
})
export class CompaniesModule { }
