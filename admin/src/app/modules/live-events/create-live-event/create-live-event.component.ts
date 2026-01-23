import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LiveEventsService } from '../service/live-events.service';

@Component({
    selector: 'app-create-live-event',
    templateUrl: './create-live-event.component.html',
    styleUrls: ['./create-live-event.component.scss']
})
export class CreateLiveEventComponent implements OnInit {

    title: string = '';
    description: string = '';
    embed_url: string = '';
    scheduled_at: string = '';

    constructor(
        public liveEventsService: LiveEventsService,
        public router: Router,
    ) { }

    ngOnInit(): void {
    }

    save() {
        if (!this.title || !this.embed_url || !this.scheduled_at) {
            // Alert logic here (e.g. toaster)
            alert("Por favor completa los campos obligatorios");
            return;
        }

        let data = {
            title: this.title,
            description: this.description,
            embed_url: this.embed_url,
            scheduled_at: this.scheduled_at,
        }

        this.liveEventsService.createEvent(data).subscribe((resp: any) => {
            console.log(resp);
            this.router.navigate(['/live-events/list']);
        })
    }

}
