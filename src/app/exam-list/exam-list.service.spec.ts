import { TestBed, inject } from '@angular/core/testing';

import { ExamListService } from './exam-list.service';

describe('ExamListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamListService]
    });
  });

  it('should be created', inject([ExamListService], (service: ExamListService) => {
    expect(service).toBeTruthy();
  }));
});
