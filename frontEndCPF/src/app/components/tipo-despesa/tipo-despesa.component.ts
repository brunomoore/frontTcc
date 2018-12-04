import { Router } from '@angular/router';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogSuccesComponent } from '../../dialog-succes/dialog-succes.component';
import { ExpenseTypeService } from '../../services/expenseType.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/model.user';
import { ExpenseType } from '../../model/model.expenseType';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-tipo-despesa',
  templateUrl: './tipo-despesa.component.html',
  styleUrls: ['./tipo-despesa.component.css']
})
export class TipoDespesaComponent implements OnInit {
  name: string ;
  param: string; 
  description: string;
  ativo: Boolean;
  currentUser: User;
  userId: number;
  listaTipoDespesa: ExpenseType[] = [];
  length = 0;
  pageSize = 10;
  page = 0;
  displayedColumns: string[] = ['Nome', 'Editar'];
  dataSource = new MatTableDataSource<ExpenseType>();
  message: ExpenseType;

  @ViewChild('f') form: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tipoDespesaService: ExpenseTypeService,
    public dialog: MatDialog,
  ) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.getExpenseTypes();
  }

  getExpenseTypes(){
    this.tipoDespesaService.getExpenseTypes().subscribe(
      data => {
        console.log(data)
          this.listaTipoDespesa = data;
          console.log(this.listaTipoDespesa);
          this.dataSource = new MatTableDataSource<ExpenseType>(this.listaTipoDespesa);
        }
      );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {
      console.log(this.form.value);
      // console.log(this.form.value.expireDate = this.dataService.criaVetorData(this.form.value.expireDate));
      // this.form.value.expireDate = this.dataService.criaVetorData(this.form.value.expireDate);
      this.tipoDespesaService.createExpenseType(this.form.value, this.currentUser.id).subscribe(
        result => {
          const dialogRef = this.dialog.open(DialogSuccesComponent, {
            width: '40%',
            data: {
              titulo: 'Tipo da Despesa cadastrada com sucesso!',
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

  editTipoDespesa(element) {
    console.log(element)
    this.tipoDespesaService.updateExpenseType(element).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Tipo da Despesa alterada com sucesso!',
          path: 'NR',
          fechar: false
        }
        
      });
      this.ngOnInit();
    }) 
  }   

  deletarTipoDespesa(element) {
    console.log(element)
    this.tipoDespesaService.deleteExpenseType(element.id).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Tipo da Despesa apagada com sucesso!',
          path: 'NR',
          fechar: false
        }
        
      });
      this.ngOnInit();
    }) 
  }  
  logOut() {
    window.localStorage.clear();
   this.router.navigate(['/login']);

}
}
