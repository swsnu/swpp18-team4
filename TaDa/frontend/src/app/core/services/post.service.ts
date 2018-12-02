import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';

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
    const url = `${this.postsUrl}/post/${post_id}`;
    return this.http.get<Post>(url, httpOptions)
      .toPromise().catch(this.handleError);
  }

  getPostsByAuthorId(author_id: number): Promise<Post[]> {
    const url = `${this.postsUrl}/author/${author_id}`;
    return this.http.get<Post[]>(url, httpOptions)
      .toPromise().catch(this.handleError);
  }

  createPost(post: Post): Promise<Post> {
    return this.http.post<Post>(this.postsUrl, httpOptions)
      .toPromise().then(() => post).catch(this.handleError);
  }

  updatePost(post: Post): Promise<Post> {
    const url = `${this.postsUrl}/${post.post_id}`;
    return this.http.put<Post>(url, httpOptions)
      .toPromise().then(() => post).catch(this.handleError);
  }

  deletePost(post: Post): Promise<Post> {
    const url = `${this.postsUrl}/${post.post_id}`;
    return this.http.delete<Post>(url, httpOptions)
      .toPromise().then(() => post).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred in PostService', error);
    return Promise.reject(error.message || 'Internal server error');
  }
}
