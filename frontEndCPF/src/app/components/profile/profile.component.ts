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
export interface Mes {
  id: number;
  mes: string;
}

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
  valorRec: number;
  valorDesp: number;
  valorTot: number;
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

  meses: Mes[] = [

    { id: 1, mes: "Janeiro" },
    { id: 2, mes: "Fevereiro" },
    { id: 3, mes: "Março" },
    { id: 4, mes: "Abril" },
    { id: 5, mes: "Maio" },
    { id: 6, mes: "Junho" },
    { id: 7, mes: "Julho" },
    { id: 8, mes: "Agosto" },
    { id: 9, mes: "Setembro" },
    { id: 10, mes: "Outubro" },
    { id: 11, mes: "Novembro" },
    { id: 12, mes: "Dezembro" }
  ]
  

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
    // if (this.inicioDate === undefined && this.fimDate === undefined) {
    //   var date = new Date();
    //   var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //   var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //   this.expenseService.getExpensesProfile(this.currentUser.id, firstDay, lastDay).subscribe(
    //     data => {
    //       this.expenses = data;
    //       this.valorRec = this.getTotalCostReceitas();
    //       this.valorDesp = this.getTotalCostDespesas();
    //       this.valorTot = this.getSaldo();
    //         this.listaGrafico = [
    //         {
    //           "name": "Receitas",
    //           "value": this.valorRec
    //         },
    //         {
    //           "name": "Despesas",
    //           "value": this.valorDesp
    //         },
    //         {
    //           "name": "Total",
    //           "value": this.valorTot
    //         }
    //       ];
    //     }
        
        
    //   );
    //   this.receiptService.getReceiptsProfile(this.currentUser.id, firstDay, lastDay).subscribe(
    //     data => {
    //       this.receipts = data;
  
    //       this.valorRec = this.getTotalCostReceitas();
    //       this.valorDesp = this.getTotalCostDespesas();
    //       this.valorTot = this.getSaldo();
    //         this.listaGrafico = [
    //         {
    //           "name": "Receitas",
    //           "value": this.valorRec
    //         },
    //         {
    //           "name": "Despesas",
    //           "value": this.valorDesp
    //         },
    //         {
    //           "name": "Total",
    //           "value": this.valorTot
    //         }
    //       ];
    //       console.log(this.getTotalCostDespesas());
    //       console.log(this.receipts)
    //       console.log(this.expenses)
    //     }
      
    //   );
    // }
    // else {
    //   this.expenseService.getExpensesProfile(this.currentUser.id, this.inicioDate, this.fimDate).subscribe(
    //     data => {
    //       this.expenses = data;
    //       this.valorRec = this.getTotalCostReceitas();
    //       this.valorDesp = this.getTotalCostDespesas();
    //       this.valorTot = this.getSaldo();
    //         this.listaGrafico = [
    //         {
    //           "name": "Receitas",
    //           "value": this.valorRec
    //         },
    //         {
    //           "name": "Despesas",
    //           "value": this.valorDesp
    //         },
    //         {
    //           "name": "Total",
    //           "value": this.valorTot
    //         }
    //       ];
    //     }
    //   );
    //   this.receiptService.getReceiptsProfile(this.currentUser.id, this.inicioDate, this.fimDate).subscribe(
    //     data => {
    //       this.receipts = data;
    //       this.valorRec = this.getTotalCostReceitas();
    //       this.valorDesp = this.getTotalCostDespesas();
    //       this.valorTot = this.getSaldo();
    //         this.listaGrafico = [
    //         {
    //           "name": "Receitas",
    //           "value": this.valorRec
    //         },
    //         {
    //           "name": "Despesas",
    //           "value": this.valorDesp
    //         },
    //         {
    //           "name": "Total",
    //           "value": this.valorTot
    //         }
    //       ];
    //     }
        
    //   );
    // }
    this.buscarMes();
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
  

  buscarMes() {
    if (this.mes === undefined && this.ano === undefined) {
      var date = new Date();
       this.mes =  date.getMonth()+1;
       this.ano = date.getFullYear();
    this.expenseService.getExpensesProfileMes(this.currentUser.id, this.mes, this.ano).subscribe(
      data => {
        this.expenses = data;
          this.valorRec = this.getTotalCostReceitas();
          this.valorDesp = this.getTotalCostDespesas();
          this.valorTot = this.getSaldo();
            this.listaGrafico = [
            {
              "name": "Receitas",
              "value": this.valorRec
            },
            {
              "name": "Despesas",
              "value": this.valorDesp
            },
            {
              "name": "Total",
              "value": this.valorTot
            }
          ];
          var dataAtual = new Date();
          var date = new Date(this.ano, this.mes , 0);
          console.log(dataAtual)
          console.log(date)
           if(dataAtual.getTime() == date.getTime()){
            console.log(date)
              if(this.valorTot < 0) {
                var expense: Expense = {
                  name : "Sobra Licita",
                  value : this.valorTot,
                  pay: false,
                  expenseDate : dataAtual,
                  expireDate : dataAtual,
                  parcela : 1,
                }
                console.log(expense)
                console.log(this.currentUser.id)
                  this.expenseService.createExpense(expense,this.currentUser.id, 1).subscribe(
                    result => {
                                       
                    });
                    
                  }
                  else{

                    var receipt: Receipt = {
                      name : "Sobra Licita",
                      value : this.valorTot,
                      expireDate : dataAtual,
                    }
                    console.log(expense)
                    console.log(this.currentUser.id)
                      this.receiptService.createReceipt(receipt,this.currentUser.id).subscribe(
                        result => {
                                           
                        });
                  }
              }
      
           
      }
    );
    this.receiptService.getReceiptsProfileMes(this.currentUser.id, this.mes, this.ano).subscribe(
      data => {
        this.receipts = data;
          this.valorRec = this.getTotalCostReceitas();
          this.valorDesp = this.getTotalCostDespesas();
          this.valorTot = this.getSaldo();
            this.listaGrafico = [
            {
              "name": "Receitas",
              "value": this.valorRec
            },
            {
              "name": "Despesas",
              "value": this.valorDesp
            },
            {
              "name": "Total",
              "value": this.valorTot
            }
          ];
      }
    );
  } else {
    this.expenseService.getExpensesProfileMes(this.currentUser.id, this.mes, this.ano).subscribe(
      data => {
        this.expenses = data;
          this.valorRec = this.getTotalCostReceitas();
          this.valorDesp = this.getTotalCostDespesas();
          this.valorTot = this.getSaldo();
            this.listaGrafico = [
            {
              "name": "Receitas",
              "value": this.valorRec
            },
            {
              "name": "Despesas",
              "value": this.valorDesp
            },
            {
              "name": "Total",
              "value": this.valorTot
            }
          ];
      }
    );
    this.receiptService.getReceiptsProfileMes(this.currentUser.id, this.mes, this.ano).subscribe(
      data => {
        this.receipts = data;
          this.valorRec = this.getTotalCostReceitas();
          this.valorDesp = this.getTotalCostDespesas();
          this.valorTot = this.getSaldo();
            this.listaGrafico = [
            {
              "name": "Receitas",
              "value": this.valorRec
            },
            {
              "name": "Despesas",
              "value": this.valorDesp
            },
            {
              "name": "Total",
              "value": this.valorTot
            }
          ];
      }
    );
  }
}

  // buscarGastos() {
  //   console.log(this.inicioDate)
  //   if (this.inicioDate === undefined && this.fimDate === undefined) {
  //     var date = new Date();
  //     var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  //     var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  //     this.expenseService.getExpensesProfile(this.currentUser.id, firstDay, lastDay).subscribe(
  //       data => {
  //         this.expenses = data;
  //       }
  //     );
  //     this.receiptService.getReceiptsProfile(this.currentUser.id, firstDay, lastDay).subscribe(
  //       data => {
  //         this.receipts = data;
  //         this.valorRec = this.getTotalCostReceitas();
  //         this.valorDesp = this.getTotalCostDespesas();
  //         this.valorTot = this.getSaldo();
  //           this.listaGrafico = [
  //           {
  //             "name": "Receitas",
  //             "value": this.valorRec
  //           },
  //           {
  //             "name": "Despesas",
  //             "value": this.valorDesp
  //           },
  //           {
  //             "name": "Total",
  //             "value": this.valorTot
  //           }
  //         ];
  //         console.log(this.listaGrafico)
  //       }
  //     );
  //   }
  //   else {
  //     this.expenseService.getExpensesProfile(this.currentUser.id, this.inicioDate, this.fimDate).subscribe(
  //       data => {
  //         this.expenses = data;
  //       }
  //     );
  //     this.receiptService.getReceiptsProfile(this.currentUser.id, this.inicioDate, this.fimDate).subscribe(
  //       data => {
  //         this.receipts = data;
  //         this.valorRec = this.getTotalCostReceitas();
  //         this.valorDesp = this.getTotalCostDespesas();
  //         this.valorTot = this.getSaldo();
  //           this.listaGrafico = [
  //           {
  //             "name": "Receitas",
  //             "value": this.valorRec
  //           },
  //           {
  //             "name": "Despesas",
  //             "value": this.valorDesp
  //           },
  //           {
  //             "name": "Total",
  //             "value": this.valorTot
  //           }
  //         ];
  //         console.log(this.listaGrafico)
  //       }
  //     );
  //   }

  // }
  // login out from the app
  logOut() {
      window.localStorage.clear();
     this.router.navigate(['/login']);

  }

}
