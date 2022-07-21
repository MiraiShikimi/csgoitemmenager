import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './singup-request.payload';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;

  signupForm: UntypedFormGroup;

  constructor(private authService: AuthService,  private router: Router, private toastr: ToastrService) { 
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: '',

    }
  }

  ngOnInit(): void {
    this.signupForm = new UntypedFormGroup(
      {
        username: new UntypedFormControl('', Validators.required),
        email: new UntypedFormControl('',[Validators.required,Validators.email]),
        password: new UntypedFormControl('',Validators.required)

      }
    )

  }

  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'],
        {queryParams: {registered: 'true' }});
    }, error => {
      console.log(error);
      this.toastr.error('Registration Failed! Please try again');
    }
    
    );

  }

}
