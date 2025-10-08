import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveIncidentsComponent } from './live-incidents.component';

describe('LiveIncidentsComponent', () => {
  let component: LiveIncidentsComponent;
  let fixture: ComponentFixture<LiveIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveIncidentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
