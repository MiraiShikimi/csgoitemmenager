import { TestBed } from '@angular/core/testing';

import { UserInventoryValueServiceService } from './user-inventory-value-service.service';

describe('UserInventoryValueServiceService', () => {
  let service: UserInventoryValueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInventoryValueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
