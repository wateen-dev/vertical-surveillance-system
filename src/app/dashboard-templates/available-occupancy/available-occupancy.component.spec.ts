import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableOccupancyComponent } from './available-occupancy.component';

describe('AvailableOccupancyComponent', () => {
  let component: AvailableOccupancyComponent;
  let fixture: ComponentFixture<AvailableOccupancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableOccupancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableOccupancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
