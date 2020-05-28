import { HomeComponent } from './main/home/home.component';
import { Unsubscriber } from 'src/app/hocs/unsubscriber.hoc';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from './main/side-bar/side-bar.component';
import { NavigatorService } from './core/services/navigator/navigator.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Unsubscriber()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isActiveSideBar = true;
  sideBar = SideBarComponent;
  contentPage: any;

  @ViewChild('navi', { static: false }) navi;
  @ViewChild('splitter', { static: false }) splitter;
  @ViewChild('screenLoading', { static: false }) screenLoading;

  constructor(
    private router: Router,
    private navigatorService: NavigatorService,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser
      .pipe(takeUntil((this as any).destroyed$))
      .subscribe(user => user ? this.isActiveSideBar = true : false);
  }

  ngOnInit() {
    console.error('KHOA isActiveSideBar = TRUE')
  }

  ngAfterViewInit() {
    this.navigatorService.menu$.subscribe(() => this.myMenu());
    this.navigatorService.naviLogin$.subscribe(() => this.myLogin());
    this.navigatorService.naviHome$.subscribe(() => this.myHomePage());
    this.navigatorService.getShowModal$.subscribe(() => this.screenLoading.nativeElement.show());
    this.navigatorService.getHideModal$.subscribe(() => this.screenLoading.nativeElement.hide());
  }

  myHomePage() {
    this.closeSideBar();
    this.router.navigate(['/']);
    if (this.navi.nativeElement.pages.length > 1)
      this.navi.nativeElement.resetToPage(HomeComponent, { animation: 'fade' });

    setTimeout(() => {
      if (this.navi.nativeElement.pages[1])
        this.navi.nativeElement.pages[1].remove();
    }, 1000);
  }

  //#region REDIRECT
  myMenu() {
    console.log('myMenu')
    if (this.splitter.nativeElement.side) {
      if (this.splitter.nativeElement.side.isOpen) {
        this.splitter.nativeElement.side.close();
      } else {
        this.splitter.nativeElement.side.open();
      }
    }
  }
  //#endregion

  myLogin() {
    this.isActiveSideBar = false;
    this.closeSideBar();
    this.router.navigate(['/login']);

    const pages = this.navi.nativeElement.pages;
    if (pages) {
      pages.forEach(element => element ? element.remove() : null);
    }
    this.navigatorService.hideScreenLoading();
  }

  closeSideBar() {
    const side = this.splitter.nativeElement.side;
    if (side && side.isOpen)
      this.splitter.nativeElement.side.close();
  }
}
