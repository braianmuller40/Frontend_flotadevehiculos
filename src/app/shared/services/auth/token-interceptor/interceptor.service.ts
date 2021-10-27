import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'authorization': 'Bearer '+ this.auth.getToken()?.toString()
    });

    const reqClone = request.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.captureError.bind(this))
    );
  }

  captureError(error:HttpErrorResponse){
    if(error.status == 403 || error.status == 401){
      //Unauthorized
      this.auth.logout();
    }else if(error.status == 0 || error.status == 404 || error.status == 500){
      //disconect
      this.auth.logout();
    }
    return throwError("No se pudo completar la operacion");
  }

}
