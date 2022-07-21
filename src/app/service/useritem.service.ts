import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { CustomResponse } from '../interface/custom-response';
import { userItem } from '../interface/useritem';

@Injectable({
  providedIn: 'root'
})
export class UseritemService {
  jwtToken: string;
  private apiServerUrl = 'http://localhost:8080/useritem';
  

  constructor(private http: HttpClient, public authService: AuthService) { }

  public getUserItems(): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/list`);
  }

  public addCSGOItems(userItem: userItem): Observable<CustomResponse>{
    console.log(userItem.csgoItem.displayName);
    console.log(userItem.csgoItem.id);
    console.log(userItem.quantity);
    console.log(userItem.csgoItem.lowestPrice);
    console.log(userItem);
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/save`, userItem);
    
  }


  public updateCSGOItems(userItem: userItem): Observable<CustomResponse>{
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/update`, userItem);
  }

/*
  public deleteCSGOItems(csgoItemId: number): Observable<CustomResponse>{
    return this.http.delete<CustomResponse>(`${this.apiServerUrl}/delete/${Number}`);
  }

  public refreshCSGOItems(csgoItemId: number): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/refresh/${Number}`);
  }

*/

}
