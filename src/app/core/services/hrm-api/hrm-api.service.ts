import { NavigatorService } from './../navigator/navigator.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class HrmApiService {
  hrmAPI = environment.API;

  constructor(
    private http: HttpClient,
    private navigatorService: NavigatorService,
    private notificationsService: NotificationsService
  ) { }

  postSV(apiURL, functionID, parameter, loading = false) {
    return this.hrmPost(apiURL, functionID, parameter, loading);
  }

  hrmPost(apiURL, functionID, parameter, loading = false): Observable<any> {
    if (loading) this.navigatorService.showScreenLoading();

    return this.http.post<any>(this.hrmAPI, JSON.stringify(parameter))
      .pipe(map(result => {
        if (loading) this.navigatorService.hideScreenLoading();

        if (result && result.Error) this.notificationsService.notify(result.Error, 1500);

        return result && result.Data[0];
      }));
  }

  testingPost() {
    const api = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner';
    return this.http.get<any>(api)
      .pipe(map(result => result));
  }
}
