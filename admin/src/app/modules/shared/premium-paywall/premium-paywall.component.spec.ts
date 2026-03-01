import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumPaywallComponent } from './premium-paywall.component';

describe('PremiumPaywallComponent', () => {
  let component: PremiumPaywallComponent;
  let fixture: ComponentFixture<PremiumPaywallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumPaywallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumPaywallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
