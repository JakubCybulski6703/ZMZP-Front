import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return of(null).pipe(mergeMap(() => {

      if (request.url.endsWith('/token') && request.method === 'POST') {
        const accessToken = {
          token: 'fake-token'
        };
        return of(new HttpResponse({status: 200, body: accessToken}));
      }
      if (request.url.endsWith('/GetUserClaims') && request.method === 'GET') {
        const data = {
          UserName: 'Jon Snow',
          FirstName: 'Aegon ',
          LastName: 'Targaryen',
          Email: 'JonSnow@gmail.com',
          token: 'fake-token'
        };
        return of(new HttpResponse({status: 200, body: data}));
      }
    }));
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
