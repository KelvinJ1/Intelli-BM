import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
  }
}
/*.pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMessage ="ha ocurrido un error, por favor contactar al administrador."
        if (error.error.message{
          errorMessage=error.error.message;
          return observableThrowError

        })

      })
    );*/