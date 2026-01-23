import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { LiveEventsRoutingModule } from './live-events-routing.module';
import { LiveEventsComponent } from './live-events.component';
import { ListLiveEventsComponent } from './list-live-events/list-live-events.component';
import { CreateLiveEventComponent } from './create-live-event/create-live-event.component';
import { EditLiveEventComponent } from './edit-live-event/edit-live-event.component';

@NgModule({
    declarations: [
        LiveEventsComponent,
        ListLiveEventsComponent,
        CreateLiveEventComponent,
        EditLiveEventComponent
    ],
    imports: [
        CommonModule,
        LiveEventsRoutingModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        InlineSVGModule,
        NgbModalModule,
    ]
})
export class LiveEventsModule { }
