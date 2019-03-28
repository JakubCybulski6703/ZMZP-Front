import {Component, Input, OnInit} from '@angular/core';
import {icon} from 'leaflet';
import {Observable} from 'rxjs';
import {Poi} from '../models/Poi.model';
declare let L;

@Component({
  selector: 'zmzp-osm',
  templateUrl: './osm.component.html',
  styleUrls: ['./osm.component.css']
})
export class OsmComponent implements OnInit {

  @Input()
  poiList: Poi[];
  constructor() { }

  ngOnInit() {
    const map = L.map('map').setView([51.7687323, 19.4569911], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);
    if (this.poiList) {
      for (let i = 0, len = this.poiList.length; i < len; i++) {
        L.marker([ this.poiList[i].cords.lat, this.poiList[i].cords.lon ], {
          icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        }).addTo(map)
          .bindPopup(this.poiList[i].name + '<br>ocena: ' + this.poiList[i].mark);
      }
    }
  }

}
