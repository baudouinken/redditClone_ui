import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  goToCreatePost() {
    this.router.navigateByUrl('/create-post');
  }

  goToCreateSubreddit() {
    this.router.navigateByUrl('/create-subreddit');
  }

}
