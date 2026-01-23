import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LiveEventsService } from '../service/live-events.service';

@Component({
    selector: 'app-edit-live-event',
    templateUrl: './edit-live-event.component.html',
    styleUrls: ['./edit-live-event.component.scss']
})
export class EditLiveEventComponent implements OnInit {

    title: string = '';
    description: string = '';
    embed_url: string = '';
    scheduled_at: string = '';
    status: string = 'scheduled';
    event_id: any = null;

    constructor(
        public liveEventsService: LiveEventsService,
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((resp: any) => {
            this.event_id = resp.id;
            this.showEvent();
        });
    }

    showEvent() {
        this.liveEventsService.showEvent(this.event_id).subscribe((resp: any) => {
            console.log(resp);
            let event = resp.event;
            this.title = event.title;
            this.description = event.description;
            this.embed_url = event.embed_url;
            // Format scheduled_at for datetime-local input (YYYY-MM-DDTHH:MM)
            // Assuming API returns YYYY-MM-DD HH:MM:SS
            this.scheduled_at = event.scheduled_at.replace(' ', 'T').substring(0, 16);
            this.status = event.status;
        })
    }

    save() {
        if (!this.title || !this.embed_url || !this.scheduled_at) {
            alert("Por favor completa los campos obligatorios");
            return;
        }

        let data = {
            title: this.title,
            description: this.description,
            embed_url: this.embed_url,
            scheduled_at: this.scheduled_at,
            status: this.status, // Add status update capability
        }

        this.liveEventsService.updateEvent(this.event_id, data).subscribe((resp: any) => {
            console.log(resp);
            this.router.navigate(['/live-events/list']);
        })
    }
}
