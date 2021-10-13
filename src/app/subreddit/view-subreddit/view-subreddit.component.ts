import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { SubredditModel } from 'src/app/models/subreddit-response';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {

  subreddit: SubredditModel;
  subredditId: number;

  constructor(
    private subRedditService: SubredditService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subredditId =  this.activatedRoute.snapshot.params.id;
    this.subRedditService.getSubreddit(this.subredditId).subscribe(data => {
      this.subreddit = data;
    }, error => {
      throwError(error);
    });
  }

}
