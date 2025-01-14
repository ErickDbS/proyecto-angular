import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Servicio } from '../app/dashboard-colaborador/colaborator-events/colaborator-events.component';

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
    console.log('nombreNegocio en el FormData:', nombreNegocio); // Asegúrate de que no es null
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

  // auth.service.ts
  obtenerInvitadosPorEvento(eventoId: number): Observable<any[]> {
    const token = localStorage.getItem('jwtToken');  // O cualquier otro lugar donde guardes el token

    // Si no se encuentra el token, manejar el caso adecuadamente
    if (!token) {
      console.error('Token de autenticación no encontrado');
      return new Observable();  // Puedes devolver un Observable vacío si no hay token
    }

    // Añadir el token a las cabeceras de la solicitud
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/invitados/evento/${eventoId}`, { headers });
  }

  // auth.service.ts
  obtenerEventoPorId(eventoId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken'); // O la forma en que almacenes el token
    return this.http.get<any>(`${this.apiUrl}/eventos/getEvento/${eventoId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  
  
  


registrarInvitado(eventoId: number, nombre: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/invitados/registrar/${eventoId}?nombre=${nombre}`, {});
}


  getServicesByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/colaboradores/getServices/${email}`);
  }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/colaboradores/servicios`);
  }


  deleteEventById(idEvent: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/evento/DELETE/${idEvent}`, { responseType: 'text' });
  }

  deleteServiceById(idSerivice: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/colaboradores/DELETE/${idSerivice}`, { responseType: 'text' });
  }
  
  updateService(servicio: Servicio): Observable<Servicio> {
    const token = localStorage.getItem('jwtToken');  // Asegúrate de que el token JWT esté disponible

    if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        console.log(servicio)  // Asegúrate de que el encabezado Authorization esté presente
        return this.http.put<Servicio>(`${this.apiUrl}/colaboradores/PUT/${servicio.id}`, servicio, { headers });
    } else {
        console.error('No se encontró el token');
        throw new Error('No se encontró el token');
    }
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
