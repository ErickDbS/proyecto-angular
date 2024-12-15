import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';  // Ajusta la ruta según sea necesario

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService).getToken();  // Usamos `inject` para obtener una instancia del servicio
  
  if (req.url.includes('/users/login')) {
    return next(req);
  }

  if (!authService){
    return next(req)
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService}`
    }
  })

  return next(clonedRequest)
};
