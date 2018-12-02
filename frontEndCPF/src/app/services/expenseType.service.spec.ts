import { TestBed } from '@angular/core/testing';

import { ExpenseTypeService } from './expenseType.service';

describe('ExpenseTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseTypeService = TestBed.get(ExpenseTypeService);
    expect(service).toBeTruthy();
  });
});
