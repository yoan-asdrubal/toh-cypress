import { TestBed } from '@angular/core/testing';

import { MenuOptionService } from './menu-option.service';

describe('MenuOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuOptionService = TestBed.get(MenuOptionService);
    expect(service).toBeTruthy();
  });
});
