import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';

@Injectable()
export class SettingService {

  constructor(
  ) { }

  isNullOrEmpty(data: any) {
    if (typeof data === 'object') {
      return JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]' ? true : false;
    } else if (typeof data === 'string') {
      return !data.trim() ? true : false;
    } else if (typeof data === 'undefined') {
      return true;
    } else if (typeof data === 'number') {
      return false;
    } else if (typeof data === 'boolean') {
      return data;
    } else {
      return false;
    }
  }





}
