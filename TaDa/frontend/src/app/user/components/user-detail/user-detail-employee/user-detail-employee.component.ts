import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { TagService } from 'src/app/core/services/tag.service';
import { region_enum_list, arbeit_type_enum_list, how_to_pay_enum_list } from 'src/app/core/models/enums/enum-list';
import { ArbeitTypeEnum } from 'src/app/core/models/enums/arbeit-type-enum.enum';
import { RegionEnum } from 'src/app/core/models/enums/region-enum.enum';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TalkService } from 'src/app/core/services/talk.service';
import * as Talk from 'talkjs';

@Component({
  selector: 'app-user-detail-employee',
  templateUrl: './user-detail-employee.component.html',
  styleUrls: ['./user-detail-employee.component.css']
})
export class UserDetailEmployeeComponent implements OnInit {
  @Input('isMyPage') public isMyPage: boolean;
  @Input('user') public user: User;
  tag_list = []; // user preference tag list
  
  /* for tag selecting */
  filter_button = 0;
  region_enum_list: string[];
  arbeit_type_enum_list: string[];
  how_to_pay_enum_list: string[];
  private chatPopup: Talk.Popup;

  constructor(
    private router: Router,
    private userService: UserService,
    private tagService: TagService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private talkService: TalkService
  ) { }

  ngOnInit() {
    this.region_enum_list = region_enum_list;
    this.arbeit_type_enum_list = arbeit_type_enum_list;
    this.how_to_pay_enum_list = how_to_pay_enum_list;
    this.tag_list = this.userService.getUserTagInfo(this.user);
    this.preloadChatPopup(this.user);
  }
  

  edit(triger) {
    this.modalService.open(triger);
  }

  close() {
    this.modalService.dismissAll();
  }

  confirm() {
    /* and then process preference tags*/
    let employee_type = [];
    let employee_region = [];
    let employee_how_to_pay = [];
    for (const tag of this.tag_list) {
      if (tag.type == 2) {
        employee_type.push(<ArbeitTypeEnum>arbeit_type_enum_list[tag.index]);
      } else if (tag.type == 3) {
        employee_region.push(<RegionEnum>region_enum_list[tag.index]);
      } else {
        employee_how_to_pay.push(<HowToPayEnum>how_to_pay_enum_list[tag.index]);
      }
    }
    this.user.employee_type = employee_type;
    this.user.employee_region = employee_region;
    this.user.employee_how_to_pay = employee_how_to_pay;
    
    this.userService.updateUser(this.user).then(
      user => this.user = user,
      error => this.toastrService.warning('실패했습니다')
    );
    this.close();
    this.toastrService.success('성공!');
  }

  sendMessage() {
    this.chatPopup.show();
  }


  addTag(enumtype: number, enumindex: number): void {
    if (this.tag_list.length >= 5) {
      this.toastrService.warning('선호 태그는 5개까지 입력 가능합니다!');
      return;
    }
    this.tagService.addTag(this.tag_list, enumtype, enumindex);
  }

  removeTag(enumtype: number, enumindex: number) {
    this.tagService.removeTag(this.tag_list, enumtype, enumindex);
  }

  existInArray(enumtype: number, enumindex: number) {
    return this.tagService.existInArray(this.tag_list, enumtype, enumindex);
  }

  clearTag() {
    this.tag_list = [];
  }
  
  private async preloadChatPopup(vendor: User) {
    this.chatPopup = await this.talkService.createPopup(vendor, false);
    this.chatPopup.mount({ show: false });
  }

}
