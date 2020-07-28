import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './Pages/auth/auth.component';
import { ActiveAccountComponent } from './Pages/auth/active-account/active-account.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'auth/activate-account/:activeCode', component: ActiveAccountComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponents = [
  AuthComponent,
  ActiveAccountComponent
];
