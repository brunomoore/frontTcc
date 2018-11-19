import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppComponent } from "../app.component";
import { Receipt } from '../model/model.receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) {}

  createReceipt(receipt : Receipt){
    return this.http.post(AppComponent.API_URL+'/receipt',receipt);
  }
  getReceipts(id) {
    return this.http.get<Receipt[]>(AppComponent.API_URL+'/receipt?id='+id);
  }
  getReceipt(id) {
    return this.http.get<Receipt>(AppComponent.API_URL+'/receipt',id);
  }

  deleteReceipt(id) {
    return this.http.delete(AppComponent.API_URL+'/receipt',id);
  }

  updateReceipt(receipt : Receipt) {
    return this.http.put(AppComponent.API_URL+'/receipt',receipt);
  }


}
