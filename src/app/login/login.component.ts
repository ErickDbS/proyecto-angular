import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export default class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent cargado');
  }

  login(): void {
    const loginData = { user: this.username, password: this.password };  // Asegúrate que los nombres de las propiedades son correctos
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        if (response && response.token) {
          this.authService.setToken(response.token);  // Guarda el token correctamente
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/home'])
        } else {
          console.error('No se recibió el token');
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas';
        console.log('Error en el inicio de sesión', err);
      },
    });
  }
  
}
