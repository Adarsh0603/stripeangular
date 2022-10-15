import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  post(endpoint: string, body: any) {
    return this.http.post(`${environment.API.baseUrl}${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${this.authService.currentUser?.token}`,
      },
    });
  }
  get(endpoint: string) {
    return this.http.get(`${environment.API.baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.authService.currentUser?.token}`,
      },
    });
  }
  put(endpoint: string, body: any) {
    return this.http.put(
      `${environment.API.baseUrl}${endpoint}`,
      JSON.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.authService.currentUser?.token}`,
        },
      }
    );
  }
  delete(endpoint: string) {
    return this.http.delete(`${environment.API.baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.authService.currentUser?.token}`,
      },
    });
  }
}
