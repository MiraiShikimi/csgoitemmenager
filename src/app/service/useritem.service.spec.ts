import { TestBed } from '@angular/core/testing';

import { UseritemService } from './useritem.service';

describe('UseritemService', () => {
  let service: UseritemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseritemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
