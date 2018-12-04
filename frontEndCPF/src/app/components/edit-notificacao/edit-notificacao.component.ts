import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Notification } from 'src/app/model/model.notification';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogSuccesComponent } from 'src/app/dialog-succes/dialog-succes.component';
export interface Tipo {
  id: number;
  type: string;
}
@Component({
  selector: 'app-edit-notificacao',
  templateUrl: './edit-notificacao.component.html',
  styleUrls: ['./edit-notificacao.component.css']
})
export class EditNotificacaoComponent implements OnInit {
  @ViewChild('f')
  form: any;
  // @Input() editAutoTexto: AutoTexto;

  notificacao: Notification;
  tipos: Tipo[] = [
    { id: 1, type: "Saldo Negativo" },
    { id: 2, type: "Saldo" },
    { id: 3, type: "Contas a Vencer" },
  ];
  name: string;
  description: string;
  param: string;
  tipo: number;
  id: number;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    // private data: EditAutoTexto,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EditNotificacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.notificacao = this.data;
    this.name = this.notificacao.name;
    this.description = this.notificacao.description;
    this.tipo = this.notificacao.tipo;
    this.id = this.notificacao.id;
    this.param = this.notificacao.param;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  backButton() {
    this.dialogRef.close();
  }

  onSubmit() {
    const notificacao: Notification = {
      name: this.form.value.name,
      description: this.form.value.description,
      param: this.form.value.param,
      tipo: this.form.value.tipo,
      id: this.notificacao.id,
      ativo: this.notificacao.ativo,
      user: this.notificacao.user,
    };
    console.log(notificacao);
      this.notificationService.updateNotification(notificacao).subscribe(
      result => {
        this.dialogRef.close();
        const dialogRefSuccess = this.dialog.open(DialogSuccesComponent, {
          width: '35%',
          data: {
            // tslint:disable-next-line:max-line-length
            titulo: 'A Notificacao foi atualizada com sucesso!',
            path: 'NR',
            fechar: false
          }
        });
      },
      err => {
        const dialogRefSuccess = this.dialog.open(DialogSuccesComponent, {
          width: '35%',
          data: {
            titulo: err.error.ErrorMsg,
            path: 'NR'
          }
        });
      })
    }

}

