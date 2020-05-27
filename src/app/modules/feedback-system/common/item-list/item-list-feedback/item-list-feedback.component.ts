import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-list-feedback',
  templateUrl: './item-list-feedback.component.html'
})
export class ItemListFeedbackComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log('ItemListFeedbackComponent    ', this.data);
  }

}
