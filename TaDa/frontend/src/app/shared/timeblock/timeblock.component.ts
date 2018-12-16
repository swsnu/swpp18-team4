import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SelectContainerComponent } from 'ngx-drag-to-select';

@Component({
  selector: 'app-timeblock',
  templateUrl: './timeblock.component.html',
  styleUrls: ['./timeblock.component.css']
})
export class TimeblockComponent implements OnInit {

  //@Input('isSelectable') isSelectable: boolean;
  @Input('givenDate') input_arr = null;
  //@Output() output_dates = new EventEmitter<[]>();
  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;

  col_index = ['22시-8시'];
  row_index = ['일', '월', '화', '수', '목', '금', '토'];
  rawItems = [];
  selectedItems = [];  
  constructor() { }

  ngOnInit() {
    for (let i = 8; i < 22; i++) {
      this.col_index.push(`${i}시-${i+1}시`);
    }

    /* If input_arr is not given, initialize */
    if (this.input_arr == null) {
      for (let i = 0; i < this.row_index.length; i++) {
        let tmp =[];
        for (let j = 0; j < this.col_index.length; j++) {
          tmp.push({
            x: i,
            y: j,
            ifSelected: false
          });
        }
        this.rawItems.push(tmp);
      }
    } else {
      //this.selectContainer.selectItems(item => item.ifSelected === true)
    } 
  }
}
