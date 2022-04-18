import { TestBed } from '@angular/core/testing';

import { LoadingDialogService } from './loading-dialog.service';

describe('LoadingDialogService', () => {
  let service: LoadingDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
