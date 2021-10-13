import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginRequestPayload } from '../../models/login-request.payload';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.signinForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login() {

    this._authService.login(this.signinForm.value).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
      this.toastr.success('Login Successful');
    }, error => {
      this.isError = true;
      throwError(error);
      this.toastr.error(error, 'Loggin failed! Please try again');
    });
  }

}
