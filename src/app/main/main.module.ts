import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FeedbackSystemModule } from './../modules/feedback-system/feedback-system.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListComponent } from './list/list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    SharedModule,
    FeedbackSystemModule
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
    SideBarComponent,
    ListComponent,
    UserProfileComponent,

  ],
  entryComponents: [
    LoginComponent,
    HomeComponent,
    SideBarComponent,
    ListComponent,
    UserProfileComponent,

  ],
  exports: [
    LoginComponent,
    HomeComponent,
    SideBarComponent,
    ListComponent,
    UserProfileComponent,

  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MainModule { }
