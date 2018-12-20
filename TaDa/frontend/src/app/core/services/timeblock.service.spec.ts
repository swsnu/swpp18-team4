import { TestBed } from '@angular/core/testing';

import { TimeblockService } from './timeblock.service';

describe('TimeblockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeblockService = TestBed.get(TimeblockService);
    expect(service).toBeTruthy();
    expect(service.col_index.length).toEqual(17);
  });

  it('test createCells', async() => {
    const service: TimeblockService = TestBed.get(TimeblockService);
    let arr = service.createCells();
    await expect(arr.length).toEqual(service.row_index.length);
    await expect(arr[2][5].selected).toEqual(false);
  });

  it('test convertCellstoDate', async() => {
    const service: TimeblockService = TestBed.get(TimeblockService);
    let arr = service.createCells();
    arr[2][5].selected = true;
    arr[2][6].selected = true;
    arr[6][6].selected = true;
    service.convertCellstoDate(arr);
    await expect(service.convertCellstoDate(arr).length).toEqual(7);
  });

});
