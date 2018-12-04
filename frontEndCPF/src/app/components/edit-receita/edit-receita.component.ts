import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Receipt } from 'src/app/model/model.receipt';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ReceiptType } from 'src/app/model/model.receiptType';
import { ReceiptTypeService } from 'src/app/services/receiptType.service';
import { DialogSuccesComponent } from 'src/app/dialog-succes/dialog-succes.component';

@Component({
  selector: 'app-edit-receita',
  templateUrl: './edit-receita.component.html',
  styleUrls: ['./edit-receita.component.css']
})
export class EditReceitaComponent implements OnInit {
  @ViewChild('f')
  form: any;
  // @Input() editAutoTexto: AutoTexto;

  receita: Receipt;
  tipos = [];
  name: string;
  value: number;
  type: ReceiptType;
  expireDate: Date;
  id: number;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    // private data: EditAutoTexto,
    private receitpService: ReceiptService,
    private tipoService: ReceiptTypeService,
    public dialogRef: MatDialogRef<EditReceitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.tipoService.getReceiptTypes().subscribe(
      data => {
          this.tipos = data;
        }
      );
    this.receita = this.data;
    this.name = this.receita.name;
    this.value = this.receita.value;
    this.type = this.receita.type;
    this.expireDate = this.receita.expireDate;
    this.id = this.receita.id;
    console.log(this.expireDate)
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  backButton() {
    this.dialogRef.close();
  }

  onSubmit() {
    const receita: Receipt = {
      name: this.form.value.name,
      value: this.form.value.value,
      id: this.receita.id,
      ativo: this.receita.ativo,
      type: this.form.value.type,
      receiptDate: this.receita.receiptDate,
      expireDate: this.form.value.expireDate,
      user: this.receita.user,
    };
    console.log(receita)
      this.receitpService.updateReceipt(receita).subscribe(
      result => {
        this.dialogRef.close();
        const dialogRefSuccess = this.dialog.open(DialogSuccesComponent, {
          width: '35%',
          data: {
            // tslint:disable-next-line:max-line-length
            titulo: 'A Receita foi atualizado com sucesso!',
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

