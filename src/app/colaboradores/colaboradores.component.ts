import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export default class ColaboradoresComponent implements OnInit {
  servicios: any[] = [];

  constructor(private authService: AuthService) {}

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
}
