import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../models/create-post.payload';
import { AuthService } from './auth.service';

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
    return this.http.get<any[]>('https://reddit-app-ken.herokuapp.com/api/posts', { headers: headersss });
  }

  createPost(postModel: any): Observable<any> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.post<any>('https://reddit-app-ken.herokuapp.com/api/posts',
    postModel, { headers: headersss });
  }

  getPost(id: number): Observable<any> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.get<any>(`https://reddit-app-ken.herokuapp.com/api/posts/${id}`, { headers: headersss });
  }

  getAllPostsByUser(name: string): Observable<any[]>{
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.get<any[]>(`https://reddit-app-ken.herokuapp.com/api/posts/user/${name}`, { headers: headersss });
  }
}
