import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  CanActivateChild
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this.authService.checkUserAuth().toPromise().then(res => {
      if (res.status === 'Success') {
        return true;
      } else {
        this.router.navigate(['/auth']);
        return false;
      }
    },(reject) => {
      return false;
    });


  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(null, null);
  }
}
