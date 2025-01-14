import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// En el archivo colaborator-events.component.ts
export interface Servicio {
  id: number;
  nombreNegocio: string;
  telefono: string;
  precio: number;
  descripcion: string;
  direccion: string;
  tipoServicio: string;
  imagenUrl: string;
}


@Component({
  selector: 'app-colaborator-events',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './colaborator-events.component.html',
  styleUrls: ['./colaborator-events.component.css'],
})
export default class ColaboratorEventsComponent {
  currentUser = localStorage.getItem('username');
  servicios: Servicio[] = []; // Lista de servicios activos
  servicioSeleccionado: Servicio | null = null; // Servicio seleccionado para editar

  nombreNegocio = '';
  descripcion = '';
  precio = '';
  tipoServicio = '';
  telefono = '';
  direccion = '';
  email = localStorage.getItem('email');
  imagen: File | null = null;
  imagenPreview: string | ArrayBuffer | null = ''; // Variable para la imagen seleccionada

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email'); // Obtener email desde localStorage
    if (email) {
      this.cargarServicios(email);
    } else {
      console.warn('No se encontró el email del usuario en localStorage.');
    }
  }

  onImageSelected(event: any): void {
    this.imagen = event.target.files[0];
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para cargar los servicios del colaborador por su email
  cargarServicios(email: string): void {
    this.authService.getServicesByEmail(email).subscribe({
      next: (data) => {
        this.servicios = data.map((servicio) => ({
          ...servicio,
          imagenUrl: servicio.imagenUrl || 'assets/default-image.png', // Imagen por defecto si no hay URL
        }));
        console.log('Servicios cargados:', this.servicios);
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
      },
    });
  }

  modificarServicio(servicio: Servicio) {
    this.servicioSeleccionado = { ...servicio }; // Clonar para no modificar directamente
  }

  // Método para guardar los cambios de un servicio
  guardarCambios() {
    if (this.servicioSeleccionado) {
      this.authService.updateService(this.servicioSeleccionado).subscribe({
        next: (updatedService) => {
          // Actualizar el servicio en la lista local
          const index = this.servicios.findIndex((s) => s.id === updatedService.id);
          if (index !== -1) {
            this.servicios[index] = updatedService;
          }
          alert('Servicio actualizado con éxito.');
          this.servicioSeleccionado = null; // Ocultar el formulario
        },
        error: (err) => {
          console.error('Error al actualizar el servicio:', err);
          alert('Ocurrió un error al actualizar el servicio.');
        }
      });
    }
  }

  cancelarEdicion() {
    this.servicioSeleccionado = null; // Ocultar el formulario sin guardar
  }

  marcarComoCompletado(id: number) {
    this.servicios = this.servicios.filter(servicio => servicio.id !== id); // Eliminar el servicio completado
    alert('Servicio marcado como completado.');
  }

  onLogout() {
    localStorage.removeItem('username');
    this.authService.logout();
  }
}
