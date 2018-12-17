import { Post } from "./post";

export class schResult {
  constructor(start_time, end_time, post) {
    this.start_time = start_time;
    this.end_time = end_time;
    this.post = post;
  }
  start_time: Date;
  end_time: Date;
  post: Post;
}