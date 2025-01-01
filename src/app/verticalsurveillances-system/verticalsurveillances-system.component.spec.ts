import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalsurveillancesSystemComponent } from './verticalsurveillances-system.component';

describe('VerticalsurveillancesSystemComponent', () => {
  let component: VerticalsurveillancesSystemComponent;
  let fixture: ComponentFixture<VerticalsurveillancesSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalsurveillancesSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalsurveillancesSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
