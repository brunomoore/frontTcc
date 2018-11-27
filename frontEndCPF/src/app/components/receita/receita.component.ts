import { Router } from '@angular/router';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogSuccesComponent } from '../../dialog-succes/dialog-succes.component';
import { ReceiptService } from '../../services/receipt.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/model.user';
import { Receipt } from '../../model/model.receipt';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent implements OnInit {
  name: string ;
  value: number;
  pay: Boolean;
  currentUser: User;
  userId: number;
  expireDate: Date;
  parcela: number;
  listaReceita: Receipt[] = [];
  length = 0;
  pageSize = 10;
  page = 0;
  displayedColumns: string[] = ['Nome', 'Valor', 'Data', 'Editar'];
  dataSource = new MatTableDataSource<Receipt>();
  editarReceita: Boolean = false;
  editReceita: Receipt;
  message: Receipt;

  @ViewChild('f') form: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private receitaService: ReceiptService,
    private dataService: DataService,
    public dialog: MatDialog,
  ) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.receitaService.getReceipts(this.currentUser.id).subscribe(
      data => {
        console.log(data);
          this.listaReceita = data;
          console.log(this.listaReceita);
          this.dataSource = new MatTableDataSource<Receipt>(this.listaReceita);
        }
      );

    console.log(this.dataSource);
  }

  onSubmit() {
      console.log(this.form.value);
      // console.log(this.form.value.expireDate = this.dataService.criaVetorData(this.form.value.expireDate));
      // this.form.value.expireDate = this.dataService.criaVetorData(this.form.value.expireDate);
      this.receitaService.createReceipt(this.form.value, this.currentUser.id).subscribe(
        result => {
          const dialogRef = this.dialog.open(DialogSuccesComponent, {
            width: '40%',
            data: {
              titulo: 'Receita cadastrada com sucesso!',
              path: 'NR',
              fechar: false
            }
          });
          this.limparForm();
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
