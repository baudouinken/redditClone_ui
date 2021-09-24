import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubredditModel } from './subreddit-response';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  constructor(
    private http: HttpClient,
    public authService: AuthService
    ) { }

  getAllSubreddits() : Observable<any[]>{
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.get<Array<any>>('http://localhost:8080/api/subreddit', { headers: headersss });
  }

  createSubreddit(subredditModel: any): Observable<any> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.post<any>('http://localhost:8080/api/subreddit',
      subredditModel, { headers: headersss });
  }
}
