import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { SelectContainerComponent } from 'ngx-drag-to-select';
import { DraggableCell } from '../../core/services/timeblock.service';

@Component({
  selector: 'app-timeblock',
  templateUrl: './timeblock.component.html',
  styleUrls: ['./timeblock.component.css']
})
export class TimeblockComponent implements OnInit, AfterViewInit {

  @Input('isSelectable') isSelectable: boolean;
  @Input('givenDate') inputItems: DraggableCell[];

  @Output() output = new EventEmitter<DraggableCell[]>();
  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;

  rawItems =[];
  selectedItems = [];  

  constructor(
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.selectContainer.selectItems((item: DraggableCell) => item.selected === true);
  }

}