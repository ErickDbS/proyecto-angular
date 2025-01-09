import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  constructor( private authService: AuthService, private router: Router) {}
 currentUser: string | null = null;
 eventos: any[] = []; // Almacenará los eventos del usuario


 ngOnInit() {
  this.currentUser = localStorage.getItem('username');
  const userId = localStorage.getItem('idUser'); // Obtener el ID del usuario

  if (userId) {
    this.authService.obtenerEventosPorUsuario(userId).subscribe(
      (data) => {
        this.eventos = data; // Guardar los eventos obtenidos
        console.log('Eventos cargados:', this.eventos);
      },
      (error) => {
        console.error('Error al cargar eventos:', error);
      }
    );
  } else {
    console.warn('ID del usuario no encontrado en localStorage');
  }
}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
