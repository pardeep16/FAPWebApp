import { TestBed, inject } from '@angular/core/testing';

import { DashboardfetchService } from './dashboardfetch.service';

describe('DashboardfetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardfetchService]
    });
  });

  it('should be created', inject([DashboardfetchService], (service: DashboardfetchService) => {
    expect(service).toBeTruthy();
  }));
});
