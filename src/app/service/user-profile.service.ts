import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  baseUrl = environment.baseUrl
  private apiServerUrl = this.baseUrl + 'api/auth' ;

  constructor(private http: HttpClient, public authService: AuthService) { }

  updateProfilePictureUrl(url: string): Observable<any>{
    
    return this.http.get(`${this.apiServerUrl}/profilePicture/${url}`)
   }


}
