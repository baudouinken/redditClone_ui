import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommentPayload } from 'src/app/models/comment.payload';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: any;
  commentForm: FormGroup;
  commentPayload: any;
  comments: any[];

  constructor(private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private router: Router,
    private _formBuilder: FormBuilder,
    public authService: AuthService) {

    this.postId = this.activateRoute.snapshot.params.id;

  }

  ngOnInit(): void {

    this.commentForm = this._formBuilder.group({
      text: ['', Validators.required],
      postId: this.postId
    });

    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {

    this.commentService.postComment(this.commentForm.value).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

}
