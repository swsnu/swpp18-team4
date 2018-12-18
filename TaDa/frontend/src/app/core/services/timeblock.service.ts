import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TimeblockService {
  public col_index = ['새벽'];
  public row_index = ['일', '월', '화', '수', '목', '금', '토'];
  public timeblock_index = [0, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  constructor() { 
    for (let i = 8; i < 24; i++) {
      this.col_index.push(`${i}-${i+1}시`);
    }

  }

  createCells() {
    let arr = [];
    for (let i = 0; i < this.row_index.length; i++) {
      let tmp = [];
      for (let j = 0; j < this.col_index.length; j++) {
        tmp.push(new DraggableCell(i, j, false));
      }
      arr.push(tmp);
    }
    return arr;
  }

  convertCellstoDate(cells: DraggableCell[][]) {
    let new_arr = [];

    for (const arr of cells) {
      let start = -1, end = 1;
      let tmp = [];

      for (const cell of arr) {
        if (cell.selected == true && start < 0) {
          start = cell.y;
          end = -1;
        } else if (cell.selected == false && end < 0) {
          end = cell.y;
          tmp.push({start: this.timeblock_index[start], end: this.timeblock_index[end]});
          start = -1; end = 1;
        }
      }
      if (end < 0) {
        tmp.push({start: this.timeblock_index[start], end: this.timeblock_index[this.timeblock_index.length-1]})
      }
      new_arr.push(tmp);
    }
    return new_arr;
  }


}

export class DraggableCell {
  x: number;
  y: number;
  selected: boolean;

  constructor(i: number, j: number, k:boolean) {
    this.x = i;
    this.y = j;
    this.selected = k;
  }
}
