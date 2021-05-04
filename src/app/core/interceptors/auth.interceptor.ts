import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { TokenAuthService } from 'src/app/core/services/token-auth-service/token-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenAuthService: TokenAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return of(this.tokenAuthService.getToken()).pipe(
      mergeMap( (token) => {
        const authRequest = token ?  request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }) : request;
        return next.handle(authRequest).pipe(
          catchError( error => {
            if (error instanceof HttpErrorResponse){
              if (error.status === 401) {
                console.log('Redirect to login page');
                return EMPTY;
              }
            }
            throw error;
          }));
      }),
    );
  }
}
