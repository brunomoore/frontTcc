import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../app.component';
import { Notification } from '../model/model.notification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  notification: Notification;

  createNotification(notification: any, id): Observable<Notification> {
    return this.http.post<Notification>(AppComponent.API_URL + '/notification?id=' + id , notification, );
  }
  getNotifications(id) {
    return this.http.get<Notification[]>(AppComponent.API_URL + '/notification?id=' + id);
  }
  getNotification(id) {
    return this.http.get<Notification>(AppComponent.API_URL + '/notification', id);
  }
 
  deleteNotification(id) {
    return this.http.delete(`${AppComponent.API_URL}/notification/${id}`);
  }
  updateNotification(notification: Notification) {
    return this.http.put(`${AppComponent.API_URL}/notification/${notification.id}`, notification);
  }
}
