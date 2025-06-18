import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SopComplianceComponent  } from './sop-compliance.component';


describe('FootfallAnalyticsComponent', () => {
  let component: SopComplianceComponent;
  let fixture: ComponentFixture<SopComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SopComplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SopComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
