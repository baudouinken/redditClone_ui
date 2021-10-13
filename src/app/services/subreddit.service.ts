import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubredditModel } from '../models/subreddit-response';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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
    return this.http.get<Array<any>>('https://reddit-app-ken.herokuapp.com/api/subreddit', { headers: headersss });
  }

  createSubreddit(subredditModel: any): Observable<any> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.post<any>('https://reddit-app-ken.herokuapp.com/api/subreddit',
      subredditModel, { headers: headersss });
  }
}
