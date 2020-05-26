import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ons-page[app-add-send-feedback]',
  templateUrl: './add-send-feedback.component.html'
})
export class AddSendFeedbackComponent implements OnInit {
  title = 'Thank you note - Thêm';
  @ViewChild('modalAddSendFeedback', { static: true }) modalAddSendFeedback: any;

  constructor() { }

  ngOnInit() {
    var textAreas = document.getElementsByTagName('textarea');
    Array.prototype.forEach.call(textAreas, function(elem) {
        elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });
  }

  eventShowModalAddSendFeedback() {
    if (this.modalAddSendFeedback) this.modalAddSendFeedback.show();
  }
}
