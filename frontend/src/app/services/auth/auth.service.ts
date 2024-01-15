import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { JwtService } from '../jwt/jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
    return this.jwtService.getToken() && this.jwtService.getDecodedToken()?.exp as number > (Date.now() / 1000)
  }

  private baseUrl = 'http://localhost:3000/auth'; // Your backend API base URL

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  logout(): void {
    this.jwtService.destroyToken();
    localStorage.clear();
    this.router.navigate(['/login']);
    // You might want to add additional cleanup steps here
  }
}
