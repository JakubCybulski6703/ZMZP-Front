import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {User} from '../models/User.model';

@Injectable()
export class UserService {
  readonly rootUrl = '/agile';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const data: User = {
      login: user.login,
      password: user.password,
      name: user.name,
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/register_user', data, { headers : reqHeader});
  }

  userAuthentication(login, password) {
    const data = {
      login,
      password
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type':  'application/json',
        'cache-control': 'no-cache'
  })
    };
    return this.http.post(this.rootUrl + '/login', data, httpOptions);
  }

  getUserClaims() {
   return  this.http.get(this.rootUrl + '/api/GetUserClaims');
  }

}
