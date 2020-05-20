import { OnsenModule } from 'ngx-onsenui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MainModule } from '../main/main.module';
import { NavigatorService } from './services/navigator.service';

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
    NavigatorService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CoreModule { }
