// import { inject } from '@angular/core';
// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { AuthService } from '../services/auth.service';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
//   const token = authService.getToken();

//   let modifiedReq = req;
//   if (token) {

//     console.log("abc");

    
//     modifiedReq = req.clone({
//       setHeaders: {
//         authorization: `Bearer ${token}`
//       }
//     });
//   }

//   return next(modifiedReq).pipe(
//     catchError((error: HttpErrorResponse) => {
//       if (error.status === 401) {
//         // authService.logout(); // Log out if unauthorized
//         console.warn('401 Unauthorized - Logging out...');
//         authService.logout('unAuthorized');
//       }
//       return throwError(() => error || 'An error occurred');
//     })
//   );
// };











import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  let modifiedReq = req;

  if (token) {
    console.log("Interceptor adding token...");
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  console.log('Request passed through interceptor:', modifiedReq);

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log("Error caught in interceptor:", error);
      if (error.status === 401) {
        console.warn('401 Unauthorized - Logging out...');
        authService.logout('unAuthorized');
      }
      return throwError(() => error || 'An error occurred');
    })
  );
};
