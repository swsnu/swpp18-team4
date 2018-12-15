import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArbeitTypeEnum } from '../../../core/models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from '../../../core/models/enums/how-to-pay-enum.enum';
import { RegionEnum } from '../../../core/models/enums/region-enum.enum';
import { region_enum_list, arbeit_type_enum_list, how_to_pay_enum_list } from '../../../core/models/enums/enum-list';
//import { Tag } from '../../../core/models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})


export class TagComponent implements OnInit {
  //@Input('hasCloseButton') public hasCloseButton: boolean;
  //@Input('isSelectable') public isSelectable: boolean;
  //@Input('enumType') public type: number;
  //@Input('enumBody') public body: number;

  @Output() public isSelected = new EventEmitter();
  @Output() public isRemoved = new EventEmitter();

  private enum_string: string;

  constructor() { }

  ngOnInit() {
    this.enum_string = "이넘 예시"
  }


  test() {
    console.log('closed');
  }

}