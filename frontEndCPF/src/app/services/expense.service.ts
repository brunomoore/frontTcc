import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../app.component';
import { Expense } from '../model/model.expense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }
  expense: Expense;

  createExpense(expense: any, id, expenseId): Observable<Expense> {
    return this.http.post<Expense>(AppComponent.API_URL + '/expense?id=' + id + '&expenseId=' + expenseId , expense, );
  }
  getExpenses(id) {
    return this.http.get<Expense[]>(AppComponent.API_URL + '/expense?id=' + id);
  }
  getExpensesProfile(id, inicio, fim) {
    return this.http.get<Expense[]>(AppComponent.API_URL + '/expense/profile?id=' + id + '&inicio=' + inicio +'&fim=' + fim);
  }
  getExpensesProfileMes(id, mes, ano) {
    return this.http.get<Expense[]>(AppComponent.API_URL + '/expense/profilemes?id=' + id + '&mes=' + mes +'&ano=' + ano);
  }

  getExpense(id) {
    return this.http.get<Expense>(AppComponent.API_URL + '/expense', id);
  }
 
  deleteExpense(id) {
    return this.http.delete(`${AppComponent.API_URL}/expense/${id}`);
  }
  updateExpense(expense: Expense) {
    return this.http.put(`${AppComponent.API_URL}/expense/${expense.id}`, expense);
  }
}
