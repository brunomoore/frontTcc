import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from "./services/auth.service";
import {HttpModule} from "@angular/http";
import {AccountService} from "./services/account.service";
import { ProfileComponent } from './components/profile/profile.component';
import {routing} from "./app.routing";
import {FacebookModule} from "ngx-facebook";
import {UrlPermission} from "./urlPermission/url.permission";
import { SidebarDirective } from './sidebar.directive';
import { ReceiptService } from './services/receipt.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExpenseService } from './services/expense.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SidebarDirective,


  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    routing,
    FacebookModule.forRoot(),
  ],
  providers: [AuthService,AccountService,UrlPermission,ReceiptService, ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
