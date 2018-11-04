import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user'
import { ArbeitPost } from '../ArbeitPost';

@Component({
  selector: 'app-arbeit-post-detail',
  templateUrl: './arbeit-post-detail.component.html',
  styleUrls: ['./arbeit-post-detail.component.css']
})
export class ArbeitPostDetailComponent implements OnInit {

  const user: User
  const post: ArbeitPost

  constructor(
    private arbeitPostService: ArbeitPostService,
    private loginserService: CommentService,
    private route: ActivatedRoute,
    private router: Router) { }
  ) { }

  ngOnInit() {
    this.user = this.userService.getLoginUser();
    let id = +this.route.snapshot.paramMap.get('id');
    this.arbeitPostService.getArbeitPostById(id).then(success => {
    });
  }

  arbeitPostEdit() {
    this.router.navigateByUrl(`/articles/${this.post.id}/edit`);

  }
  arbeitPostDelete() {
    this.articleService.deleteArticle(this.post);
    this.router.navigateByUrl('/arbeit');
  }
}
