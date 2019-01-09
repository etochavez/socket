import { TestBed } from '@angular/core/testing';

import { UserGardService } from './user-gard.service';

describe('UserGardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGardService = TestBed.get(UserGardService);
    expect(service).toBeTruthy();
  });
});
