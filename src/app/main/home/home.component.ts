import { environment } from 'src/environments/environment';
import { HrmApiService } from './../../core/services/hrm-api/hrm-api.service';
import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { NavigatorService } from 'src/app/core/services/navigator/navigator.service';
import { ListComponent } from '../list/list.component';
import { AddSendFeedbackComponent } from 'src/app/modules/feedback-system/send-feedback/add-send-feedback/add-send-feedback.component';
import { ReviewSendFeedbackComponent } from 'src/app/modules/feedback-system/send-feedback/review-send-feedback/review-send-feedback.component';
import { AddRequestFeedbackComponent } from 'src/app/modules/feedback-system/request-feedback/add-request-feedback/add-request-feedback.component';
import { DetailRequestFeedbackComponent } from 'src/app/modules/feedback-system/request-feedback/detail-request-feedback/detail-request-feedback.component';

@Component({
  selector: 'ons-page[home]',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  tmpData: any;
  tmpData1: any;
  listFunction: any;

  constructor(
    private navigator: OnsNavigator,
    private hrmApiService: HrmApiService,
    private navigatorService: NavigatorService
  ) { }

  ngOnInit() {
    this.loadFunction();
  }

  loadFunction() {
    this.hrmApiService.postSV('HrmMobileWeb/home/load/functionlist', 'FUNCTION_ID')
      .subscribe(data => {
        console.log('loadFunction: ', data);

      })

      
    // this.listFunction = [{
    //   Header: 'Cho Phản Hồi',
    //   Icon: 'fsap fsap-outbox',
    //   Color: 'var(--color-primary-6)',
    //   Functions: [
    //     { Title: 'Thank You', Number: 40, Icon: 'fsap fsap-add-favorite', Background: '' },
    //     { Title: 'Phiếu Con Gấu', Number: 36, Icon: 'fsap fsap-discussion', Background: '' },
    //     { Title: 'Phản Hồi Khác', Number: 33, Icon: 'fsap fsap-discussion-2', Background: '' }
    //   ]
    // },
    // {
    //   Header: 'Nhận Phản Hồi',
    //   Icon: 'fsap fsap-inbox',
    //   Color: 'var(--color-primary-6)',
    //   Functions: [
    //     { Title: 'Thank You', Number: 56, Icon: 'fsap fsap-add-favorite', Background: '' },
    //     { Title: 'Phiếu Con Gấu', Number: 80, Icon: 'fsap fsap-discussion', Background: '' },
    //     { Title: 'Phản Hồi Khác', Number: 45, Icon: 'fsap fsap-discussion-2', Background: '' }
    //   ]
    // },
    // {
    //   Header: 'Yêu Cầu Cho Phản Hồi',
    //   Icon: 'fsap fsap-email',
    //   Color: 'var(--color-primary-6)',
    //   Functions: [
    //     { Title: 'Xin Phản Hồi', Number: 45, Icon: 'fsap fsap-question-mark', Background: '' },
    //     { Title: 'Phản Hồi Yêu Cầu', Number: 68, Icon: 'fsap fsap-approvals', Background: '' }
    //   ]
    // }]
  }











  eventOpenMenu() {
    this.navigatorService.myMenu();
  }

  eventOnPushList() {
    this.navigator.element.pushPage(ListComponent);
  }

  eventOnPushAddNew() {
    this.navigator.element.pushPage(AddSendFeedbackComponent);
  }

  eventOnPushReview() {
    this.navigator.element.pushPage(ReviewSendFeedbackComponent);
  }

  eventOnPushAddRequestFeedback() {
    this.navigator.element.pushPage(AddRequestFeedbackComponent);
  }

  eventOnPushDetailRequestFeedback() {
    this.navigator.element.pushPage(DetailRequestFeedbackComponent);
  }
}
