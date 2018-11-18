import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from "../app.component";
import { Expense } from '../model/model.expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  createExpense(expense : Expense){
    return this.http.post(AppComponent.API_URL+'/expense',expense);
  }
  getExpenses(id) {
    return this.http.get<Expense[]>(AppComponent.API_URL+'/expense?id='+id);
  }

  getExpense(id) {
    return this.http.get<Expense>(AppComponent.API_URL+'/expense',id);
  }

  deleteExpense(id) {
    return this.http.delete(AppComponent.API_URL+'/expense',id);
  }

  updateExpense(expense : Expense) {
    return this.http.put(AppComponent.API_URL+'/expense',expense);
  }


}
