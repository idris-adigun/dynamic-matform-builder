import { TestBed } from '@angular/core/testing';

import { DynamicMatFormsService } from './dynamic-mat-forms.service';

describe('DynamicMatFormsService', () => {
  let service: DynamicMatFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicMatFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
