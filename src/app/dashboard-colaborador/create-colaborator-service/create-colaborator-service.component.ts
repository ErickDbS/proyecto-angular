import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-colaborator-service',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './create-colaborator-service.component.html',
  styleUrl: './create-colaborator-service.component.css'
})
export default class CreateColaboratorServiceComponent {
  nombre = localStorage.getItem('username');
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


  onSubmit(): void {


    if (this.imagen) {
      this.authService
        .crearServicio(
          this.nombreNegocio,
          this.descripcion,
          this.tipoServicio,
          this.precio,
          this.telefono,
          this.direccion,
          this.email,
          this.nombre,
          this.imagen
        )
        .subscribe(
          (response) => {
            console.log('Servicio creado con éxito', response);
            alert('Servicio creado con éxito');

          },
          (error) => {
            console.log("nombre", this.nombre,"email",this.email, "contacto", this.telefono,"descripcion", this.descripcion,"imagen", this.imagen,"nombreNegocio", this.nombreNegocio,"precio", this.precio,"tipoServicio", this.tipoServicio);
            console.error('Error al crear servicio', error);
            alert('Error al crear servicio');
          }
        );
    }
  }

  onLogout(){
    localStorage.removeItem('username');
    this.authService.logout();
    
  }
}
