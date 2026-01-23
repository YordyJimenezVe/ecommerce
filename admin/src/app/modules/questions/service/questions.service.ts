import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {

    constructor(
        private http: HttpClient,
        public authService: AuthService,
    ) { }

    listQuestions(page: number = 1, search: string = '') {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
        let URL = URL_SERVICIOS + "/tenant/questions?page=" + page + "&search=" + search;
        return this.http.get(URL, { headers: headers });
    }

    answerQuestion(id: any, answer: string) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
        let URL = URL_SERVICIOS + "/tenant/questions/" + id + "/answer";
        return this.http.post(URL, { answer: answer }, { headers: headers });
    }
}
