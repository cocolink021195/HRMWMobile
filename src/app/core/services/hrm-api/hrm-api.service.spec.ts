/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrmApiService } from './hrm-api.service';

describe('Service: HrmApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrmApiService]
    });
  });

  it('should ...', inject([HrmApiService], (service: HrmApiService) => {
    expect(service).toBeTruthy();
  }));
});
