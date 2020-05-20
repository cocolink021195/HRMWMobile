import { Component, OnInit } from '@angular/core';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { OnsNavigator } from 'ngx-onsenui';
import { ListComponent } from '../list/list.component';
import { AddSendFeedbackComponent } from 'src/app/modules/feedback-system/send-feedback/add-send-feedback/add-send-feedback.component';

@Component({
  selector: 'ons-page[home]',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  listFunction: any;

  constructor(
    private navigator: OnsNavigator,
    private navigatorService: NavigatorService
  ) { }

  ngOnInit() {
    this.loadFunction();
  }

  loadFunction() {
    this.listFunction = [{
      Header: 'Cho Phản Hồi',
      Icon: 'fsap fsap-outbox',
      Color: '#000000',
      Functions: [
        { Title: 'Thank You', Number: 999999999, Icon: 'fsap fsap-favorite-list', Background: '' },
        { Title: 'Phiếu Con Gấu', Number: 999999999, Icon: 'fsap fsap-favorite-list', Background: '' },
        { Title: 'Phản Hồi Khác', Number: 999999999, Icon: 'fsap fsap-favorite-list', Background: '' }
      ]
    },
    {
      Header: 'Nhận Phản Hồi',
      Icon: 'fsap fsap-inbox',
      Color: '#ffa500',
      Functions: [
        { Title: 'Thank You', Number: 999999999, Icon: 'fsap fsap-favorite-list', Background: '' },
        { Title: 'Phiếu Con Gấu', Number: 999999999, Icon: 'fsap fsap-favorite-list', Background: '' },
        { Title: 'Phản Hồi Khác', Number: 999999999, Icon: 'fsap fsap-favorite-list', Background: '' }
      ]
    },
    {
      Header: 'Yêu Cầu Cho Phản Hồi',
      Icon: 'fsap fsap-email',
      Color: '#3fff00',
      Functions: [
        { Title: 'Xin Phản Hồi', Number: 999999999, Icon: 'fsap fsap-favorite-list', Background: '' },
        { Title: 'Phản Hồi Yêu Cầu', Number: 999999999, Icon: 'fsap fsap-favorite-list', Background: '' }
      ]
    }]
  }

  eventOpenMenu() {
    this.navigatorService.myMenu();
  }

  eventOnPushAddNew() {
    this.navigator.element.pushPage(AddSendFeedbackComponent);
  }
}
