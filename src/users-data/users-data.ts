import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, tap, catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
    private apiUrl = 'http://localhost:8080/users/GET';
    private usersDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        const storeData = this.getUsersDataFromLocalStorage();
        if(storeData) {
            this.usersDataSubject.next(storeData);
        }
    }

    private getUsersDataFromLocalStorage(): any | null {
        const storeData = localStorage.getItem('usersData');
        return storeData ? JSON.parse(storeData) : null;
    }

    private saveUserDataToLocalStorage(data: any): void {
        localStorage.setItem('userData', JSON.stringify(data));
    }
    
      // Cargar los datos del usuario desde la API
        loadUserData(): Observable<any> {
        // Verificamos si ya están los datos cargados
        if (this.usersDataSubject.value) {
          return of(this.usersDataSubject.value); // Si ya está cargado, devolvemos los datos actuales
        }
    
        this.isLoadingSubject.next(true); // Indicamos que estamos cargando los datos
    
        const username = localStorage.getItem('username');
        if (!username) {
            throw new Error('El usuario no está definido en localStorage.');
        }
    
        return this.http.get<any>(`${this.apiUrl}/${username}`).pipe(
            tap((data) => {
            this.usersDataSubject.next(data); // Actualizamos el BehaviorSubject con los nuevos datos
            this.saveUserDataToLocalStorage(data); // Guardamos los datos en localStorage
            this.isLoadingSubject.next(false); // Indicamos que la carga ha terminado
            }),
            catchError((error) => {
            console.error('Error al cargar datos del usuario:', error);
            this.isLoadingSubject.next(false); // En caso de error, indicamos que ha terminado
            throw error; // Rethrow error para que lo maneje quien llama al servicio
            })
        );
        }
    
      // Obtener los datos del usuario de forma reactiva
        getUserData(): Observable<any> {
        return this.usersDataSubject.asObservable();
        }
    
      // Obtener el estado de carga
        isLoading(): Observable<boolean> {
        return this.isLoadingSubject.asObservable();
        }
    
      // Limpiar los datos del usuario y eliminar de localStorage
        clearUserData(): void {
        this.usersDataSubject.next(null);
        localStorage.removeItem('userData');
        }
}