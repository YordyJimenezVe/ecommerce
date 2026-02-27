import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminGeneralComponent } from './dashboard-admin-general.component';

describe('DashboardAdminGeneralComponent', () => {
  let component: DashboardAdminGeneralComponent;
  let fixture: ComponentFixture<DashboardAdminGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdminGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
