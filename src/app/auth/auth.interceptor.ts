import {HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../shared/user.service';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {FakeBackendInterceptor} from '../shared/FakeBackendInterceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.get('No-Auth') === 'True') {
          return next.handle(request.clone());
        }
        if (localStorage.getItem('userToken') != null) {
            const clonedrequest = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
            });
            return next.handle(clonedrequest)
                .do(
                succ => { },
                err => {
                    if (err.status === 401) {
                      this.router.navigateByUrl('/login');
                    }
                }
                );
        }
        return next.handle(request);
    }
}
export let authProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
