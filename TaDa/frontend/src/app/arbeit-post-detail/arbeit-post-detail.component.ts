import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { ArbeitPost } from '../ArbeitPost';
import { ArbeitService } from '../arbeit.service';
import { LoginUserService } from '../log-in-user.service';
import { getPreviousOrParentNode } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-arbeit-post-detail',
  templateUrl: './arbeit-post-detail.component.html',
  styleUrls: ['./arbeit-post-detail.component.css']
})
export class ArbeitPostDetailComponent implements OnInit {

  user: User;
  post: ArbeitPost;

  constructor(
    private arbeitService: ArbeitService,
    private userService: LoginUserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.user = this.userService.getLogInUser();
    let id = +this.route.snapshot.paramMap.get('id');
    this.getPost(id);
    }

  getPost(id:number) {
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