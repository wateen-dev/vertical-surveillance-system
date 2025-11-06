import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveFootfallChartComponent } from './live-footfall-chart.component';

describe('LiveFootfallChartComponent', () => {
  let component: LiveFootfallChartComponent;
  let fixture: ComponentFixture<LiveFootfallChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveFootfallChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveFootfallChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
