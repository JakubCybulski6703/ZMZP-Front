import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return of(null).pipe(mergeMap(()  => {
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
      if (request.url.endsWith('/getPoiList') && request.method === 'GET') {
        const data = {
            token: 'fake-token',
            poiList: [{
              name: 'Dw. Łódź Kaliska',
              cords: {lat:  51.757813077948875, lon: 19.430501461029053},
              mark: 4.0,
              category: 'komunikacja',
              owner: '',
              comments: [
                {
                  owner: 'Marek Marciniak',
                  creationDate: 1555238553338,
                  mark: 2,
                  description: 'Brud,kolejka do kasy,odchody golebi',
                },
                {
                  owner: 'Pnieśu',
                  creationDate: 1555238213338,
                  mark: 3,
                  description: 'Dworzec w kiepskim stanie technicznym. ' +
                    'Jest poczekalnia z ławkami. Jest kiosk i bar. ' +
                    'Dużo kas, większość zamknięta przez co tworzą się kolejki.',
                }]
            },
              {
              name: 'Dw. Łódź Chojny',
              cords: {lat:  51.7264, lon: 19.484199999999987},
              mark: 3.0,
              category: 'komunikacja',
              owner: '',
              comments: []
            },
              {
              name: 'Dw. Łódź Widzew',
              cords: {lat:  51.7631, lon: 19.543800000000033},
              mark: 4.0,
              category: 'komunikacja',
                owner: '',
                comments: []
            },
              {
              name: 'Dw. Łódź Żabieniec',
              cords: {lat:  51.7936, lon: 19.40700000000004},
              mark: 2.0,
              category: 'komunikacja',
              owner: '',
                comments: []
            },
              {
              name: 'Dw. Łódź Fabryczna',
              cords: {lat:  51.7696, lon: 19.469600000000014},
              mark: 5.0,
              category: 'komunikacja',
              owner: '',
                comments: []
            },
            ]
          }
        ;
        return of(new HttpResponse({status: 200, body: data}));
      }
      return next.handle(request);
    }));
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
