import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakesbakesComponent } from './cakesbakes.component';

describe('CakesbakesComponent', () => {
  let component: CakesbakesComponent;
  let fixture: ComponentFixture<CakesbakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CakesbakesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CakesbakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
