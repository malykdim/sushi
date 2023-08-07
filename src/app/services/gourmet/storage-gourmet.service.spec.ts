import { TestBed } from '@angular/core/testing';

import { StorageGourmetService } from './storage-gourmet.service';

describe('StorageGourmetService', () => {
  let service: StorageGourmetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageGourmetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
