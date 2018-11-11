import { Component, OnInit } from '@angular/core';
import {ArbeitPost} from "../ArbeitPost";
import {CurrentArbeitPostService} from "../current-arbeit-post.service";

@Component({
  selector: 'app-arbeit-post-preview',
  templateUrl: './arbeit-post-preview.component.html',
  styleUrls: ['./arbeit-post-preview.component.css']
})
export class ArbeitPostPreviewComponent implements OnInit {

  preview_post: ArbeitPost;

  constructor(
    private currentArbeitPostService: CurrentArbeitPostService,
  ) { }

  ngOnInit() {
    this.preview_post = this.currentArbeitPostService.get();
  }

}
