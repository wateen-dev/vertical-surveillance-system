import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceFormsComponent } from './interface-forms.component';

describe('InterfaceFormsComponent', () => {
  let component: InterfaceFormsComponent;
  let fixture: ComponentFixture<InterfaceFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterfaceFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfaceFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
