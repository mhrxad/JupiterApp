import {Component, OnInit, Renderer2} from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ICurrentUser} from '../../Interfaces/Account/current-user';

@Component({
  selector: 'app-header-sidenav',
  templateUrl: './header-sidenav.component.html',
  styleUrls: ['./header-sidenav.component.scss']
})
export class HeaderSidenavComponent implements OnInit {

  user: ICurrentUser = null;
  isLoading = false;
  darktheme = 'light';


  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe(res => {
      this.user = res;
    });

    if (localStorage.getItem('theme') === 'dark') {
      this.renderer.addClass(document.body, 'dark-theme');
      this.darktheme = localStorage.getItem('theme');
    }


  }

  logOutUser() {
    this.isLoading = true;
    this.cookieService.delete('jupiter-cookie');
    this.authService.setCurrentUser(null);
    localStorage.clear();
    this.router.navigate(['/auth'], {relativeTo: this.activatedRoute});
    this.snackBar.open('شما با موفقيت از سايت خارج شديد', 'باشه', {
      duration: 10000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      direction: 'rtl'
    });
    this.isLoading = false;
  }

  changetheme() {
    this.isLoading = true;
    if (this.darktheme === 'light') {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
      this.darktheme = 'dark';
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'light');
      this.darktheme = 'light';
    }
    this.isLoading = false;
  }

}
