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

    this.listFunction = [{
      Header: 'CHO PHẢN HỒI',
      Icon: '../../../assets/images/give-feedback.png',
      Color: '#FFCDD2',
      Functions: [
        { Title: 'Thank you note', Number: 40, Icon: '../../../assets/images/heart.png', Background: '' },
        { Title: 'Phiếu con gấu', Number: 36, Icon: '../../../assets/images/bear.png', Background: '' },
        { Title: 'Set up cart', Number: 33, Icon: '../../../assets/images/sun.png', Background: '' },
        { Title: 'Phản hồi bất kỳ', Number: 33, Icon: '../../../assets/images/reply.png', Background: '' }
      ]
    },
    {
      Header: 'NHẬN PHẢN HỒI',
      Icon: '../../../assets/images/receive-feedback.png',
      Color: '#33B579',
      Functions: [
        { Title: 'Thank you note', Number: 40, Icon: '../../../assets/images/heart.png', Background: '' },
        { Title: 'Phiếu con gấu', Number: 36, Icon: '../../../assets/images/bear.png', Background: '' },
        { Title: 'Set up cart', Number: 33, Icon: '../../../assets/images/sun.png', Background: '' },
        { Title: 'Phản hồi bất kỳ', Number: 33, Icon: '../../../assets/images/reply.png', Background: '' }
      ]
    },
    {
      Header: 'CHỦ ĐỘNG XIN PHẢN HỒI',
      Icon: '../../../assets/images/please-feedback.png',
      Color: '#FDF16B',
      Functions: [
        { Title: 'Xin Phản Hồi', Number: 45, Icon: '../../../assets/images/pen-left.png', Background: '' },
        { Title: 'Phản Hồi Yêu Cầu', Number: 68, Icon: '../../../assets/images/pen-right.png', Background: '' }
      ]
    }]
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
