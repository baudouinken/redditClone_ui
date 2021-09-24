import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient,
    public authService: AuthService) { }

  getAllCommentsForPost(postId: number): Observable<any[]> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.httpClient.get<any[]>('http://localhost:8080/api/comments/post/' + postId,
    { headers: headersss });
  }

  postComment(commentPayload: any): Observable<any> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.httpClient.post<any>('http://localhost:8080/api/comments/',
    commentPayload, { headers: headersss });
  }

  getAllCommentsByUser(name: string): Observable<any[]> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.httpClient.get<any[]>(`http://localhost:8080/api/comments/user/${name}`, { headers: headersss });
  }
}
