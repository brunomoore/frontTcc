import { Component, OnInit } from '@angular/core';

import {User} from "../../model/model.user";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import { DialogSuccesComponent } from '../../dialog-succes/dialog-succes.component';
import { MatDialog, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  errorMessage: string;

  constructor(
    public accountService: AccountService,
    public router: Router,
    public dialog: MatDialog,
    ) {
  }

  ngOnInit() {
  }

  register() {
    this.accountService.createAccount(this.user).subscribe(data => {
      const dialogRef = this.dialog.open(DialogSuccesComponent, {
        width: '40%',
        data: {
          titulo: 'Cadastro realizado com sucesso',
          path: '/login',
          fechar: false
        }
        
      });
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        this.errorMessage = "Usuário já existe";
      }
    )
  }

}
