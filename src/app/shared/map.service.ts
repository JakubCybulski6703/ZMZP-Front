import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapService {
  readonly rootUrl = 'http://localhost:35257';
  constructor(private http: HttpClient) { }

  getPoiList() {
    return this.http.get(this.rootUrl + '/api/getPoiList');
  }
}
