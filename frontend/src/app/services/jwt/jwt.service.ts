import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";

const TOKEN_KEY = 'auth-token';

interface JwtClaims extends jwt_decode.JwtPayload{
  id: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getDecodedToken():JwtClaims |null
  {
    return this.decodeToken(this.getToken()??"")
  }

  decodeToken(token: string): JwtClaims | null {
    try {
      return jwt_decode.jwtDecode(token) as JwtClaims;
    } catch (error) {
      console.error('Error decoding JWT', error);
      return null;
    }
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    //localStorage.setItem("USERDATA",this.decodeToken(token)?)
  }

  destroyToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
