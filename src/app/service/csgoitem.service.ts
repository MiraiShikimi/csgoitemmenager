import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { csgoItem } from '../interface/csgoItem';
import { CustomResponse } from '../interface/custom-response';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/shared/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CsgoitemService {

  jwtToken: string;
  baseUrl = environment.baseUrl
  private apiServerUrl = this.baseUrl + 'csgoitem';
  

  constructor(private http: HttpClient, public authService: AuthService) { }


  public getCSGOItems(): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/list`);
  }

  public addCSGOItems(csgoItem: csgoItem): Observable<CustomResponse>{
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/save`, csgoItem);
  }

  public updateCSGOItems(csgoItem: csgoItem): Observable<CustomResponse>{
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/save`, csgoItem);
  }

  public deleteCSGOItems(csgoItemId: number): Observable<CustomResponse>{
    return this.http.delete<CustomResponse>(`${this.apiServerUrl}/delete/${Number}`);
  }

  public refreshCSGOItems(csgoItemId: number): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/updateprice/${Number}`);
  }

  public refreshAllCSGOItems(): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/updateprice/all`);
  }
}
