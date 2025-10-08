import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeViolationComponent } from './real-time-violation.component';

describe('RealTimeViolationComponent', () => {
  let component: RealTimeViolationComponent;
  let fixture: ComponentFixture<RealTimeViolationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealTimeViolationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealTimeViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
