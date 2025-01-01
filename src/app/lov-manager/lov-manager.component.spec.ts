import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovManagerComponent } from './lov-manager.component';

describe('LovManagerComponent', () => {
  let component: LovManagerComponent;
  let fixture: ComponentFixture<LovManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LovManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
