import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../app.component';
import { Receipt } from '../model/model.receipt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }
  receipt: Receipt;

  createReceipt(receipt: any, id): Observable<Receipt> {
    return this.http.post<Receipt>(AppComponent.API_URL + '/receipt?id=' + id , receipt, );
  }
  getReceipts(id) {
    return this.http.get<Receipt[]>(AppComponent.API_URL + '/receipt?id=' + id);
  }
  getReceiptsProfile(id, inicio,fim) {
    return this.http.get<Receipt[]>(AppComponent.API_URL + '/receipt/profile?id=' + id + '&inicio=' + inicio +'&fim=' + fim);
  }
  getReceiptsProfileMes(id, mes, ano) {
    return this.http.get<Receipt[]>(AppComponent.API_URL + '/receipt/profilemes?id=' + id + '&mes=' + mes +'&ano=' + ano);
  }

  getReceipt(id) {
    return this.http.get<Receipt>(AppComponent.API_URL + '/receipt', id);
  }
 
  deleteReceipt(id) {
    return this.http.delete(`${AppComponent.API_URL}/receipt/${id}`);
  }
  updateReceipt(receipt: Receipt) {
    return this.http.put(`${AppComponent.API_URL}/receipt/${receipt.id}`, receipt);
  }
}
