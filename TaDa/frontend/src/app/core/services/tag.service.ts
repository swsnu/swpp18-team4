import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor() { }


    /* functions for handling tag from filter_list */ 

    addTag(arr, enumtype: number, enumindex: number): void {
      let ele = {
        type: enumtype,
        index: enumindex
      }
      arr.push(ele);
    }
  
    removeTag(arr, type: number, index: number): void {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].type === type && arr[i].index === index) {
            arr.splice(i, 1);
            break;
        }
      }
    }
  
    existInArray(arr, type: number, index: number): boolean {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].type === type && arr[i].index === index) {
            return true;
        }
      }
      return false;
    }
}
