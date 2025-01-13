import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export default class LoginComponent {
  tipoLogin: 'usuario' | 'colaborador' = 'usuario';
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent cargado');
  }

  seleccionarTipo(tipo: 'usuario' | 'colaborador'): void {
    this.tipoLogin = tipo;
  }

  login(): void {
    if (this.tipoLogin === 'usuario') {
      this.loginUsuario();
    } else {
      this.loginColaborador();
    }
  }

   loginUsuario(): void {
    const loginData = { user: this.username, password: this.password };
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend (usuario):', response);
        if (response && response.token) {
          this.authService.setToken(response.token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'No se recibió el token.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas para usuario.';
        console.error('Error en el inicio de sesión del usuario:', err);
      },
    });
  }

   loginColaborador(): void {
    const loginData = { email: this.email, password: this.password };
    this.authService.loginColaborador(loginData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend (colaborador):', response);
        if (response && response.token) {
          this.authService.setToken(response.token);
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/dashboard-colaborador']);
        } else {
          alert
          this.errorMessage = 'No se recibió el token.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas para colaborador.';
        console.error('Error en el inicio de sesión del colaborador:', err);
      },
    });
  }
}
