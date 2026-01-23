import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LiveEventsService } from '../../service/live-events.service';

@Component({
    selector: 'app-list-live-events',
    templateUrl: './list-live-events.component.html',
    styleUrls: ['./list-live-events.component.scss']
})
export class ListLiveEventsComponent implements OnInit {

    events: any = [];
    search: string = '';
    totalPages: number = 1;
    currentPage: number = 1;

    constructor(
        public liveEventsService: LiveEventsService,
        public modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.listEvents();
    }

    listEvents(page: number = 1) {
        this.liveEventsService.listEvents(page, this.search).subscribe((resp: any) => {
            this.events = resp.events.data;
            this.totalPages = resp.total;
            this.currentPage = page;
        })
    }

    loadPage(page: number) {
        this.listEvents(page);
    }

    deleteEvent(event: any) {
        // Confirmation logic could be added here
        this.liveEventsService.deleteEvent(event.id).subscribe((resp: any) => {
            this.listEvents();
        })
    }
}
