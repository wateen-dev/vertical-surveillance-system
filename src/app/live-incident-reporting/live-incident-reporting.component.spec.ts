import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveIncidentReportingComponent } from './live-incident-reporting.component';

describe('LiveIncidentReportingComponent', () => {
  let component: LiveIncidentReportingComponent;
  let fixture: ComponentFixture<LiveIncidentReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveIncidentReportingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveIncidentReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
