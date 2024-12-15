import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080'; // Cambia esto a la URL de tu backend

  private tokenKey = 'jwtToken';
  private refreshTokenKey = 'jwtRefreshToken';

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  login(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, data).pipe(
      tap(response => {
        if(response.token){
          this.setToken(response.token);
        }
      })
    )
  }

public setToken(token: string): void {
  localStorage.setItem(this.tokenKey, token);
}
  

public getToken(): string | null {
  if(typeof window !== 'undefined'){
    return localStorage.getItem(this.tokenKey);
  } else {
    return null;
  }
}

private setRefreshToken(token: string): void {
  localStorage.setItem(this.refreshTokenKey, token);
}

private getRefreshToken(): string | null {
  if(typeof window !== 'undefined'){
    return localStorage.getItem(this.refreshTokenKey)
  } else {
    return null;
  }
}



  isAuthenticated(): boolean {
    // Verificar si el token existe y no ha expirado
    const token = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void {
    // Eliminar el token de localStorage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }
}
