import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private commentsUrl = '/api/comment/';

  constructor(
    private http: HttpClient
  ) { }

  getWriteCommentsByPostId(post_id: number): Promise<Comment[]> {
    const url = `${this.commentsUrl}post/${post_id}/`;
    return this.http.get<Comment>(url, httpOptions)
      .toPromise().catch(this.handleError);
  }

  getReceiveCommentsByUserId(user_id: number): Promise<Comment[]> {
    const url = `${this.commentsUrl}receive/${user_id}/`;
    return this.http.get<Comment>(url, httpOptions)
      .toPromise().catch(this.handleError);
  }

  getWriteCommentsByUserId(user_id: number): Promise<Comment[]> {
    const url = `${this.commentsUrl}author/${user_id}/`;
    return this.http.get<Comment>(url, httpOptions)
      .toPromise().catch(this.handleError);
  }

  getComment(comment_id: number): Promise<Comment> {
    const url = `${this.commentsUrl}${comment_id}/`;
    return this.http.get<Comment>(url, httpOptions)
      .toPromise().catch(this.handleError);
  }

  getReferComments(comment_id: number): Promise<Comment[]> {
    const url = `${this.commentsUrl}refer/${comment_id}/`;
    return this.http.get<Comment>(url, httpOptions)
      .toPromise().catch(this.handleError);
  }

  createComment(comment: Comment): Promise<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment, httpOptions)
      .toPromise().then(() => comment).catch(this.handleError);
  }

  updateComment(comment: Comment): Promise<Comment> {
    const url = `${this.commentsUrl}${comment.id}/`;
    return this.http.put<Comment>(url, comment, httpOptions)
      .toPromise().then(() => comment).catch(this.handleError);
  }

  deleteComment(comment: Comment): Promise<Comment> {
    const url = `${this.commentsUrl}${comment.id}/`;
    return this.http.delete<Comment>(url, httpOptions)
      .toPromise().then(() => comment).catch(this.handleError);
  }

  /* just generate iterator for ngFor in showing stars*/
  iter (n: number) {
    let arr = [];
    if (n % 1 == 0.5) n -= 0.5;
    for(let i =0; i < n; i++) {
      arr.push(i);
    }
    return arr;
  }
  iter_vacant (n: number) {
    const arr = [];
    if (n % 1 === 0.5) {
      n += 0.5;
    }
    for (let i = 0; i < 5 - n; i++) {
      arr.push(i);
    }
    return arr;
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occurred in CommentService', error);
    return Promise.reject(error.message || 'Internal server error');
  }
}
