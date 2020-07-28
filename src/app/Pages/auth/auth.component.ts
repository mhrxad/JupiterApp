import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'jalali-moment';
import {MustMatch} from '../../Utilities/Validators/must-match.validator';
import {IRegisterUser} from '../../Interfaces/Account/register-user';
import {ILoginUser} from '../../Interfaces/Account/login-user';
import {ICurrentUser} from '../../Interfaces/Account/current-user';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerData: IRegisterUser;
  loginData: ILoginUser;
  currentUser: ICurrentUser;
  public registerForm: FormGroup;
  public loginForm: FormGroup;
  isLoading = false;
  passHide = true;
  dateOfBirth: any;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    //#region "Login Form"
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(320)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      // @ts-ignore
    });
    //#endregion

    //#region "Register Form"
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(320)]),
      membershipNumber: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      nationalCode: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      mobileNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      dateOfBirth: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      gender: new FormControl('1', [Validators.required]),
      avatar: new FormControl(null),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
      // @ts-ignore
    }, {validators: MustMatch('password', 'confirmPassword')});
    //#endregion

    this.isLoading = false;
  }

  get LF() {
    return this.loginForm.controls;
  }

  get RF() {
    return this.registerForm.controls;
  }


  //#region "Submit Register Form"
  submitRegisterForm() {

    this.isLoading = true;
    if (this.registerForm.valid) {

      this.dateOfBirth = moment(this.registerForm.controls.dateOfBirth.value, 'jYYYY,jMM,jDD').locale('en').format('YYYY/MM/DD');

      this.registerData = {
        firstName: this.RF.firstName.value,
        lastName: this.RF.lastName.value,
        membershipNumber: this.RF.membershipNumber.value,
        avatar: this.RF.gender.value === '1' ? 'DefaultMaleAvatar' : 'DefaultFemaleAvatar',
        nationalCode: this.RF.nationalCode.value,
        mobileNumber: '+98' + this.RF.mobileNumber.value,
        dateOfBirth: this.dateOfBirth,
        gender: this.RF.gender.value === '1' ? true : false,
        email: this.RF.email.value,
        password: this.RF.password.value,
        confirmPassword: this.RF.confirmPassword.value
      };

      this.authService.registerUser(this.registerData).subscribe(res => {
        if (res.status === 'Success') {
          this.registerForm.reset(res, {emitEvent: true, onlySelf: true});
          this.isLoading = false;
          this.snackBar.open('ثبت نام شما با موفقیت انجام شد لینک فعال سازی حساب کاربری به ایمیل شما ارسال گردید', 'باشه', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            direction: 'rtl'
          });
          // this.router.navigate(['auth']);
          this.router.navigate(null, {relativeTo: this.activatedRoute});
        }
        if (res.status === 'Error') {
          if (res.data.info === 'EmailExist') {
            this.isLoading = false;
            this.snackBar.open('با این ایمیل قبلا ثبت نام انجام شده است', 'باشه', {
              duration: 10000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              direction: 'rtl'
            });
          }
        }
      });

    }
  }

// #endregion

//#region "Submit Login Form"
  submitLoginForm() {
    this.isLoading = true;

    if (this.loginForm.valid) {

      this.loginData = {
        email: this.LF.email.value,
        password: this.LF.password.value
      };

      this.authService.loginUser(this.loginData).subscribe(res => {

        this.currentUser = {
          userId: res.data.userId,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          avatar: res.data.avatar,
          role: res.data.role
        };

        if (res.status === 'Success') {
          this.cookieService.set('jupiter-cookie', res.data.token, res.data.expireTime * 60);
          this.authService.setCurrentUser(this.currentUser);
          this.loginForm.reset();
          this.isLoading = false;
          this.snackBar.open('شما با موفقيت وارد شديد', 'باشه', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            direction: 'rtl'
          });
          this.router.navigate(['/']);
        } else if (res.status === 'Error') {
          this.isLoading = false;
          this.snackBar.open(res.data.message, 'باشه', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            direction: 'rtl'
          });
        } else if (res.status === 'NotFound') {
          this.isLoading = false;
          this.snackBar.open(res.data.message, 'باشه', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            direction: 'rtl'
          });
        }
      });


    }
  }

  //#endregion


}
