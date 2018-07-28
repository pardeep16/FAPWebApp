import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDateComponent } from './feedback-date.component';

describe('FeedbackDateComponent', () => {
  let component: FeedbackDateComponent;
  let fixture: ComponentFixture<FeedbackDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
