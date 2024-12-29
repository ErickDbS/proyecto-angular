import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export default class RegistrarComponent {
  username: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  registrar(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      alert('Las contraseñas no coinciden');
      return;
    }
    const registerData = { user: this.username, password: this.password };
    this.authService.registrar(registerData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
       this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Hubo un problema al registrar. Por favor, inténtalo de nuevo.');
      },
    });
  }
  

}
