import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketAnalyticsComponent } from './ticket-analytics/ticket-analytics.component';

const routes: Routes = [
    // IMPORTANT: static routes MUST come before the :id param route
    { path: 'analytics', component: TicketAnalyticsComponent },
    { path: 'admin', component: TicketListComponent },
    { path: 'admin/:id', component: TicketDetailComponent },
    { path: ':id', component: TicketDetailComponent },
    { path: '', component: TicketListComponent },
];

@NgModule({
    declarations: [
        TicketListComponent,
        TicketDetailComponent,
        TicketAnalyticsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export class TicketsModule { }
