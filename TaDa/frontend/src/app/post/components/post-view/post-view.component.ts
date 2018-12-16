import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../../core/models/post';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  current_post: Post;
  current_user: User;
  constructor(
    private post_service: PostService,
    private user_service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.post_service.getPostByPostId(id)
      .then( post => this.current_post = post)
      .catch( () => this.router.navigateByUrl('/post/list'));
    this.current_user = this.user_service.getCurrentUser();
  }

  back(): void {
    this.router.navigateByUrl(`/post/list/`);
  }
  edit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigateByUrl(`/post/edit/${id}`);
  }
}
