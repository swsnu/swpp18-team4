import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { region_enum_list, arbeit_type_enum_list, how_to_pay_enum_list } from '../../../core/models/enums/enum-list';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})


export class TagComponent implements OnInit {
  @Input('hasCloseButton') public hasCloseButton: boolean;
  @Input('isSelectable') public isSelectable: boolean;
  @Input('enumType') public type: number;
  @Input('enumBody') public body: number;

  @Output() public addTag = new EventEmitter<boolean>();
  @Output() public removeTag = new EventEmitter<boolean>();

  private tag_string: string;
  private tag_color: string;

  constructor() { }

  /* initiate color and body content of each tag */
  ngOnInit() {
    switch (this.type) {
      //Type-Enum
      case 2: this.tag_color = '#ff5050';
              this.tag_string = arbeit_type_enum_list[this.body];
              break;
      //Region-Enum
      case 3: this.tag_color = '#6666ff';
              this.tag_string = region_enum_list[this.body];
              break;
      //Pay-Enum
      case 4: this.tag_color = '#cc6699';
              this.tag_string = how_to_pay_enum_list[this.body];
              break;
    }
  }

  onClickSelect() {
    if (this.isSelectable) {
      this.addTag.emit(true);
    } else {
      this.removeTag.emit(true);
    }
  }

  onClickRemove() {
    this.removeTag.emit(true);
  }

}