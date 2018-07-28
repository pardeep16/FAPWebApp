import { TestBed, inject } from '@angular/core/testing';

import { FeedbackQuestionsService } from './feedback-questions.service';

describe('FeedbackQuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackQuestionsService]
    });
  });

  it('should be created', inject([FeedbackQuestionsService], (service: FeedbackQuestionsService) => {
    expect(service).toBeTruthy();
  }));
});
