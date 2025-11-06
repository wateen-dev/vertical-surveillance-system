import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPerfomanceComponent } from './staff-perfomance.component';

describe('StaffPerfomanceComponent', () => {
  let component: StaffPerfomanceComponent;
  let fixture: ComponentFixture<StaffPerfomanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffPerfomanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffPerfomanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
