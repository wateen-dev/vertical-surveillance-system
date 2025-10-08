import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViolationsComponent } from './app-violations.component';

describe('AppViolationsComponent', () => {
  let component: AppViolationsComponent;
  let fixture: ComponentFixture<AppViolationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppViolationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
