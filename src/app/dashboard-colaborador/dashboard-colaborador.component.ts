import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-colaborador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-colaborador.component.html',
  styleUrls: ['./dashboard-colaborador.component.css'],
})
export default class DashboardColaboradorComponent implements OnInit {
  currentUser = localStorage.getItem('username'); // Nombre del usuario
  servicios: Array<any> = []; // Lista de servicios activos
  servicioSeleccionado: any = null; // Detalle del servicio seleccionado
  activeServices: number = 0; // Contador de servicios activos
  ingresosNetos: number = 0; // Suma de los precios de los servicios activos


  constructor(
    private authService: AuthService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email'); // Obtener email desde localStorage
    if (email) {
      this.cargarServicios(email);
    } else {
      console.warn('No se encontró el email del usuario en localStorage.');
    }
  }

  onLogout(): void {
    localStorage.removeItem('username'); // Limpiar localStorage
    this.authService.logout(); // Llamar al método de logout
    this.router.navigate(['/login']); // Redirigir al login
  }

  cargarServicios(email: string): void {
    this.authService.getServicesByEmail(email).subscribe({
      next: (data) => {
        this.servicios = data; // Asignar servicios obtenidos
        this.activeServices = this.servicios.length; // Actualizar contador de servicios activos
        console.log('Servicios cargados:', this.servicios);
        this.calcularIngresosNetos(); // Calcular ingresos netos
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
      },
    });
  }

  calcularIngresosNetos(): void {
    this.ingresosNetos = this.servicios.reduce((total, servicio) => {
      // Convertir el precio a número si es una cadena
      const precio = parseFloat(servicio.precio); 
      return total + (isNaN(precio) ? 0 : precio); // Solo sumar si el precio es válido
    }, 0);
  }
  

  verDetalle(servicio: any): void {
    this.servicioSeleccionado = servicio; // Guardar el detalle del servicio seleccionado
  }

  // Método para eliminar el servicio
  eliminarServicio(idServicio: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.authService.deleteServiceById(idServicio).subscribe({
        next: (response) => {
          alert('Servicio eliminado con éxito');
          this.servicios = this.servicios.filter((servicio) => servicio.id !== idServicio); // Eliminar de la lista
          this.servicioSeleccionado = null; // Limpiar los detalles del servicio
        },
        error: (error) => {
          console.error('Error al eliminar el servicio:', error);
          alert('Hubo un error al eliminar el servicio');
        },
      });
    }
  }
}
