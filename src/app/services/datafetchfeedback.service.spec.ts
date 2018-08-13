import { TestBed, inject } from '@angular/core/testing';

import { DatafetchfeedbackService } from './datafetchfeedback.service';

describe('DatafetchfeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatafetchfeedbackService]
    });
  });

  it('should be created', inject([DatafetchfeedbackService], (service: DatafetchfeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
