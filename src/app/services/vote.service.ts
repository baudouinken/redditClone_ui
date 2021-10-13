import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  vote(votePayload: any): Observable<any> {
    const headersss: HttpHeaders = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.authService.getJwtToken()
      }
    );
    return this.http.post('https://reddit-app-ken.herokuapp.com/api/votes/', votePayload, { headers: headersss });
  }
}
