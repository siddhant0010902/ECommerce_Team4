import { TestBed } from '@angular/core/testing';

import { Salesservice } from './salesservice';

describe('Salesservice', () => {
  let service: Salesservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Salesservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
