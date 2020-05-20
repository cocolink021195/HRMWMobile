import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSendFeedbackComponent } from './send-feedback/add-send-feedback/add-send-feedback.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AddSendFeedbackComponent
  ],
  entryComponents: [
    AddSendFeedbackComponent
  ],
  exports: [],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FeedbackSystemModule { }
