import { Router } from '@angular/router';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogSuccesComponent } from '../../dialog-succes/dialog-succes.component';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/model.user';
import { Notification } from '../../model/model.notification';
import { DataService } from '../../services/data.service';
import { ReceiptTypeService } from 'src/app/services/receiptType.service';
import { EditNotificacaoComponent } from '../edit-notificacao/edit-notificacao.component';
export interface Tipo {
  id: number;
  type: string;
}


@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit {
  name: string ;
  param: string;
  description: string;
  ativo: Boolean;
  tipo:number;
  currentUser: User;
  userId: number;
  listaNotificacao: Notification[] = [];
  length = 0;
  pageSize = 10;
  page = 0;
  displayedColumns: string[] = ['Nome', 'Param', 'Descricao', 'Excluir', 'Editar'];
  dataSource = new MatTableDataSource<Notification>();
  message: Notification;
  tipos: Tipo[] = [
    { id: 1, type: "Saldo Negativo" },
    { id: 2, type: "Saldo" },
    { id: 3, type: "Contas a Vencer" },
  ]

  @ViewChild('f') form: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificacaoService: NotificationService,
    public dialog: MatDialog,
  ) { this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(){
    this.notificacaoService.getNotifications(this.currentUser.id).subscribe(
      data => {
        console.log(this.currentUser.id)
        console.log(data)
          this.listaNotificacao = data;
          console.log(this.listaNotificacao);
          this.dataSource = new MatTableDataSource<Notification>(this.listaNotificacao);
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
      this.notificacaoService.createNotification(this.form.value, this.currentUser.id).subscribe(
        result => {
          const dialogRef = this.dialog.open(DialogSuccesComponent, {
            width: '40%',
            data: {
              titulo: 'Notificacao cadastrada com sucesso!',
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

  editNotificacao(element) {
    console.log(element)
    this.notificacaoService.updateNotification(element).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Notificacao alterada com sucesso!',
          path: 'NR',
          fechar: false
        }

      });
      this.ngOnInit();
    });
  }

  editarNotificacao(notificacao: Notification) {
    const dialogRef = this.dialog.open(EditNotificacaoComponent, {
      disableClose: true,
      width: '80%',
      data: notificacao
    });
  }

  deletarNotificacao(element) {
    console.log(element)
    this.notificacaoService.deleteNotification(element.id).subscribe(
    result => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Notificacao apagada com sucesso!',
          path: 'NR',
          fechar: false
        }

      });
      this.ngOnInit();
    });
  }
  logOut() {
    window.localStorage.clear();
   this.router.navigate(['/login']);

}
}
