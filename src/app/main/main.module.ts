import { FeedbackSystemModule } from './../modules/feedback-system/feedback-system.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    SharedModule,
    FeedbackSystemModule
  ],
  declarations: [
    HomeComponent,
    SideBarComponent,
    ListComponent,

  ],
  entryComponents: [
    HomeComponent,
    SideBarComponent,
    ListComponent,

  ],
  exports: [
    HomeComponent,
    SideBarComponent,
    ListComponent,

  ],
  providers: [

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MainModule { }
