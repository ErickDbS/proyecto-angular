import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './auth/auth.interceptor';  // Verifica que la ruta sea correcta
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),  // Usa el interceptor aquí
    provideRouter(routes),
  ],
});
