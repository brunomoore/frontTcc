import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {AccountService} from "./services/account.service";
import { AuthService } from "./services/auth.service";
import { ExpenseService } from './services/expense.service';
import { ReceiptService } from './services/receipt.service';
import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {UrlPermission} from "./urlPermission/url.permission";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [AuthService, AccountService, UrlPermission, ReceiptService, ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
