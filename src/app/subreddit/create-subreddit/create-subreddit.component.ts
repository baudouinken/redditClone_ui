import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SubredditModel } from '../../models/subreddit-response';
import { Router } from '@angular/router';
import { SubredditService } from '../../services/subreddit.service';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private subRedditService: SubredditService,
    )
  {

  }

  ngOnInit() {
    this.createSubredditForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createSubreddit() {
    this.subRedditService.createSubreddit(this.createSubredditForm.value).subscribe(data => {
      this.router.navigateByUrl('/list-subreddits');
    }, error => {
      throwError(error);
    })
  }
}
