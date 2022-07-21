import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/shared/auth.service';
import { CustomResponse } from '../interface/custom-response';

@Injectable({
  providedIn: 'root'
})
export class UserInventoryValueServiceService {
  baseUrl = environment.baseUrl
  private apiServerUrl = this.baseUrl + 'userinventoryvalue';


  constructor(private http: HttpClient, public authService: AuthService) { }


  public getUserInventoryValues(): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/list`);
  }
}
