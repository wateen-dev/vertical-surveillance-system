import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistManagementComponent } from './receptionist-management.component';

describe('ReceptionistManagementComponent', () => {
  let component: ReceptionistManagementComponent;
  let fixture: ComponentFixture<ReceptionistManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceptionistManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
