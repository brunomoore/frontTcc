import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../app.component';
import { ExpenseType } from '../model/model.expenseType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {

  constructor(private http: HttpClient) { }
  expenseType: ExpenseType;

  createExpenseType(expenseType: any, id): Observable<ExpenseType> {
    return this.http.post<ExpenseType>(AppComponent.API_URL + '/expenseType?id=' + id , expenseType, );
  }
  getExpenseTypes() {
    return this.http.get<ExpenseType[]>(AppComponent.API_URL + '/expenseType');
  }
  getExpenseType(id) {
    return this.http.get<ExpenseType>(AppComponent.API_URL + '/expenseType', id);
  }
 
  deleteExpenseType(id) {
    return this.http.delete(`${AppComponent.API_URL}/expenseType/${id}`);
  }
  updateExpenseType(expenseType: ExpenseType) {
    return this.http.put(`${AppComponent.API_URL}/expenseType/${expenseType.id}`, expenseType);
  }
}
