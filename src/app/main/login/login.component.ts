import { NotificationsService } from './../../core/services/notifications/notifications.service';
import { NavigatorService } from 'src/app/core/services/navigator/navigator.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserLogin } from 'src/app/core/services/authentication/user-login';
import { takeUntil } from 'rxjs/operators';
import { Unsubscriber } from 'src/app/hocs/unsubscriber.hoc';
import * as ons from 'onsenui';
import { Router, ActivatedRoute } from '@angular/router';


@Unsubscriber()
@Component({
  selector: 'ons-page[login]',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  loginInfo: UserLogin;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private navigatorService: NavigatorService,
    private notificationsService: NotificationsService
  ) { }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loadMain();
  }

  loadMain() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loginForm = this.formBuilder.group({
      Username: ['admin', Validators.required],
      Password: ['123456', Validators.required]
    });
  }

  eventLogin() {
    const username = this.f.Username.value;
    const password = this.f.Password.value;

    if (!username || !password) {
      ons.notification.alert('Xin vui lòng điền tên đăng nhập và mật khẩu !!!');
      return;
    }

    this.loginInfo = {
      Language: environment.HeaderHRM.Language,
      UserName: username,
      Password: password,
      SystemName: environment.HeaderHRM.ApplicationID
    };

    this.navigatorService.showScreenLoading();
    this.authenticationService.login(this.loginInfo)
      .pipe(takeUntil((this as any).destroyed$))
      .subscribe(response => {
        this.navigatorService.hideScreenLoading();

        if (response && false == response.IsError) {
          this.router.navigate(['/']);
        } else {
          this.notificationsService.notify(response.Error);
        }
      });
  }





}
