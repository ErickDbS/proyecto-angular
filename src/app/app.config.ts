import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../auth/auth.interceptor'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';  // Importar FormsModule

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),  // Usa el interceptor funcional aquí  
    FormsModule  // Asegúrate de que FormsModule está incluido
  ],
};
