import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; 
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-invitados',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './invitados.component.html',
  styleUrls: ['./invitados.component.css']
})
export default class InvitadosComponent implements OnInit {
  eventos: any[] = []; // Lista de eventos creados por el usuario
  invitados: { [eventoId: number]: any[] } = {}; // Mapa eventoId -> lista de invitados
  currentUser: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('idUser'); // O de donde obtengas el ID del usuario
  
    if (userId) {
      this.authService.obtenerEventosPorUsuario(userId).subscribe({
        next: (eventos) => {
          this.eventos = eventos;
  
          this.eventos.forEach(evento => {
            this.authService.obtenerInvitadosPorEvento(evento.id).subscribe({
              next: (invitados) => {
                this.invitados[evento.id] = invitados;
              },
              error: (error) => {
                console.error('Error al cargar invitados:', error);
              }
            });
          });
        },
        error: (error) => {
          console.error('Error al cargar eventos:', error);
        }
      });
    } else {
      console.error('Error: No se encontró el ID del usuario');
    }
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
