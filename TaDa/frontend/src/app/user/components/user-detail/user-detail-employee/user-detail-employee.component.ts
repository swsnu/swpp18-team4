import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { RegionEnum } from 'src/app/core/models/enums/region-enum.enum';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-detail-employee',
  templateUrl: './user-detail-employee.component.html',
  styleUrls: ['./user-detail-employee.component.css']
})
export class UserDetailEmployeeComponent implements OnInit {
  @Input('isMyPage') public isMyPage: boolean;
  @Input('user') public user: User;
  pw_confirm;
  tag_list = []; // user preference tag list

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.user.employee_region = [];
    this.user.employee_how_to_pay=[];
    this.user.employee_type =null;
    this.user.employee_region.push(RegionEnum.seoulip);
    this.user.employee_region.push(RegionEnum.home);
    this.user.employee_how_to_pay.push(HowToPayEnum.pay_hourly);
    this. tag_list = this.userService.getUserTagInfo(this.user);
    this.pw_confirm = this.user.password; 
  }
  

  edit(triger) {
    this.modalService.open(triger);
  }

  close() {
    this.modalService.dismissAll();
  }

  confirm() {
    this.userService.updateUser(this.user).then(
      user => this.user = user,
      error => alert('실패했습니당')
    );
  }

  sendMessage() {
    console.log('send Message!');
  }
  


}
