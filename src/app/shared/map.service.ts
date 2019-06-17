import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MapService {
  readonly rootUrl = '/agile';
  constructor(private http: HttpClient) { }

  getPoiList() {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', token : localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + '/places', { headers : reqHeader});
  }

  getPoiDetails(placeId) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', token : localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + '/place_details/' + placeId, { headers : reqHeader});
  }
  getImage(imageId) {
    const reqHeader = new HttpHeaders({token : localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + '/images/' + imageId, { headers : reqHeader, responseType: 'blob' as 'json'});
  }
  addOpinion(data) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', token : localStorage.getItem('userToken')});
    return this.http.post(this.rootUrl + '/opinion ', data, { headers : reqHeader});
  }
}
