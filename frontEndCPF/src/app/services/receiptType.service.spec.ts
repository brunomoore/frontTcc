import { TestBed } from '@angular/core/testing';

import { ReceiptTypeService } from './receiptType.service';

describe('ReceiptTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceiptTypeService = TestBed.get(ReceiptTypeService);
    expect(service).toBeTruthy();
  });
});
