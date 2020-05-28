import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavigatorService } from 'src/app/core/services/navigator/navigator.service';
import { takeUntil } from 'rxjs/operators';
import { Unsubscriber } from 'src/app/hocs/unsubscriber.hoc';

@Unsubscriber()
@Component({
  selector: 'ons-page[side-bar]',
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent implements OnInit {
  currentUser: any;

  constructor(
    private navigatorService: NavigatorService,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser
      .pipe(takeUntil((this as any).destroyed$))
      .subscribe(user => this.currentUser = user || []);
  }

  ngOnInit() {
  }

  eventDashboard() {
    this.navigatorService.goToHome();
  }

  eventLogout() {
    this.navigatorService.goToLogin();
  }
}
