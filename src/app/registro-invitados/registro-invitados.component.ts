import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-invitado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-invitados.component.html',
  styleUrls: ['./registro-invitados.component.css']
})
export default class RegistroInvitadoComponent {
  eventoId: number;
  evento: any; // Guardaremos el evento completo
  nombre: string = '';
  nombreEvento;
  eventoFecha;
  user;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.eventoId = +this.route.snapshot.paramMap.get('id')!;
    this.nombreEvento = localStorage.getItem('nombreEvento');
    this.eventoFecha = localStorage.getItem('eventoFecha');
    this.user = localStorage.getItem('username');
  }

  registrarInvitado(): void {
    this.authService.registrarInvitado(this.eventoId, this.nombre).subscribe({
      next: () => {
        alert('Registro exitoso');
        this.nombre = '';
        this.router.navigate(['../invitados']);
      },
      error: (error) => {
        console.error('Error al registrar invitado:', error);
        alert('Hubo un error al registrar');
      }
    });
  }

}
