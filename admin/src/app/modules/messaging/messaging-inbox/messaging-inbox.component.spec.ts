import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingInboxComponent } from './messaging-inbox.component';

describe('MessagingInboxComponent', () => {
  let component: MessagingInboxComponent;
  let fixture: ComponentFixture<MessagingInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagingInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
