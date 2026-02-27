import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCompanyAdminComponent } from './dashboard-company-admin.component';

describe('DashboardCompanyAdminComponent', () => {
  let component: DashboardCompanyAdminComponent;
  let fixture: ComponentFixture<DashboardCompanyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCompanyAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
