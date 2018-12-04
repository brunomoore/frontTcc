import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {AccountService} from './services/account.service';
import { AuthService } from './services/auth.service';
import { ExpenseService } from './services/expense.service';
import { ReceiptService } from './services/receipt.service';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {UrlPermission} from './urlPermission/url.permission';
import { DespesaComponent } from './components/despesa/despesa.component';
import { ReceitaComponent } from './components/receita/receita.component';
import { DialogSuccesComponent } from './dialog-succes/dialog-succes.component';
import { DataService } from './services/data.service';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { NotificationService } from './services/notification.service';
import { TipoDespesaComponent } from './components/tipo-despesa/tipo-despesa.component';
import { TipoReceitaComponent } from './components/tipo-receita/tipo-receita.component';
import { ExpenseTypeService } from './services/expenseType.service';
import { ReceiptTypeService } from './services/receiptType.service';
import { EditReceitaComponent } from './components/edit-receita/edit-receita.component';
import { CurrencyMaskModule } from "ngx-currency-mask";
import { EditDespesaComponent } from './components/edit-despesa/edit-despesa.component';
import { EditNotificacaoComponent } from './edit-notificacao/edit-notificacao.component';
registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    DespesaComponent,
    ReceitaComponent,
    DialogSuccesComponent,
    NotificacaoComponent,
    TipoDespesaComponent,
    TipoReceitaComponent,
    EditReceitaComponent,
    EditDespesaComponent,
    EditNotificacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule,
    CurrencyMaskModule
  ],
  entryComponents: [DialogSuccesComponent, EditReceitaComponent, EditDespesaComponent],
  providers: [   {provide: LOCALE_ID, useValue: 'pt'}, AuthService, AccountService, UrlPermission, 
  ReceiptService, ExpenseService, DataService, NotificationService, ExpenseTypeService, ReceiptTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
