import { Receipt } from './../../model/model.receipt';
import { ExpenseService } from './../../services/expense.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import { Expense } from '../../model/model.expense';
import { ReceiptService }from "../../services/receipt.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  totalReceita = 0;
  totalDespesa = 0;
  receipts = []
  expenses = []
  currentUser: User;
  constructor(public authService: AuthService, public router: Router, public receiptService: ReceiptService,  public expenseService: ExpenseService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


  }

  ngOnInit() {
    this.receiptService.getReceipts(this.currentUser.id).subscribe(
      data => {

        console.log(data)
        this.receipts = this.retiraArrayRec(data);
        this.somaTudoRec();
      }
      );
      this.expenseService.getExpenses(this.currentUser.id).subscribe(
        data => {
          this.expenses =this.retiraArrayDesp(data);
          this.somaTudoDes();
        }
        );
        console.log(this.receipts)
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

        });
  }
}
