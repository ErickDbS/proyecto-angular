import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export default class CreateEventComponent {
  nombre = '';
  descripcion = '';
  fecha = '';
  lugar = '';
  contacto = '';
  imagen: File | null = null;
  imagenPreview: string | ArrayBuffer | null = ''; // Variable para la imagen seleccionada
  userID: string | null = null; // Inicializamos como null

  constructor( private authService: AuthService, private router: Router) {}
  
  
ngOnInit() {
  this.userID = localStorage.getItem('idUser');
  console.log('ID del usuario:', this.userID);
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


  onSubmit(): void {
    if (!this.userID) {
      alert('El ID del usuario no está disponible. Inicia sesión nuevamente.');
      return;
    }

    if (this.imagen) {
      this.authService
        .crearEvento(
          this.nombre,
          this.descripcion,
          this.fecha,
          this.lugar,
          this.contacto,
          this.imagen,
          this.userID
        )
        .subscribe(
          (response) => {
            console.log('Evento creado con éxito', response);
            alert('Evento creado con éxito');
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error al crear evento', error);
            alert('Error al crear evento');
          }
        );
    }
  }
  

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
