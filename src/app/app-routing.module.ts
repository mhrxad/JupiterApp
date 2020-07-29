import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './Pages/auth/auth.component';
import { ActiveAccountComponent } from './Pages/auth/active-account/active-account.component';
import {HomeComponent} from './Pages/home/home.component';
import {HeaderSidenavComponent} from './SharedComponents/header-sidenav/header-sidenav.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent, pathMatch: 'full'},
  {path: 'auth/activate-account/:activeCode', component: ActiveAccountComponent},
  {path:'', component:HeaderSidenavComponent, children: [
      {path:'', component: HomeComponent}
    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponents = [
  AuthComponent,
  ActiveAccountComponent,
  HeaderSidenavComponent,
  HomeComponent
];
