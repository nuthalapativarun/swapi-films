import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpeciesDetailsService } from './species-details.service';

describe('SpeciesDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [SpeciesDetailsService]
  }));

  it('should be created', () => {
    const service: SpeciesDetailsService = TestBed.get(SpeciesDetailsService);
    expect(service).toBeTruthy();
  });
});
