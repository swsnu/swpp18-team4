import { TestBed } from '@angular/core/testing';

import { TalkService } from './talk.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TalkService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: TalkService = TestBed.get(TalkService);
    expect(service).toBeTruthy();
  });
});
