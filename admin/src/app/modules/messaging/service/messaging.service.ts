import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getConversations() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/support/conversations";
    return this.http.get(URL, { headers: headers });
  }

  getMessages(id: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/support/messages/" + id;
    return this.http.get(URL, { headers: headers });
  }

  sendMessage(data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/support/send-message";
    return this.http.post(URL, data, { headers: headers });
  }

  startConversation(data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let URL = URL_SERVICIOS + "/support/start-conversation";
    return this.http.post(URL, data, { headers: headers });
  }
}
