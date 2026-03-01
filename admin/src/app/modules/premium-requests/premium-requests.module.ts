import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PremiumRequestsRoutingModule } from './premium-requests-routing.module';
import { RequestsListComponent } from './requests-list/requests-list.component';


@NgModule({
  declarations: [RequestsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    PremiumRequestsRoutingModule
  ]
})
export class PremiumRequestsModule { }
