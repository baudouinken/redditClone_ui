import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { AuthService } from '../auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    public authService: AuthService) { }

  getAllPosts(): Observable<any[]> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.get<any[]>('http://localhost:8080/api/posts', { headers: headersss });
  }

  createPost(postModel: any): Observable<any> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.post<any>('http://localhost:8080/api/posts',
    postModel, { headers: headersss });
  }

  getPost(id: number): Observable<any> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.get<any>(`http://localhost:8080/api/posts/${id}`, { headers: headersss });
  }

  getAllPostsByUser(name: string): Observable<any[]>{
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.get<any[]>(`http://localhost:8080/api/posts/user/${name}`, { headers: headersss });
  }
}
