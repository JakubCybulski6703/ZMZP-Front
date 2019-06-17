import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {icon} from 'leaflet';
import {Poi} from '../models/Poi.model';
declare let L;

@Component({
  selector: 'zmzp-osm',
  templateUrl: './osm.component.html',
  styleUrls: ['./osm.component.css']
})
export class OsmComponent implements OnInit, OnChanges {

  map;
  @Input()
  poiList: Poi[];
  @Input()
  cords: { lat: number, long: number};
  constructor() { }

  ngOnChanges() {
    if (this.poiList && this.cords) {
      if (!this.map) {
        this.map = L.map('map').setView([this.cords.lat, this.cords.long], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
        if (this.poiList) {
          for (let i = 0, len = this.poiList.length; i < len; i++) {
            L.marker([this.poiList[i].latitude, this.poiList[i].longitude], {
              icon: icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: 'assets/marker-icon.png',
                shadowUrl: 'assets/marker-shadow.png'
              })
            }).addTo(this.map)
              .bindPopup(this.poiList[i].name + '<br>' + this.poiList[i].place_type.name);
          }
        }
      } else {
        this.map.setView([this.cords.lat, this.cords.long], 13);
      }
    }
  }


  ngOnInit() {

  }

}
