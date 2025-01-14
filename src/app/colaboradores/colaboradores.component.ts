import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export default class ColaboradoresComponent implements OnInit {
  servicios: any[] = [];
  modalVisible: boolean = false;  // Controla la visibilidad del modal
  servicioSeleccionado: any = null; // Servicio seleccionado para contratación

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.authService.getAllServices().subscribe({
      next: (data) => {
        this.servicios = data;
        console.log('Servicios cargados:', this.servicios);
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
      }
    });
  }

  // Función para abrir el modal con la información del servicio seleccionado
  abrirModal(servicio: any): void {
    this.servicioSeleccionado = servicio;
    this.modalVisible = true;  // Mostrar el modal
  }

  // Función para cerrar el modal
  cerrarModal(): void {
    this.modalVisible = false;
  }

  // Función para confirmar la contratación del servicio
  confirmarContratacion(): void {
    // Lógica para confirmar la contratación (ejemplo: guardar en localStorage, hacer un pedido, etc.)
    console.log('Servicio contratado:', this.servicioSeleccionado);

    // Cerrar el modal
    this.cerrarModal();

    // Puedes agregar aquí la lógica para navegar a una página de confirmación, o actualizar el estado del servicio
    // Ejemplo: 
    // this.router.navigate(['/confirmacion', this.servicioSeleccionado.id]);
  }
}
