import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantGridComponent } from './tenant-grid.component';

describe('TenantGridComponent', () => {
  let component: TenantGridComponent;
  let fixture: ComponentFixture<TenantGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenantGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
