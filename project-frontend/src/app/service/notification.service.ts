import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  public notify() {
    return this.httpClient.post("http://localhost:8080/notification", { title: "New Movie Added" }, {responseType: 'text'});
  }  
}
