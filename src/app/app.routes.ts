import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/AuthGuard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./landing-page/landing-page.component')
  },
  { 
    path: 'login', 
    loadComponent: ()=> import('./login/login.component') 
  },
  { 
    path: 'registrar', 
    loadComponent: ()=> import('./registrar/registrar.component')
  },
  { 
    path: 'home', 
    loadComponent: () => import('./home/home.component'),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'colaboradores', 
    loadComponent: ()=> import('./colaboradores/colaboradores.component'),
    canActivate: [AuthGuard]
  },
];
