import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppItem } from './app-item.enum';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const idToken = localStorage.getItem(AppItem.IdToken) ?? '';
    request = request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}
