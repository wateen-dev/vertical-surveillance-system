import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfficiencyOvertimeComponent } from './efficiency-overtime.component';

describe('FootfallAnalyticsComponent', () => {
  let component: EfficiencyOvertimeComponent;
  let fixture: ComponentFixture<EfficiencyOvertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EfficiencyOvertimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfficiencyOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
