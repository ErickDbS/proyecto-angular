import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-colaborator-events',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './colaborator-events.component.html',
  styleUrl: './colaborator-events.component.css'
})
export default class ColaboratorEventsComponent {
  currentUser = localStorage.getItem('username');

  constructor(private authService: AuthService, private router: Router) {}
   

  onLogout(){
    localStorage.removeItem('username');
    this.authService.logout();
    
  }
}
