import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArbeitPost } from './ArbeitPost';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ArbeitService {
  private arbeitUrl = 'api/arbeit/';
  
  constructor( 
    private http: HttpClient,
    private router: Router) {}

  getArbeitPosts(): Promise<ArbeitPost[]> {
    return this.http.get<ArbeitPost[]>(this.arbeitUrl).toPromise();
  }


  
  getArbeitPostById(id: number): Promise<ArbeitPost> {
    const url = `${this.arbeitUrl}${id}`;
    return this.http.get<ArbeitPost>(url).toPromise();
  }
  
  //filterArbeitPost(): After calling getArbeitPosts(), filter the posts by arguments such as region, arbeit type and time zone.
  
  createArbeitPost(post: Partial<ArbeitPost>): Promise<ArbeitPost> {
    return this.http.post<ArbeitPost>(this.arbeitUrl, post, httpOptions)
      .toPromise();
  }
  
  updateArbeitPost(post: ArbeitPost): Promise<ArbeitPost> {
    const url = `${this.arbeitUrl}${post.id}`;
    return this.http.put(url, post, httpOptions)
      .toPromise()
      .then(() => post);
  }

  deleteArbeitPost(post: ArbeitPost | number) {
    const id = (typeof post === 'number') ? post : post.id;
    const url = `${this.arbeitUrl}${id}`;
    return this.http.delete<ArbeitPost>(url, httpOptions)
      .toPromise();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      alert("Backend error. Try again!");
      return Promise.resolve(result as T);
  };
}
}
