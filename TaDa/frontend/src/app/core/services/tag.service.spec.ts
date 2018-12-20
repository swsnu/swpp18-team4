import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';

describe('TagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagService = TestBed.get(TagService);
    expect(service).toBeTruthy();
  });

  
  it('test addTag', async() => {
    const service: TagService = TestBed.get(TagService);
    let arr = [
      {type: 2, index: 2},
      {type: 2, index: 3},
      {type: 4, index: 0},
    ]
    service.addTag(arr, 3, 1);
    await expect(arr.length).toEqual(4);

    service.removeTag(arr, 2, 3);
    await expect(arr.length).toEqual(3);

    await expect(service.existInArray(arr, 2, 2)).toEqual(true);

  });

/*
  it('test confirm - when change tag', () => {
    component.tag_list = 
    component.confirm();
    expect(userServiceSpy.updateUser.calls.count()).toEqual(1);
    expect(toastrServiceSpy.success.calls.count()).toEqual(1);
  });*/



});
