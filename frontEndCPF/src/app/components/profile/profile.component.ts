import { Component, OnInit, Pipe } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { User } from '../../model/model.user';
import { Router } from '@angular/router';
import { Expense } from '../../model/model.expense';
import { ReceiptService } from '../../services/receipt.service';
import { ExpenseService } from './../../services/expense.service';
import { Receipt } from './../../model/model.receipt';

import { single } from './data';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';


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
  listaGrafico = [];
  ano: number;
  currentUser: User;
  mes: number;
  inicioDate: Date;
  fimDate: Date;
  //dateFilter = Date.now()
  //Gráfico
  single: Receipt[];
  multi: any[];
  pipe = new DatePipe('pt-BR');


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
    public receiptService: ReceiptService, public expenseService: ExpenseService, public dataService: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    Object.assign(this, { single });
  }


  ngOnInit() {
    if (this.inicioDate === undefined && this.fimDate === undefined) {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.expenseService.getExpensesProfile(this.currentUser.id, firstDay, lastDay).subscribe(
        data => {
          this.expenses = data;
        }
      );
      this.receiptService.getReceiptsProfile(this.currentUser.id, firstDay, lastDay).subscribe(
        data => {
          this.receipts = data;
  
          const valorRec = this.getTotalCostReceitas();
          const valorDesp = this.getTotalCostDespesas();
          const valorTot = this.getSaldo();
            this.listaGrafico = [
            {
              "name": "Receitas",
              "value": valorRec
            },
            {
              "name": "Despesas",
              "value": valorDesp
            },
            {
              "name": "Total",
              "value": valorTot
            }
          ];
          console.log(this.getTotalCostDespesas());
          console.log(this.receipts)
          console.log(this.expenses)
        }
      
      );
    }
    else {
      this.expenseService.getExpensesProfile(this.currentUser.id, this.inicioDate, this.fimDate).subscribe(
        data => {
          this.expenses = data;
        }
      );
      this.receiptService.getReceiptsProfile(this.currentUser.id, this.inicioDate, this.fimDate).subscribe(
        data => {
          this.receipts = data;
        }
        
      );
    }
       
  }

  getTotalCostDespesas() {
    return this.expenses.map(t => t.value).reduce((acc, value) => acc + value, 0);
  }
  getTotalCostReceitas() {
    return this.receipts.map(t => t.value).reduce((acc, value) => acc + value, 0);
  }
  getSaldo() {
    const saldoTotal = this.getTotalCostReceitas() - this.getTotalCostDespesas();
    return saldoTotal
  }

  buscarGastos() {
    console.log(this.inicioDate)
    if (this.inicioDate === undefined && this.fimDate === undefined) {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.expenseService.getExpensesProfile(this.currentUser.id, firstDay, lastDay).subscribe(
        data => {
          this.expenses = data;
        }
      );
      this.receiptService.getReceiptsProfile(this.currentUser.id, firstDay, lastDay).subscribe(
        data => {
          this.receipts = data;
          const valorRec = this.getTotalCostReceitas();
          const valorDesp = this.getTotalCostDespesas();
          const valorTot = this.getSaldo();
            this.listaGrafico = [
            {
              "name": "Receitas",
              "value": valorRec
            },
            {
              "name": "Despesas",
              "value": valorDesp
            },
            {
              "name": "Total",
              "value": valorTot
            }
          ];
          console.log(this.listaGrafico)
        }
      );
    }
    else {
      this.expenseService.getExpensesProfile(this.currentUser.id, this.inicioDate, this.fimDate).subscribe(
        data => {
          this.expenses = data;
        }
      );
      this.receiptService.getReceiptsProfile(this.currentUser.id, this.inicioDate, this.fimDate).subscribe(
        data => {
          this.receipts = data;
          const valorRec = this.getTotalCostReceitas();
          const valorDesp = this.getTotalCostDespesas();
          const valorTot = this.getSaldo();
            this.listaGrafico = [
            {
              "name": "Receitas",
              "value": valorRec
            },
            {
              "name": "Despesas",
              "value": valorDesp
            },
            {
              "name": "Total",
              "value": valorTot
            }
          ];
          console.log(this.listaGrafico)
        }
      );
    }

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
