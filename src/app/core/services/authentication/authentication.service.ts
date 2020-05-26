import { NavigatorService } from 'src/app/core/services/navigator/navigator.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationsService } from '../notifications/notifications.service';
import { UserLogin } from './user-login';

@Injectable()
export class AuthenticationService {
  // private currentUserSubject: BehaviorSubject<object>;
  // public currentUser: Observable<object>;
  // onLine = window.navigator.onLine;
  headerHRM = environment.HeaderHRM;

  constructor(
    private http: HttpClient,
    private navigatorService: NavigatorService,
    private notificationsService: NotificationsService
  ) {
    // this.currentUserSubject = new BehaviorSubject<UserLogin>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // get currentUserValue(): UserLogin {
  //   return this.currentUserSubject.value;
  // }

  // checkUserStatus() {
  //   const user = JSON.parse(localStorage.getItem('currentUser'));
  //   return (!user || !user.UserID || !user.SecurityKey || !this.onLine) ? false : true;
  // }

  // checkUserToken() {
  //   const user = JSON.parse(localStorage.getItem('currentUser'));
  //   if (!user.DBName) {
  //     user.DBName = LVConfig.ConnectionName;
  //   }
  //   return this.post(this.API + 'checktoken', user).pipe(map(data => data));
  // }

  // getListDBName() {
  //   const action = '/mobile/executedata';
  //   const request = {
  //     IsJson: true,
  //     Assemply: 'SYS',
  //     ClassName: 'CommonServices',
  //     MethodName: 'GetListDBName',
  //     Data: null,
  //     UploadFiles: null
  //   };
  //   return this.post(action, JSON.stringify(request))
  //     .pipe(map(result => {
  //       if (result && result.Error) {
  //         this.notificationsService.notify(result.Error, 4000);
  //       }
  //       return result && result.Data[0];
  //     }));
  // }

  login(loginInfo: UserLogin) {
    if (!loginInfo || !loginInfo.UserName || !loginInfo.Password)
      return;

    return this.postLogin(loginInfo).pipe(map(user => {
      console.log('login     user: ', user);
      // if (user && user.SecurityKey) {
      //   localStorage.setItem('currentUser', JSON.stringify(user));
      //   // this.currentUserSubject.next(user);
      // }
      // this.notificationsService.notify(user);
      // return user;
    }));
  }

  // logout() {
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(null);
  // }

  // changePass(changePassInfo) {
  //   return this.post(this.API + 'changepass', changePassInfo)
  //     .pipe(map(change => {
  //       this.notificationsService.notify(change);
  //       return change;
  //     }));
  // }

  postLogin(data) {
    // this.navigatorService.showScreenLoading();

    const headers = new HttpHeaders({
      'Content-Type': this.headerHRM.ContentType,
      'HRM-Api-Url': this.headerHRM.ApiUrl,
      'HRM-Function-ID': this.headerHRM.FunctionIDLogin,
      'HRM-Application-ID': environment.HeaderHRM.ApplicationID,
      'HRM-Api-Type': environment.HeaderHRM.ApiType,
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      // 'Access-Control-Allow-Headers': '*'
    });
    const options = { headers: headers };




    // const api = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner';
    // return this.http.get<any>(api)
    //   .pipe(map(result => console.log('AAAAAAAAAAAA: ', result)));



    // const api = 'http://localhost/HrmMobileWebWS/api/Command/Ping';
    // return this.http.get<any>(api)
    //   .pipe(map(result => console.log('AAAAAAAAAAAA: ', result)));




    return this.http.post<any>(environment.API, data, options)
      .pipe(map(result => {
        // this.navigatorService.hideScreenLoading();

        console.log('postLogin result: ', result);
        return result && result.Data;
      }));
  }
}