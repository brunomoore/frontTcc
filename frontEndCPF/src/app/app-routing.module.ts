import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UrlPermission } from './urlPermission/url.permission';
import { ReceitaComponent } from './components/receita/receita.component';
import { DespesaComponent } from './components/despesa/despesa.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [UrlPermission]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'receitas', component: ReceitaComponent},
  { path: 'despesas', component: DespesaComponent},

  // otherwise redirect to profile
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
