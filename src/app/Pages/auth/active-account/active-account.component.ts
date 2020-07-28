import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../Services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.activateAccount(this.activatedRoute.snapshot.params.activeCode).subscribe(res => {
      if (res.status === 'Success') {
        this.isLoading = false;
        this.snackBar.open('حساب کاربری شما فعال شد', 'باشه', {
          duration: 10000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          direction: 'rtl'
        });
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      }
    });
    this.isLoading = false;
  }

}
