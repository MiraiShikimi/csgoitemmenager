import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/loginRequest.Payload';
import { SignupRequestPayload } from '../signup/singup-request.payload';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../login/loginresponse.payload';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl

  private apiServerUrl =  this.baseUrl + 'api/auth';

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient, 
    private localStorage: LocalStorageService,private router: Router) {}


  signup(signupRequestPayload: SignupRequestPayload): Observable<any>{
   return this.httpClient.post(`${this.apiServerUrl}/signup`, signupRequestPayload, {responseType: 'text'})
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean>{
    return this.httpClient.post<LoginResponse>( this.apiServerUrl + '/login',
    loginRequestPayload).pipe(map(data => { 
      this.localStorage.store('roles',data.roles)
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('pictureUrl', data.pictureUrl);
     
      return true;
    }));

  }

  logout() {
    console.log("logging out")
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('roles');
    this.localStorage.clear('pictureurl');


  }

  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken')
  }

  refreshToken(){

    const headers= new HttpHeaders().set('Authorization', this.getRefreshToken());
    return this.httpClient.post<LoginResponse>( this.apiServerUrl + '/refresh/token',this.refreshTokenPayload,{'headers': headers})
      .pipe(catchError(error => {
        console.log("okok")
        if (error instanceof HttpErrorResponse
          && error.status === 403)
        {
          console.log(error.error);
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('username');
          this.localStorage.clear('refreshToken');
          this.localStorage.clear('roles');
          this.router.navigateByUrl('');
          window.location.reload()
          return throwError(error);
          
        }else{
          return throwError(error);
        }
      }) ,
        tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
      }))


  
    
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return "Bearer " + this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean{
    return this.getJwtToken() != null;
  }


}
