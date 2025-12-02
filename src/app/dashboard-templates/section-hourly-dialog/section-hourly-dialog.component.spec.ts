import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHourlyDialogComponent } from './section-hourly-dialog.component';

describe('SectionHourlyDialogComponent', () => {
  let component: SectionHourlyDialogComponent;
  let fixture: ComponentFixture<SectionHourlyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionHourlyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionHourlyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
