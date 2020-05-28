import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': environment.HeaderHRM.ContentType
      }
    });

    console.log('HRM-Request-Url: ', request);
    return next.handle(request);
  }
}
