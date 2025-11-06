import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorHeatmapComponent } from './floor-heatmap.component';

describe('FloorHeatmapComponent', () => {
  let component: FloorHeatmapComponent;
  let fixture: ComponentFixture<FloorHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FloorHeatmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloorHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
