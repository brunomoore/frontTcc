import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../services/auth.service';
import {User} from '../../model/model.user';
import {Router} from '@angular/router';
import { Expense } from '../../model/model.expense';
import { ReceiptService } from '../../services/receipt.service';
import { ExpenseService } from './../../services/expense.service';
import { Receipt } from './../../model/model.receipt';

import { single } from './data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  totalReceita = 0;
  totalDespesa = 0;
  receipts = [];
  expenses = [];
  currentUser: User;
  mes: number;
  //dateFilter = Date.now()
  //Gráfico
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Saldo do mês';
  showYAxisLabel = true;
  yAxisLabel = 'Valor';

  colorScheme = {
    domain:
    ['#5AA454', '#e74c3c', '#0083b0', '#AAAAAA']
  };

  constructor(public authService: AuthService, public router: Router,
    public receiptService: ReceiptService,  public expenseService: ExpenseService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    Object.assign(this, { single });
  }

  ngOnInit() {
    this.receiptService.getReceipts(this.currentUser.id).subscribe(
      data => {

        console.log(data);
        this.receipts  = data;
        this.somaTudoRec();
      }
      );

      this.expenseService.getExpensesProfile(this.currentUser.id, this.mes).subscribe(
        data => {
          this.expenses = data;
          this.somaTudoDes();
        }
        );
        this.expenseService.getExpenses(this.currentUser.id).subscribe(
          data => {
            this.expenses = data;
            this.somaTudoDes();
          }
          );
  }
  retiraArrayRec(data){
    let lista = []
    data.forEach(element => {
      let receita : Receipt = new Receipt;
      receita.name = element[0];
      receita.value = element[1]
      lista.push(receita);
    });
    return lista;
  }
  retiraArrayDesp(data){
    let lista = []
    data.forEach(element => {
      let despesa : Expense = new Expense;
      despesa.name = element[0];
      despesa.value = element[1]
      lista.push(despesa);
    });
    return lista;
  }

  getTotalCost() {
    return this.expenses.map(t => t.value).reduce((acc, value) => acc + value, 0);
  }
  somaTudoRec(){
    this.receipts.forEach(element => {
     this.totalReceita += element.value;
    });
  }
  somaTudoDes(){
    this.expenses.forEach(element => {
     this.totalDespesa += element.value;
    });
  }


// login out from the app
  logOut() {
    this.authService.logOut()
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log('error');
        });
  }

}
