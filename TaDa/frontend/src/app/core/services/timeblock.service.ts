import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TimeblockService {
  public col_index = ['새벽'];
  public row_index = ['일', '월', '화', '수', '목', '금', '토'];
  constructor() { 
    for (let i = 8; i < 22; i++) {
      this.col_index.push(`${i}-${i+1}시`);
    }

  }

  createCells() {
    let arr = [];
    for (let i = 0; i < this.row_index.length; i++) {
      let tmp =[];
      for (let j = 0; j < this.col_index.length; j++) {
        tmp.push(new DraggableCell(i, j, false));
      }
      arr.push(tmp);
    }
    return arr;
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
