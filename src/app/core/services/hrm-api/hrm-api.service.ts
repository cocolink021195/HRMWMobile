import { environment } from 'src/environments/environment';
import { SettingService } from './../setting/setting.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserLogin } from './../authentication/user-login';
import { NavigatorService } from './../navigator/navigator.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class HrmApiService {
  headerHRM = environment.HeaderHRM;
  hrmAPI = environment.API;

  constructor(
    private http: HttpClient,
    private navigatorService: NavigatorService,
    private notificationsService: NotificationsService,
    private authenticationService: AuthenticationService,
  ) { }

  postSV(apiURL, functionID, data = null, loading = false) {
    const headers = this.getHeader([apiURL, functionID]);
    return this.hrmPost(headers, data, loading);
  }

  hrmPost(headers, data, loading = false): Observable<any> {
    if (loading) this.navigatorService.showScreenLoading();

    const currentUser = this.authenticationService.CurrentUserValue;
    if (currentUser && currentUser[environment.KeyJwt]) {
      headers[environment.KeyHrmJwtID] = currentUser[environment.KeyJwt];
    }

    const request = this.getRequest(headers, data);
    return this.http.post<any>(this.hrmAPI, request)
      .pipe(map(result => {
        console.log('hrmPost result: ', result);
        if (loading) this.navigatorService.hideScreenLoading();

        if (result && (result.Error || result.ErrorLogin || result.ErrorCode)) {
          const error = result ? result.ErrorCode || result.ErrorLogin || result.Error : environment.Notification.Error;
          this.notificationsService.notify(result.Error, 1500);
        }

        return result && result.Data;
      }));
  }




  testingPost() {
    const api = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner';
    return this.http.get<any>(api)
      .pipe(map(result => result));
  }







  getHeader([apiURL, functionID]) {
    return {
      "HRM-Api-Url": apiURL,
      "HRM-Function-ID": functionID,
      "HRM-Request-Url": window.location.href,
      "HRM-Api-Type": environment.HeaderHRM.ApiType,
      "HRM-Application-ID": environment.HeaderHRM.ApplicationID
    };
  }

  getRequest(headers, payload) {
    let request = "headers=" + window.encodeURIComponent(JSON.stringify(headers));
    if (payload) {
      request += "&payload=" + window.encodeURIComponent(JSON.stringify(payload))
    }
    return request;
  }
}
