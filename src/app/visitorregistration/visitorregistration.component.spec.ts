import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorregistrationComponent } from './visitorregistration.component';

describe('VisitorregistrationComponent', () => {
  let component: VisitorregistrationComponent;
  let fixture: ComponentFixture<VisitorregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitorregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
