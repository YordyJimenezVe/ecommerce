import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiTrainingComponent } from './ai-training.component';

describe('AiTrainingComponent', () => {
  let component: AiTrainingComponent;
  let fixture: ComponentFixture<AiTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
