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
  {
    path: 'crear evento',
    loadComponent: ()=> import('./create-event/create-event.component'),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard-colaborador',
    loadComponent: ()=> import('./dashboard-colaborador/dashboard-colaborador.component'),
    canActivate: [AuthGuard]
  },
  {
    path: 'colaborador-eventos',
    loadComponent: ()=> import('./dashboard-colaborador/colaborator-events/colaborator-events.component'),
    canActivate: [AuthGuard]
  },
  {
    path: 'nuevo-servicio',
    loadComponent: ()=> import('./dashboard-colaborador/create-colaborator-service/create-colaborator-service.component')
  }
  ];
