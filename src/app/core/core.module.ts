import { OnsenModule } from 'ngx-onsenui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Optional, SkipSelf } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MainModule } from '../main/main.module';
import { HrmApiService } from './services/hrm-api/hrm-api.service';
import { SettingService } from './services/setting/setting.service';
import { NavigatorService } from './services/navigator/navigator.service';
import { NotificationsService } from './services/notifications/notifications.service';
import { AuthenticationService } from './services/authentication/authentication.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OnsenModule,
    MainModule
  ],
  declarations: [],
  entryComponents: [],
  exports: [
    AppRoutingModule,
    OnsenModule,
    MainModule
  ],
  providers: [
    HrmApiService,
    SettingService,
    NavigatorService,
    NotificationsService,
    AuthenticationService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    this.throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
      throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
