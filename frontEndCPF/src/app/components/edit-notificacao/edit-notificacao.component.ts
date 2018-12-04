import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Notification } from 'src/app/model/model.notification';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogSuccesComponent } from 'src/app/dialog-succes/dialog-succes.component';

@Component({
  selector: 'app-edit-despesa',
  templateUrl: './edit-despesa.component.html',
  styleUrls: ['./edit-despesa.component.css']
})
export class EditNotificacaoComponent implements OnInit {
  @ViewChild('f')
  form: any;
  // @Input() editAutoTexto: AutoTexto;

  despesa: Notification;
  tipos = [];
  name: string;
  expireDate: Date;
  notificationDate: Date;
  parcela: number;
  id: number;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    // private data: EditAutoTexto,
    private receitpService: NotificationService,
    public dialogRef: MatDialogRef<EditNotificacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.tipoService.getNotificationTypes().subscribe(
      data => {
          this.tipos = data;
        }
      );
    this.despesa = this.data;
    this.name = this.despesa.name;
    this.value = this.despesa.value;
    this.type = this.despesa.type;
    this.expireDate = this.despesa.expireDate;
    this.notificationDate = this.despesa.notificationDate;
    this.parcela = this.despesa.parcela;
    this.id = this.despesa.id;
    console.log(this.expireDate)
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  backButton() {
    this.dialogRef.close();
  }

  onSubmit() {
    const despesa: Notification = {
      name: this.form.value.name,
      value: this.form.value.value,
      id: this.despesa.id,
      ativo: this.despesa.ativo,
      pay: this.despesa.pay,
      type: this.form.value.type,
      notificationDate: this.form.value.notificationDate,
      expireDate: this.form.value.expireDate,
      user: this.despesa.user,
      parcela:this.form.value.parcela
    };
    console.log(despesa)
      this.receitpService.updateNotification(despesa).subscribe(
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

