import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { ArbeitPost } from '../ArbeitPost';
import { ArbeitService } from '../arbeit.service';
import { LoginUserService } from '../log-in-user.service';

import { ArbeitRegionEnum } from '../Enums/ArbeitRegionEnum';
import { ArbeitTypeEnum } from '../Enums/ArbeitTypeEnum';


@Component({
  selector: 'app-arbeit-post-detail',
  templateUrl: './arbeit-post-detail.component.html',
  styleUrls: ['./arbeit-post-detail.component.css']
})
export class ArbeitPostDetailComponent implements OnInit {

  user: User;
  post: ArbeitPost;

  ex_post: ArbeitPost = {
    id: 1,
    author_id: 1,
    title: 'Seolip TomNToms Arbeit GeupGu',
    content: 'I need arbeit. Somebody please call me',
    region: ArbeitRegionEnum.SNUStation,
    arbeit_type: ArbeitTypeEnum.IT,
    pay: 8000,
    time_zone: ['Mon 15:00-15:30', 'Tue 17:00-18:00'],
    manager_name: 'Chaehyun',
    manager_phone: '010-4818-4174',
    register_date: null,
    edit_date: null
  };

  constructor(
    private arbeitService: ArbeitService,
    private userService: LoginUserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //this.user = this.userService.getLogInUser();
    //const id = +this.route.snapshot.paramMap.get('id');
    //this.getPost(id);
    this.post = this.ex_post;
    }

  getPost(id: number) {
    this.arbeitService.getArbeitPostById(id)
      .then(post => this.post = post);
  }

  back() {
    this.router.navigateByUrl('/arbeit');
  }
  edit() {
    this.router.navigateByUrl(`/arbeit/${this.post.id}/edit`);

  }
  delete() {
    this.arbeitService.deleteArbeitPost(this.post);
    this.router.navigateByUrl('/arbeit');
  }
}
