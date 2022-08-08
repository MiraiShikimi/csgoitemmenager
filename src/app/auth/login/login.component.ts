import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './loginRequest.Payload';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
    this.loginRequestPayload= {
      username: '',
      password: ''
    }
   }

  ngOnInit(): void {
    this.registerSuccessMessage = '';
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup successfull')
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
        + 'activate your account before you Login!';
      }
    });
  }

  login(){
    this.loginRequestPayload.username = this.loginForm.get('username').value;    
    this.loginRequestPayload.password = this.loginForm.get('password').value;    

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if (data) {
        this.isError = false;
       // this.router.navigateByUrl('/')
        this.toastr.success('login Successful')
        location.href = "/"
        
      }else {
        this.isError = true;
      }
    });
  }

}
