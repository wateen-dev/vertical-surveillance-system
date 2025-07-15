import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformViolationsComponent } from './uniform-violations.component';

describe('UniformViolationsComponent', () => {
  let component: UniformViolationsComponent;
  let fixture: ComponentFixture<UniformViolationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UniformViolationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniformViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
