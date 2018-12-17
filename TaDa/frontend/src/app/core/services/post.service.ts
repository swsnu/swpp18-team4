import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { region_enum_list, arbeit_type_enum_list, how_to_pay_enum_list } from '../models/enums/enum-list';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = '/api/post/';

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Promise<Post[]> {
    return this.http.get<Post[]>(this.postsUrl, httpOptions)
      .toPromise().catch(this.handleError);
  }

  getPostByPostId(post_id: number): Promise<Post> {
    const url = `${this.postsUrl}${post_id}/`;
    return this.http.get<Post>(url, httpOptions)
      .toPromise()
      .catch(this.handleError);
  }

  getPostsByAuthorId(author_id: number): Promise<Post[]> {
    const url = `${this.postsUrl}author/${author_id}/`;
    return this.http.get<Post[]>(url, httpOptions)
      .toPromise().catch(this.handleError);
  }

  createPost(post: Post): Promise<Post> {
    return this.http.post<Post>(this.postsUrl, post, httpOptions)
      .toPromise().then(() => post).catch(this.handleError);
  }

  updatePost(post: Post): Promise<Post> {
    const url = `${this.postsUrl}${post.id}/`;
    return this.http.put<Post>(url, post, httpOptions)
      .toPromise().then(() => post).catch(this.handleError);
  }

  deletePost(post: Post): Promise<Post> {
    const url = `${this.postsUrl}${post.id}/`;
    return this.http.delete<Post>(url, httpOptions)
      .toPromise().then(() => post).catch(this.handleError);
  }

  getAlarmPosts(): Promise<Post[]> {
  return this.http.get<Post[]>(`${this.postsUrl}alarm/`, httpOptions)
    .toPromise()
    .catch(this.handleError);
  }

  makePostTags(post: Post) {
    let tag_arr = [];
    if (post.arbeit_type != null) {
      tag_arr.push({
        type: 2,
        index: arbeit_type_enum_list.indexOf(post.arbeit_type)
      });
      
    }
    if (post.region != null) {
      tag_arr.push({
        type: 3,
        index: region_enum_list.indexOf(post.region)
      });
    }
    if (post.how_to_pay != null) {
      tag_arr.push({
        type: 4,
        index: how_to_pay_enum_list.indexOf(post.how_to_pay)
      });
    }
    return tag_arr;
  }


  private handleError(error: any): Promise<any> {
    console.log('An error occurred in PostService', error);
    return Promise.reject(error.message || 'Internal server error');
  }
}
