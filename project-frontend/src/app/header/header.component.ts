import { Component } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { NotificationService } from '../service/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userAuthService: UserAuthService, private router: Router, public userService: UserService,
              private notificationService: NotificationService, private toastr: ToastrService) { }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/'])
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

  public notify() {
    this.notificationService.notify().subscribe(
      (response) => {
        console.log(response);
        this.toastr.success("Email sent successfully", 'Success', {
          timeOut: 1500
        })
      },
      (error) => {
        this.toastr.error("Something wrong happened")
      }
    )
  }

}
