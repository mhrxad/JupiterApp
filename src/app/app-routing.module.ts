import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './Pages/auth/auth.component';
import {ActiveAccountComponent} from './Pages/auth/active-account/active-account.component';
import {HomeComponent} from './Pages/home/home.component';
import {HeaderSidenavComponent} from './SharedComponents/header-sidenav/header-sidenav.component';
import {AuthGuard} from './Guards/auth.guard';
import {CreateMessageComponent} from './Pages/create-message/create-message.component';
import {ProfessorGuard} from './Guards/professor.guard';
import {NgxPermissionsModule} from 'ngx-permissions';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: 'auth', component: AuthComponent, pathMatch: 'full'},
  {path: 'auth/activate-account/:activeCode', component: ActiveAccountComponent},

  {
    path: '', component: HeaderSidenavComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: '', component: HomeComponent},
      {path: 'create-message', component: CreateMessageComponent, canActivate:[ProfessorGuard]},
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgxPermissionsModule.forRoot()
  ],
  exports: [
    RouterModule,
    CommonModule,
    NgxPermissionsModule
  ]
})
export class AppRoutingModule {
}


export const routingComponents = [
  AuthComponent,
  ActiveAccountComponent,
  HeaderSidenavComponent,
  HomeComponent,
  CreateMessageComponent
];
