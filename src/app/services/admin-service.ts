import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AdminCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = 'https://your-api-url.com/admin';

  constructor(private http: HttpClient) {}

  login(credentials: AdminCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  googleLogin(): Observable<any> {
    return this.http.get(`${this.apiUrl}/google-login`);
  }
}
