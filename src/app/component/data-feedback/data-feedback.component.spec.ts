import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFeedbackComponent } from './data-feedback.component';

describe('DataFeedbackComponent', () => {
  let component: DataFeedbackComponent;
  let fixture: ComponentFixture<DataFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
