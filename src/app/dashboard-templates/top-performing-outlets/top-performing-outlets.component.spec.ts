import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPerformingOutletsComponent } from './top-performing-outlets.component';

describe('TopPerformingOutletsComponent', () => {
  let component: TopPerformingOutletsComponent;
  let fixture: ComponentFixture<TopPerformingOutletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopPerformingOutletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPerformingOutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
