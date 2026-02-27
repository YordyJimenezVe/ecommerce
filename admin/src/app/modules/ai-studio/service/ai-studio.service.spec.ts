import { TestBed } from '@angular/core/testing';

import { AiStudioService } from './ai-studio.service';

describe('AiStudioService', () => {
  let service: AiStudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiStudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
