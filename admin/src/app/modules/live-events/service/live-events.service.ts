import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
    providedIn: 'root'
})
export class LiveEventsService {

    constructor(
        private http: HttpClient,
        public authService: AuthService,
    ) { }

    listEvents(page: number = 1, search: string = '') {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
        let URL = URL_SERVICIOS + "/tenant/live-events?page=" + page + "&search=" + search;
        return this.http.get(URL, { headers: headers });
    }

    createEvent(data: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
        let URL = URL_SERVICIOS + "/tenant/live-events";
        return this.http.post(URL, data, { headers: headers });
    }

    updateEvent(id: any, data: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
        let URL = URL_SERVICIOS + "/tenant/live-events/" + id;
        return this.http.put(URL, data, { headers: headers });
    }

    deleteEvent(id: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
        let URL = URL_SERVICIOS + "/tenant/live-events/" + id;
        return this.http.delete(URL, { headers: headers });
    }

    showEvent(id: any) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
        let URL = URL_SERVICIOS + "/tenant/live-events/" + id;
        return this.http.get(URL, { headers: headers });
    }
}
