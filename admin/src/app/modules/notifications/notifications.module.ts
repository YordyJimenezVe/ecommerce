import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NotificationBellComponent } from './notification-bell/notification-bell.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';

const routes: Routes = [
    { path: 'send', component: SendNotificationComponent },
];

@NgModule({
    declarations: [
        NotificationBellComponent,
        SendNotificationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        NotificationBellComponent,
    ]
})
export class NotificationsModule { }
