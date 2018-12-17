import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { RegionEnum } from 'src/app/core/models/enums/region-enum.enum';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail-employee',
  templateUrl: './user-detail-employee.component.html',
  styleUrls: ['./user-detail-employee.component.css']
})
export class UserDetailEmployeeComponent implements OnInit {
  @Input('isMyPage') public isMyPage: boolean;
  @Input('user') public user: User;
  pw="";
  pw_confirm="";
  tag_list = []; // user preference tag list

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.user.employee_region = [];
    this.user.employee_how_to_pay=[];
    this.user.employee_type =null;
    this.user.employee_region.push(RegionEnum.seoulip);
    this.user.employee_region.push(RegionEnum.home);
    this.user.employee_how_to_pay.push(HowToPayEnum.pay_hourly);
    this. tag_list = this.userService.getUserTagInfo(this.user);
  }
  

  edit(triger) {
    this.modalService.open(triger);
  }

  close() {
    this.pw = "";
    this.pw_confirm = "";
    this.modalService.dismissAll();
  }

  confirm(ifdirty: boolean) {
    let ifvalid = this.userService.validatePassword(this.pw) && this.pw === this.pw_confirm;
    if (ifdirty) {
      if (ifvalid) {
        this.user.password = this.pw;
      } else {
        this.toastrService.warning('비밀번호를 다시 확인해주세요');
        return;
      }
    }

    this.userService.updateUser(this.user).then(
      user => this.user = user,
      error => alert('실패했습니다')
    );
    this.close();
    console.log(this.user.password);
    alert('성공!');
  }

  sendMessage() {
    console.log('send Message!');
  }
  


}
