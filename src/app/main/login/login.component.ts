import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserLogin } from 'src/app/core/services/authentication/user-login';
import { takeUntil } from 'rxjs/operators';
import { Unsubscriber } from 'src/app/hocs/unsubscriber.hoc';
import * as ons from 'onsenui';


@Unsubscriber()
@Component({
  selector: 'ons-page[login]',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginInfo: UserLogin;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loadMain();
  }

  loadMain() {
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
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
      UserName: username,
      Password: password,
      SystemName: environment.HeaderHRM.ApplicationID
    };

    console.log('this.loginInfo: ', this.loginInfo);

    this.authenticationService.login(this.loginInfo)
      .pipe(takeUntil((this as any).destroyed$))
      .subscribe(user => {
        console.log('authenticationService user: ', user);


      });
  }




}
