import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormControl } from '@angular/forms';
import {
  OnsSwitch 
} from 'ngx-onsenui';

@Component({
  selector: 'ons-page[app-add-send-feedback]',
  templateUrl: './add-send-feedback.component.html'
})
export class AddSendFeedbackComponent implements OnInit {
  title = 'Thank you note - Thêm';
  @ViewChild('modalAddSendFeedback', { static: true }) modalAddSendFeedback: any;
  levels: string[] = ['Mơ ước', 'Ngạc nhiên', 'Không thể tin được'];  
  levelsColor: string[] = ['79C373', '910B8D', 'EE2730'];  
  levelsControl: FormControl = new FormControl('');
  target: boolean = true;
  onPreHide(event) {
    // event.cancel(); // cancel hiding popover
  }
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
