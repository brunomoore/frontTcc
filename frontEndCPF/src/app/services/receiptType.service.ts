import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../app.component';
import { ReceiptType } from '../model/model.receiptType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptTypeService {

  constructor(private http: HttpClient) { }
  receiptType: ReceiptType;

  createReceiptType(receiptType: any, id): Observable<ReceiptType> {
    return this.http.post<ReceiptType>(AppComponent.API_URL + '/receiptType?id=' + id , receiptType, );
  }
  getReceiptTypes() {
    return this.http.get<ReceiptType[]>(AppComponent.API_URL + '/receiptType');
  }
  getReceiptType(id) {
    return this.http.get<ReceiptType>(AppComponent.API_URL + '/receiptType', id);
  }
 
  deleteReceiptType(id) {
    return this.http.delete(`${AppComponent.API_URL}/receiptType/${id}`);
  }
  updateReceiptType(receiptType: ReceiptType) {
    return this.http.put(`${AppComponent.API_URL}/receiptType/${receiptType.id}`, receiptType);
  }
}
