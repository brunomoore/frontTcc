import { Router } from '@angular/router';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogSuccesComponent } from '../../dialog-succes/dialog-succes.component';
import { ReceiptService } from '../../services/receipt.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/model.user';
import { Receipt } from '../../model/model.receipt';
import { DataService } from '../../services/data.service';
import { ReceiptTypeService } from 'src/app/services/receiptType.service';
import { ReceiptType } from 'src/app/model/model.receiptType';



@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent implements OnInit {
  name: string ;
  value: number;
  pay: Boolean;
  type: ReceiptType;
  currentUser: User;
  userId: number;
  expireDate: Date;
  receiptDate: Date;
  parcela: number;
  listaReceita: Receipt[] = [];
  length = 0;
  pageSize = 10;
  page = 0;
  displayedColumns: string[] = ['Nome', 'Tipo', 'Valor', 'DataVencimento', 'Editar'];
  dataSource = new MatTableDataSource<Receipt>();
  message: Receipt;
  tipos = [];

  @ViewChild('f') form: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private receitaService: ReceiptService,
    private dataService: DataService,
    private tipoService: ReceiptTypeService,
    public dialog: MatDialog,
  ) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.getReceipts();
    this.getTipo();
    console.log(this.dataSource);
  }

  getTipo(){
    this.tipoService.getReceiptTypes().subscribe(
      data => {
          this.tipos = data;
        }
      );
  }
  getReceipts(){
    this.receitaService.getReceipts(this.currentUser.id).subscribe(
      data => {
        console.log(this.currentUser.id)
        console.log(data)
          this.listaReceita = data;
          console.log(this.listaReceita);
          this.dataSource = new MatTableDataSource<Receipt>(this.listaReceita);
        }
      );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTotalCost() {
    return this.listaReceita.map(t => t.value).reduce((acc, value) => acc + value, 0);
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

  editReceita(element) {
    console.log(element)
    this.receitaService.updateReceipt(element).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Receita paga com sucesso!',
          path: 'NR',
          fechar: false
        }
        
      });
      this.ngOnInit();
    }) 
  }   

  deletarReceita(element) {
    console.log(element)
    this.receitaService.deleteReceipt(element.id).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Receita apagada com sucesso!',
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
