import { TestBed } from '@angular/core/testing';

import { CsgoitemService } from './csgoitem.service';

describe('CsgoitemService', () => {
  let service: CsgoitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsgoitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
