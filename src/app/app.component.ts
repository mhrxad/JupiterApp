import {Component, OnInit, Renderer2} from '@angular/core';
import {AuthService} from './Services/auth.service';
import {ICurrentUser} from './Interfaces/Account/current-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jupiter';
  user: ICurrentUser;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authService.checkUserAuth().subscribe(res => {
      if (res.status === 'Success') {
        this.user = {
          userId: res.data.userId,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          avatar: res.data.avatar,
          role: res.data.role,
          email: res.data.email,
          gender: res.data.gender
        };
        console.log(res);
        this.authService.setCurrentUser(this.user);
      }
    });



  }

}
