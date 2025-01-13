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

  crearEvento(
    nombre: string,
    descripcion: string,
    fecha: string,
    lugar: string,
    contacto: string,
    imagen: File,
    userID: string
  ): Observable<any> {
    const formData = new FormData();
    console.log('formData:', formData);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('fecha', fecha);
    formData.append('lugar', lugar);
    formData.append('contacto', contacto);
    formData.append('imagen', imagen);
    if (userID) {
      formData.append('id_Usuario', userID); // Adjuntar el ID del usuario
    }

    

    return this.http.post<any>(`${this.apiUrl}/evento/POST`, formData);
  }


  crearServicio(
    nombreNegocio: string,
    descripcion: string,
    tipoServicio: string,
    precio: string,
    telefono: string,
    direccion: string,
    email: string | null,
    nombre: string | null,
    imagen: File
  ): Observable<any> {
  
    const formData = new FormData();
    
    formData.append('nombreNegocio', nombreNegocio);
    formData.append('descripcion', descripcion);
    formData.append('tipoServicio', tipoServicio);
    formData.append('precio', precio);
    formData.append('telefono', telefono);
    formData.append('direccion', direccion);
  
    // Asegúrate de que 'email' y 'nombre' no sean null
    formData.append('email', email ?? ''); // Usa una cadena vacía si email es null
    formData.append('nombre', nombre ?? ''); // Usa una cadena vacía si nombre es null
  
    // Asegúrate de que 'imagen' no sea null y se pase correctamente
    if (imagen) {
      formData.append('imagen', imagen, imagen.name); // Asegúrate de que el nombre del archivo se pase correctamente
    }
  
    console.log('FormData:', formData);
  
    return this.http.post<any>(`${this.apiUrl}/colaboradores/createService`, formData);
  }
  

  obtenerEventosPorUsuario(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/evento/GET/${userId}`);
  }

  deleteEventById(idEvent: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/evento/DELETE/${idEvent}`, { responseType: 'text' });
  }
  
  

  login(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, data).pipe(
      tap(response => {
        if(response.token){
          this.setToken(response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('idUser', response.idUser);
        }
      })
    )
  }

  loginColaborador(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerColab/login`, data).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('idUser', response.idUser);
          localStorage.setItem('email', response.email);
        }
      })
    );
  }
  

  registrar(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/POST`, data).pipe(
      tap(response => {
        if(response.token){
          this.setToken(response.token);
        }
      })
    )
  }

  registrarColaborador(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerColab/POST`, data)
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
    localStorage.removeItem('idUser');
    localStorage.removeItem('password');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
