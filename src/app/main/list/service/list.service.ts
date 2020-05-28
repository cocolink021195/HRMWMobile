import { HrmApiService } from './../../../core/services/hrm-api/hrm-api.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ListService {


  constructor(
    private hrmApiService: HrmApiService

  ) { }

  getData(api = '') {
    return this.hrmApiService.testingPost();
  }


}
