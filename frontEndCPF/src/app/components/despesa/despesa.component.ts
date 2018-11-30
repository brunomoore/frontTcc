import { Router } from '@angular/router';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogSuccesComponent } from '../../dialog-succes/dialog-succes.component';
import { ExpenseService } from '../../services/expense.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/model.user';
import { Expense } from '../../model/model.expense';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit {
  name: string ;
  value: number;
  pay: Boolean;
  currentUser: User;
  userId: number;
  expireDate: Date;
  expenseDate: Date;
  parcela: number;
  listaDespesa: Expense[] = [];
  length = 0;
  pageSize = 10;
  page = 0;
  displayedColumns: string[] = ['Parcela', 'Nome', 'ValorTotal', 'Valor', 'Pago', 'DataVencimento', 'Editar', 'Marcar'];
  dataSource = new MatTableDataSource<Expense>();
  message: Expense;

  @ViewChild('f') form: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private despesaService: ExpenseService,
    private dataService: DataService,
    public dialog: MatDialog,
  ) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.getExpenses();
    console.log(this.dataSource);
  }

  getExpenses(){
    this.despesaService.getExpenses(this.currentUser.id).subscribe(
      data => {
          this.listaDespesa = data;
          console.log(this.listaDespesa);
          this.dataSource = new MatTableDataSource<Expense>(this.listaDespesa);
        }
      );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTotalCost() {
    return this.listaDespesa.map(t => t.value).reduce((acc, value) => acc + value, 0);
  }
  onSubmit() {
      console.log(this.form.value);
      // console.log(this.form.value.expireDate = this.dataService.criaVetorData(this.form.value.expireDate));
      // this.form.value.expireDate = this.dataService.criaVetorData(this.form.value.expireDate);
      this.despesaService.createExpense(this.form.value, this.currentUser.id).subscribe(
        result => {
          const dialogRef = this.dialog.open(DialogSuccesComponent, {
            width: '40%',
            data: {
              titulo: 'Despesa cadastrada com sucesso!',
              path: 'NR',
              fechar: false
            }
          });
          this.limparForm();
          this.ngOnInit();
        }, err => {
          const dialogRef = this.dialog.open(DialogSuccesComponent, {
            width: '40%',
            data: {
              titulo: err.error.ErrorMsg,
              path: 'NR',
              fechar: false
            }
          });
        }
      );
    }


  voltar() {
    this.router.navigate(['/profile']);
  }

  limparForm() {
    this.form.reset();
  }

  editDespesa(element) {
    console.log(element)
    this.despesaService.updateExpense(element).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Despesa paga com sucesso!',
          path: 'NR',
          fechar: false
        }
        
      });
      this.ngOnInit();
    }) 
  }   

  deletarDespesa(element) {
    console.log(element)
    this.despesaService.deleteExpense(element.id).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Despesa apagada com sucesso!',
          path: 'NR',
          fechar: false
        }
        
      });
      this.ngOnInit();
    }) 
  }  
  


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
