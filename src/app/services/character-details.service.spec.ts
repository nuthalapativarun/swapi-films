import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharacterDetailsService } from './character-details.service';

describe('CharacterDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [CharacterDetailsService]
  }));

  it('should be created', () => {
    const service: CharacterDetailsService = TestBed.get(CharacterDetailsService);
    expect(service).toBeTruthy();
  });
});
