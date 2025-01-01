import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootfallAnalyticsComponent } from './footfall-analytics.component';

describe('FootfallAnalyticsComponent', () => {
  let component: FootfallAnalyticsComponent;
  let fixture: ComponentFixture<FootfallAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FootfallAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootfallAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
