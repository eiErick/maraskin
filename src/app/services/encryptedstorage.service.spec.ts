import { TestBed } from '@angular/core/testing';

import { EncryptedstorageService } from './encryptedstorage.service';

describe('EncryptedstorageService', () => {
  let service: EncryptedstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptedstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
