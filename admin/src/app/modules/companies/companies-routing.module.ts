import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';

const routes: Routes = [
    {
        path: '',
        component: CompaniesComponent,
        children: [
            {
                path: 'list',
                component: ListCompaniesComponent
            },
            {
                path: 'create',
                component: CreateCompanyComponent
            },
            {
                path: 'edit/:id',
                component: EditCompanyComponent
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule { }
