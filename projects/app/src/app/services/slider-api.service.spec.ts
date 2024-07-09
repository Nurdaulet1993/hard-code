import { TestBed } from '@angular/core/testing';

import { SliderApiService } from './slider-api.service';

describe('SliderApiService', () => {
  let service: SliderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
