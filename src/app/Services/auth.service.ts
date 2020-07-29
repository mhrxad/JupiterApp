import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IRegisterUser} from '../Interfaces/Account/register-user';
import {ICurrentUser} from '../Interfaces/Account/current-user';
import {ILoginUser} from '../Interfaces/Account/login-user';
import {IResponseResult} from '../Interfaces/Common/IResponseResult';
import {ILoginUserResponse} from '../Interfaces/Account/login-user-response';
import {ICheckUserAuth} from '../Interfaces/Account/check-user-auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<ICurrentUser> = new BehaviorSubject<ICurrentUser>(null);


  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
  }

  setCurrentUser(user: ICurrentUser): void {
    this.currentUser.next(user);
  }

  getCurrentUser(): Observable<ICurrentUser> {
    return this.currentUser;
  }

  //#region " Register User "
  registerUser(registerData: IRegisterUser): Observable<any> {
    return this.http.post<any>('/account/register', registerData)
      .pipe(
        retry(3),
        catchError((err) => {
          throw this.snackBar.open('خطا در برقراری ارتباط با سرور دقایقی بعد دوباره امتحان کنید', 'باشه', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            direction: 'rtl'
          });
        })
      );
  }

  //#endregion

  //#region " Login User "
  loginUser(user: ILoginUser): Observable<IResponseResult<ILoginUserResponse>> {
    return this.http.post<IResponseResult<ILoginUserResponse>>('/account/login', user).pipe(
      retry(3),
      catchError((err) => {
        throw this.snackBar.open('خطا در برقراری ارتباط با سرور دقایقی بعد دوباره امتحان کنید', 'باشه', {
          duration: 10000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          direction: 'rtl'
        });
      })
    );
  }

  //#endregion

  checkUserAuth(): Observable<IResponseResult<ICheckUserAuth>> {
    return this.http.post<IResponseResult<ICheckUserAuth>>('/account/check-auth', null);
  }

  // logOutUser(): Observable<any> {
  //   return this.http.get('/account/sign-out');
  // }
  //

  //#region " Active Acount "
  activateAccount(emailActiveCode: string): Observable<any> {
    return this.http.get('/account/activate-account/' + emailActiveCode);
  }
  //#region
}
