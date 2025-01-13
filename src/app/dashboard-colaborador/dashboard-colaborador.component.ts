import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-colaborador',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-colaborador.component.html',
  styleUrl: './dashboard-colaborador.component.css'
})
export default class DashboardColaboradorComponent {
  currentUser = localStorage.getItem('username');

  constructor(private authService: AuthService, private router: Router) {}


  onLogout(){
    localStorage.removeItem('username');
    this.authService.logout();
    
  }
}

