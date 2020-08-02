import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../Services/auth.service';
import {rejects} from 'assert';
import {ICurrentUser} from '../Interfaces/Account/current-user';

@Injectable({
  providedIn: 'root'
})
export class ProfessorGuard implements CanActivate {

  user: ICurrentUser;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.checkUserAuth().toPromise().then(res => {
      if (res.status === 'Success') {
        if (res.data.role === 'Professor') {
          return true;
        }
      } else {
        this.router.navigate(['/auth']);
        return false;
      }
    });

    // return this.authService.getCurrentUser().toPromise().then(res => {
    //   if (res.role == 'Professor') {
    //     return true;
    //   } else {
    //     this.router.navigate(['/auth']);
    //     return false;
    //   }
    // }, (reject) => {
    //   return false;
    // });

  }

}

