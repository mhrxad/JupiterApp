import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'jalali-moment';
import {MustMatch} from '../../Utilities/Validators/must-match.validator';
import {IRegisterUser} from '../../Interfaces/Account/IRegisterUser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerData: IRegisterUser;
  public registerForm: FormGroup;
  isLoading = false;
  passHide = true;
  dateOfBirth: any;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;

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


  get RF() {
    return this.registerForm.controls;
  }


  //#region "Submit Register Form"
  submitRegisterForm() {

    this.isLoading = true;

    this.dateOfBirth = moment(this.registerForm.controls.dateOfBirth.value, 'jYYYY,jMM,jDD').locale('en').format('YYYY/MM/DD');

    this.registerData = {
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      membershipNumber: this.registerForm.controls.membershipNumber.value,
      avatar: this.registerForm.controls.gender.value === '1' ? 'DefaultMaleAvatar' : 'DefaultFemaleAvatar',
      nationalCode: this.registerForm.controls.nationalCode.value,
      mobileNumber: '+98' + this.registerForm.controls.mobileNumber.value,
      dateOfBirth: this.dateOfBirth,
      gender: this.registerForm.controls.gender.value === '1' ? true : false,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      confirmPassword: this.registerForm.controls.confirmPassword.value,
    };
    console.log(this.registerData);

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
      },
      error => {
        this.isLoading = false;
        this.snackBar.open('ارسال اطلاعات انجام نشد دوباره انمتحان کنید', 'باشه', {
          duration: 10000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          direction: 'rtl'
        });
      }
    );
  }

// #endregion


}
