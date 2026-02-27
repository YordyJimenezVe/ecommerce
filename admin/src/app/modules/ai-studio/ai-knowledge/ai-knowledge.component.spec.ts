import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiKnowledgeComponent } from './ai-knowledge.component';

describe('AiKnowledgeComponent', () => {
  let component: AiKnowledgeComponent;
  let fixture: ComponentFixture<AiKnowledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiKnowledgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
