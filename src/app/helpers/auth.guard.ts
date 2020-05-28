import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.CurrentUserValue) return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
    return false;
  }
}
