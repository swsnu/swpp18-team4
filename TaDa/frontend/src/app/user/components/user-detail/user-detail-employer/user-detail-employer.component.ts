import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-detail-employer',
  templateUrl: './user-detail-employer.component.html',
  styleUrls: ['./user-detail-employer.component.css']
})
export class UserDetailEmployerComponent implements OnInit {
  @Input('isMyPage') public isMyPage: boolean;
  @Input('user') public user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
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
      error => this.toastrService.warning('실패했습니다')
    );
    this.close();
    this.toastrService.success('성공!');
  }

  sendMessage() {
    console.log('send Message!');
  }

}
