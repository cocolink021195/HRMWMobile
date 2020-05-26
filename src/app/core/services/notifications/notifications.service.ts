import { Injectable } from '@angular/core';
import * as ons from 'onsenui';

// NOTE 1000 = 1s
const MAX_NOTIFY_TIME_OUT = 2000;
@Injectable()
export class NotificationsService {
  isActiveNotify: boolean = true;
  constructor() { }

  notify(data, timeout = null) {
    if (!data) return;

    let msg = data, errorData = data;
    if (typeof errorData === 'object') {
      if (data.hasOwnProperty('IsError')) {
        errorData = data;
      } else {
        errorData = data.Error;
      }

      if (errorData == undefined) return;

      if (errorData && errorData.IsError) {
        msg = errorData.ErrorMessage || errorData.Error || 'Error!';
        if (errorData.SubErrorList) {
          for (let i = 0; i < errorData.SubErrorList.length; i++) {
            const subError = errorData.SubErrorList[i];
            if (subError.IsError) {
              msg += '<br> - ' + subError.ErrorMessage;
            }
          }
        }
      }
    }

    if (msg && this.isActiveNotify) {
      this.isActiveNotify = false;
      timeout = timeout || 1000;
      ons.notification.toast({ message: msg, timeout, animation: 'fall' });
      setTimeout(() => {
        this.isActiveNotify = true;
      }, MAX_NOTIFY_TIME_OUT);
    }
  }

  alert(title, message, funcOK = null) {
    const options = { title, message };
    if (funcOK) {
      ons.notification.confirm({
        message,
        title,
        cancelable: true,
        callback: i => {
          return i == '1' && funcOK();
        }
      });
    } else {
      ons.notification.alert(options);
    }
  }
}
