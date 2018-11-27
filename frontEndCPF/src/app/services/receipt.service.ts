import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppComponent } from "../app.component";
import { Receipt } from '../model/model.receipt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) {}

  createReceipt(receipt: any, id): Observable<Receipt> {
    return this.http.post<Receipt>(AppComponent.API_URL + '/receipt?id=' + id , receipt, );
  }
  getReceipts(id) {
    return this.http.get<Receipt[]>(AppComponent.API_URL + '/receipt?id=' + id);
  }
  getReceiptsProfile(id, mes) {
    return this.http.get<Receipt[]>(AppComponent.API_URL + '/profile/receipt?id=' + id + '&mes=' + mes);
  }

  getReceipt(id) {
    return this.http.get<Receipt>(AppComponent.API_URL + '/receipt', id);
  }

  deleteReceipt(id) {
    return this.http.delete(AppComponent.API_URL + '/receipt', id);
  }

  updateAutoTexto(receipt: Receipt): Observable<Receipt> {
    return this.http.put<Receipt>(AppComponent.API_URL + '/receipt', receipt);

  }


}
