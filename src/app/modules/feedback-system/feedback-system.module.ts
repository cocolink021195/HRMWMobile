import { ItemListFeedbackComponent } from './common/item-list/item-list-feedback/item-list-feedback.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSendFeedbackComponent } from './send-feedback/add-send-feedback/add-send-feedback.component';
import { ReviewSendFeedbackComponent } from './send-feedback/review-send-feedback/review-send-feedback.component';
import { AddRequestFeedbackComponent } from './request-feedback/add-request-feedback/add-request-feedback.component';
import { DetailRequestFeedbackComponent } from './request-feedback/detail-request-feedback/detail-request-feedback.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AddSendFeedbackComponent,
    ReviewSendFeedbackComponent,
    AddRequestFeedbackComponent,
    DetailRequestFeedbackComponent,


    ItemListFeedbackComponent,

    

  ],
  entryComponents: [
    AddSendFeedbackComponent,
    ReviewSendFeedbackComponent,
    AddRequestFeedbackComponent,
    DetailRequestFeedbackComponent,



    ItemListFeedbackComponent,

  ],
  exports: [],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FeedbackSystemModule { }
