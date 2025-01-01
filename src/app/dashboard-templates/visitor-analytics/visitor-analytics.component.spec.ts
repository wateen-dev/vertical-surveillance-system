import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAnalyticsComponent } from './visitor-analytics.component';

describe('VisitorAnalyticsComponent', () => {
  let component: VisitorAnalyticsComponent;
  let fixture: ComponentFixture<VisitorAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitorAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
