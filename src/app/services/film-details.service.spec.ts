import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FilmDetailsService } from './film-details.service';

describe('FilmDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [FilmDetailsService]
  }));

  it('should be created', () => {
    const service: FilmDetailsService = TestBed.get(FilmDetailsService);
    expect(service).toBeTruthy();
  });
});
