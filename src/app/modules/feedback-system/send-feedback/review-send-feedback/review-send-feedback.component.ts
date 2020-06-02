import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'ons-page[app-review-send-feedback]',
  templateUrl: './review-send-feedback.component.html'
})
export class ReviewSendFeedbackComponent implements OnInit {
  title = 'Thank you note - Xem'
  constructor() { }

  ngOnInit() {  
    window.addEventListener('resize', function (event) {
      var imgHeight = document.getElementById("cart-background");      
      const clientHeight = imgHeight && imgHeight.clientHeight || 0;
      if (clientHeight == 0) return;
      $('.js-view-background').css('height', clientHeight / 3 + 'px');      
    });
  }
  onImageLoad() {
    const heightImg = $('#cart-background').height();    
    if (heightImg > 0) {
      $('.js-view-background').css('height', heightImg / 3 - 20 + 'px');
    }
  }

}
