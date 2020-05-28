import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigatorService } from '../core/services/navigator/navigator.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private navigatorService: NavigatorService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.navigatorService.goToLogin();
      }
      const error = err.message || err.statusText;
      console.log('ErrorInterceptor: ', error);
      return throwError(error);
    }));
  }
}
