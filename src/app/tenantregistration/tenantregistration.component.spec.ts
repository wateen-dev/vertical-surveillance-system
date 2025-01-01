import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantregistrationComponent } from './tenantregistration.component';

describe('TenantregistrationComponent', () => {
  let component: TenantregistrationComponent;
  let fixture: ComponentFixture<TenantregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenantregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
