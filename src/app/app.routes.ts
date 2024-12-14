import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/AuthGuard';
import LandingPageComponent from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./landing-page/landing-page.component')},
  { path: 'login', component: LoginComponent },
  { path: 'home', loadComponent: () => import('./home/home.component'), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
