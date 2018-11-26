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

  createExpense(expense: any, id): Observable<Expense> {
    return this.http.post<Expense>(AppComponent.API_URL + '/expense?id=' + id , expense, );
  }
  getExpenses(id) {
    return this.http.get<Expense[]>(AppComponent.API_URL + '/expense?id=' + id);
  }
  getExpensesProfile(id, mes) {
    return this.http.get<Expense[]>(AppComponent.API_URL + '/profile/expense?id=' + id + '&mes=' + mes);
  }

  getExpense(id) {
    return this.http.get<Expense>(AppComponent.API_URL + '/expense', id);
  }

  deleteExpense(id) {
    return this.http.delete(AppComponent.API_URL + '/expense', id);
  }

  updateAutoTexto(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(AppComponent.API_URL + '/expense', expense);

  }


}
