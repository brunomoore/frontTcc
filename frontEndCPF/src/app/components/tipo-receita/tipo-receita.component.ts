import { Router } from '@angular/router';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogSuccesComponent } from '../../dialog-succes/dialog-succes.component';
import { ReceiptTypeService } from '../../services/receiptType.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/model.user';
import { ReceiptType } from '../../model/model.receiptType';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-tipo-receita',
  templateUrl: './tipo-receita.component.html',
  styleUrls: ['./tipo-receita.component.css']
})
export class TipoReceitaComponent implements OnInit {
  name: string ;
  param: string; 
  description: string;
  ativo: Boolean;
  currentUser: User;
  userId: number;
  listaTipoReceita: ReceiptType[] = [];
  length = 0;
  pageSize = 10;
  page = 0;
  displayedColumns: string[] = ['Nome', 'Editar'];
  dataSource = new MatTableDataSource<ReceiptType>();
  message: ReceiptType;

  @ViewChild('f') form: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tipoReceitaService: ReceiptTypeService,
    public dialog: MatDialog,
  ) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.getReceiptTypes();
  }

  getReceiptTypes(){
    this.tipoReceitaService.getReceiptTypes().subscribe(
      data => {
        console.log(data)
          this.listaTipoReceita = data;
          console.log(this.listaTipoReceita);
          this.dataSource = new MatTableDataSource<ReceiptType>(this.listaTipoReceita);
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
      this.tipoReceitaService.createReceiptType(this.form.value, this.currentUser.id).subscribe(
        result => {
          const dialogRef = this.dialog.open(DialogSuccesComponent, {
            width: '40%',
            data: {
              titulo: 'Tipo da Receita cadastrada com sucesso!',
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

  editTipoReceita(element) {
    console.log(element)
    this.tipoReceitaService.updateReceiptType(element).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Tipo da Receita alterada com sucesso!',
          path: 'NR',
          fechar: false
        }
        
      });
      this.ngOnInit();
    }) 
  }   

  deletarTipoReceita(element) {
    console.log(element)
    this.tipoReceitaService.deleteReceiptType(element.id).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Tipo da Receita apagada com sucesso!',
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
