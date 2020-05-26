/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingService } from './setting.service';

describe('Service: Notify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingService]
    });
  });

  it('should ...', inject([SettingService], (service: SettingService) => {
    expect(service).toBeTruthy();
  }));
});
