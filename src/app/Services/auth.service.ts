import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IRegisterUser} from '../Interfaces/Account/register-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private currentUser: BehaviorSubject<CurrentUserDTO> = new BehaviorSubject<CurrentUserDTO>(null);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
  }

  // setCurrentUser(user: CurrentUserDTO): void {
  //   this.currentUser.next(user);
  // }
  //
  // getCurrentUser(): Observable<CurrentUserDTO> {
  //   return this.currentUser;
  // }


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

  // loginUser(loginUserDTO: LoginUserDTO): Observable<ILoginUserAccount> {
  //   return this.http.post<ILoginUserAccount>('/account/login', loginUserDTO);
  // }
  //
  // checkUserAuth(): Observable<ICheckUserAuthResult> {
  //   return this.http.post<ICheckUserAuthResult>('/account/check-auth', null);
  // }
  //
  // logOutUser(): Observable<any> {
  //   return this.http.get('/account/sign-out');
  // }
  //
  activateUser(emailActiveCode: string): Observable<any> {
    return this.http.get('/account/activate-account/' + emailActiveCode);
  }

}
