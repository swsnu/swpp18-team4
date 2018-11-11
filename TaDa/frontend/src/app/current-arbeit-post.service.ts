import { Injectable } from '@angular/core';
import {ArbeitPost} from "./ArbeitPost";

@Injectable({
  providedIn: 'root'
})
export class CurrentArbeitPostService {
  current_arbeit_post: ArbeitPost;
  constructor() { }

  set(post: ArbeitPost) {
    this.current_arbeit_post = post;
  }
  get(){
    return this.current_arbeit_post;
  }
}
