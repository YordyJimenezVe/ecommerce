import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagingInboxComponent } from './messaging-inbox/messaging-inbox.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'inbox',
        component: MessagingInboxComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagingRoutingModule { }
