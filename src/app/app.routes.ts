import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/AuthGuard';
import LandingPageComponent from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./landing-page/landing-page.component')},
  { path: 'login', loadComponent: ()=> import('./login/login.component') },
  { path: 'home', loadComponent: () => import('./home/home.component') },
  { path: '**', redirectTo: 'login' },
];
