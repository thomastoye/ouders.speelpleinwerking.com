import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';
import { API_BASE_URL } from './injection-tokens';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AngularFireAuth,
    private injector: Injector,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.injector.get(API_BASE_URL))) {
      return this.auth.idToken.pipe(first(), flatMap(token => {
        return next.handle(req.clone({
          setHeaders: {
            Authorization: `Bearer: ${token}`,
          }
        }));
      }));
    } else {
      return next.handle(req);
    }
  }
}
