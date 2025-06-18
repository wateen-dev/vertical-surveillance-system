import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveAlarmsComponent } from './active-alarms.component';



describe('StatisticsChartComponent', () => {
  let component: ActiveAlarmsComponent;
  let fixture: ComponentFixture<ActiveAlarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveAlarmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
