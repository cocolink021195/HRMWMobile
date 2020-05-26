import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    // private authService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request = request.clone({
    //   setHeaders: {
    //     'Content-Type': environment.HeaderHRM.ContentType,
    //     'HRM-Application-ID': environment.HeaderHRM.ApplicationID,
    //     'HRM-Request-Url': this.router.url,
    //     'HRM-Api-Type': environment.HeaderHRM.ApiType,
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
    //   }
    // });

    console.log('HRM-Request-Url: ', request);
    // const currentUser = this.authService.currentUserValue;
    // if (currentUser && currentUser.SecurityKey) {
    //     const sBasic = btoa(currentUser.UserID + ':' + currentUser.SecurityKey + ':SK' + ':' + (currentUser.DBName || LVConfig.ConnectionName));
    //     request = request.clone({
    //         setHeaders: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Basic ' + sBasic
    //         }
    //     });
    // }

    return next.handle(request);
  }
}
