import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeregistrationComponent } from './employeeregistration.component';

describe('EmployeeregistrationComponent', () => {
  let component: EmployeeregistrationComponent;
  let fixture: ComponentFixture<EmployeeregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
