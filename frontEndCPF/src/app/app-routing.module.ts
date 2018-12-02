import { NotificacaoComponent } from './components/notificacao/notificacao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UrlPermission } from './urlPermission/url.permission';
import { ReceitaComponent } from './components/receita/receita.component';
import { DespesaComponent } from './components/despesa/despesa.component';
import { TipoDespesaComponent } from './components/tipo-despesa/tipo-despesa.component';
import { TipoReceitaComponent } from './components/tipo-receita/tipo-receita.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [UrlPermission]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'receitas', component: ReceitaComponent},
  { path: 'despesas', component: DespesaComponent},
  { path: 'notificacoes', component: NotificacaoComponent },
  { path: 'tipoDespesa', component: TipoDespesaComponent },
  { path: 'tipoReceita', component: TipoReceitaComponent },

  // otherwise redirect to profile
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
