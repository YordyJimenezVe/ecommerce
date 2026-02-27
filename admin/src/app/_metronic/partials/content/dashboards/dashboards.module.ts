import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { DashboardAdminGeneralComponent } from './dashboard-admin-general/dashboard-admin-general.component';
import { DashboardCompanyAdminComponent } from './dashboard-company-admin/dashboard-company-admin.component';
import { DashboardAnalistaComponent } from './dashboard-analista/dashboard-analista.component';
import { DashboardVendedorComponent } from './dashboard-vendedor/dashboard-vendedor.component';

@NgModule({
  declarations: [Dashboard1Component, Dashboard2Component, DashboardWrapperComponent, Dashboard3Component, DashboardAdminGeneralComponent, DashboardCompanyAdminComponent, DashboardAnalistaComponent, DashboardVendedorComponent],
  imports: [CommonModule, WidgetsModule],
  exports: [DashboardWrapperComponent],
})
export class DashboardsModule { }
