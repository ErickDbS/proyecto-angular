import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})

export default class RegistrarComponent {
  // General
  tipoRegistro: 'usuario' | 'colaborador' = 'usuario';

  // Usuario Normal
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Colaborador
  nombre: string = '';
  email: string = '';
  pass: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  seleccionarTipo(tipo: 'usuario' | 'colaborador'): void {
    this.tipoRegistro = tipo;
  }

  registrarUsuario(): void {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const registerData = { user: this.username, password: this.password };
    this.authService.registrar(registerData).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Hubo un problema al registrar al usuario.');
      },
    });
  }

  registrarColaborador(): void {
    const colaboradorData = {
      nombre: this.nombre,
      email: this.email,
      pass: this.pass,
    };
    

    console.log('Colaborador Data:', colaboradorData);

    this.authService.registrarColaborador(colaboradorData).subscribe({
      next: () => {
        alert('Colaborador registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Hubo un problema al registrar al colaborador.');
      },
    });
  }
}
