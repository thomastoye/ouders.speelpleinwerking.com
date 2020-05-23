import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';
import { GRAPHQL_URL } from '../graphql/graphql-url';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AngularFireAuth,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(GRAPHQL_URL)) {
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
