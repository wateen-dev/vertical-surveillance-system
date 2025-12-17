import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorOutletsComponent } from './competitor-outlets.component';

describe('CompetitorOutletsComponent', () => {
  let component: CompetitorOutletsComponent;
  let fixture: ComponentFixture<CompetitorOutletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitorOutletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorOutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
