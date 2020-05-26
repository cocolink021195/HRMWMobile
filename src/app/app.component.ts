import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from './main/side-bar/side-bar.component';
import { NavigatorService } from './core/services/navigator/navigator.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  sideBar = SideBarComponent;
  contentPage: any;
  @ViewChild('splitter', { static: false }) splitter;
  @ViewChild('screenLoading', { static: false }) screenLoading;

  constructor(
    private navigatorService: NavigatorService,
  ) {

  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.navigatorService.menu$.subscribe(() => this.myMenu());
    this.navigatorService.getShowModal$.subscribe(() => this.screenLoading.nativeElement.show());
    this.navigatorService.getHideModal$.subscribe(() => this.screenLoading.nativeElement.hide());
  }

  //#region REDIRECT
  myMenu() {
    if (this.splitter.nativeElement.side) {
      if (this.splitter.nativeElement.side.isOpen) {
        this.splitter.nativeElement.side.close();
      } else {
        this.splitter.nativeElement.side.open();
      }
    }
  }
  //#endregion
}
