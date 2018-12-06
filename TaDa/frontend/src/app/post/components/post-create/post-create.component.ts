import { Component, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
  })
  export class PostCreateComponent implements OnInit {
  new_post: Post;
  title: string;

  constructor() { }

  ngOnInit() {
    this.new_post = new Post();
  }

}
