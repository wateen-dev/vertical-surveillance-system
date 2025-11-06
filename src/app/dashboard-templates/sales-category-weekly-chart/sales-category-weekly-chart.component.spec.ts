import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCategoryWeeklyChartComponent } from './sales-category-weekly-chart.component';

describe('SalesCategoryWeeklyChartComponent', () => {
  let component: SalesCategoryWeeklyChartComponent;
  let fixture: ComponentFixture<SalesCategoryWeeklyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesCategoryWeeklyChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesCategoryWeeklyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
