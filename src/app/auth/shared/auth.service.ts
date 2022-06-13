import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../login/login-Response.payload';
import { LoginRequestPayload } from '../login/loginRequest.Payload';
import { SignupRequestPayload } from '../signup/singup-request.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient, 
    private localStorage: LocalStorageService) {}


  signup(signupRequestPayload: SignupRequestPayload): Observable<any>{
   return this.httpClient.post(`${this.apiServerUrl}/signup`, signupRequestPayload, {responseType: 'text'})
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean>{
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
    loginRequestPayload).pipe(map(data => { 
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
     
      return true;
    }));

  }

}
