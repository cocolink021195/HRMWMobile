import { SettingService } from './../setting/setting.service';
import { HrmApiService } from './../hrm-api/hrm-api.service';
import { NavigatorService } from 'src/app/core/services/navigator/navigator.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationsService } from '../notifications/notifications.service';
import { UserLogin } from './user-login';

const KEY_LOCAL_STORAGE = 'CURRENT_USER';
@Injectable()
export class AuthenticationService {
  headerHRM = environment.HeaderHRM;
  private currentUserSubject: BehaviorSubject<object>;
  public currentUser: Observable<object>;
  // onLine = window.navigator.onLine;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<object>(JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get CurrentUserValue(): object {
    return this.currentUserSubject.value;
  }

  // checkUserStatus() {
  //   const user = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
  //   return (!user || !user.UserID || !user.SecurityKey || !this.onLine) ? false : true;
  // }

  // checkUserToken() {
  //   const user = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
  //   if (!user.DBName) {
  //     user.DBName = LVConfig.ConnectionName;
  //   }
  //   return this.post(this.API + 'checktoken', user).pipe(map(data => data));
  // }

  login(loginInfo: UserLogin) {
    return this.postSv(this.headerHRM.LoginApiUrl, this.headerHRM.LoginFunctionID, loginInfo)
      .pipe(map(response => {
        console.log('login response: ', response);
        const request = { IsError: true, Data: null, Error: null };
        if (response && !response.Error && !response.ErrorCode && !response.ErrorLogin) {
          const responseData = JSON.parse(response.Data);
          const userData = responseData.Data;
          localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(userData));
          this.currentUserSubject.next(userData);

          request.IsError = false;
          request.Data = userData
        } else {
          const error = response ? response.ErrorCode || response.ErrorLogin || response.Error : environment.Notification.UserNotFound;
          request.IsError = true;
          request.Error = error;
        }
        return request;
      }));
  }

  logout() {
    localStorage.removeItem(KEY_LOCAL_STORAGE);
    this.currentUserSubject.next(null);
  }

  checkSession() {
    return this.postSv(this.headerHRM.CheckSessionApiUrl, this.headerHRM.CheckSessionFunctionID)
      .pipe(map(user => {
        console.log('checkSession     user: ', user);
        return user;
      }));
  }










  postSv(apiURL, functionID, data = null) {
    let request = this.getHeader([apiURL, functionID]);
    if (data) {
      request += "&payload=" + window.encodeURIComponent(JSON.stringify(data));
    }

    return this.http.post<any>(environment.API, request);
  }

  getHeader([apiURL, functionID]) {
    return "headers=" + window.encodeURIComponent(JSON.stringify({
      "HRM-Api-Url": apiURL,
      "HRM-Function-ID": functionID,
      "HRM-Request-Url": window.location.href,
      "HRM-Api-Type": environment.HeaderHRM.ApiType,
      "HRM-Application-ID": environment.HeaderHRM.ApplicationID
    }));
  }
}