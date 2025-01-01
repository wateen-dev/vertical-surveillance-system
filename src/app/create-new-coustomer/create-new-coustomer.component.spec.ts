import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCoustomerComponent } from './create-new-coustomer.component';

describe('CreateNewCoustomerComponent', () => {
  let component: CreateNewCoustomerComponent;
  let fixture: ComponentFixture<CreateNewCoustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewCoustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewCoustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
