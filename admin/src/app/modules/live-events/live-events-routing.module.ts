import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveEventsComponent } from './live-events.component';
import { ListLiveEventsComponent } from './list-live-events/list-live-events.component';
import { CreateLiveEventComponent } from './create-live-event/create-live-event.component';
import { EditLiveEventComponent } from './edit-live-event/edit-live-event.component';

const routes: Routes = [
    {
        path: '',
        component: LiveEventsComponent,
        children: [
            {
                path: 'list',
                component: ListLiveEventsComponent
            },
            {
                path: 'create',
                component: CreateLiveEventComponent
            },
            {
                path: 'list/edit/:id',
                component: EditLiveEventComponent
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
export class LiveEventsRoutingModule { }
