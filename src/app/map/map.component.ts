import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {DataService, Station} from "../data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map: any;
  private points: any;

  private greenIcon = L.icon({ //add this new icon
    iconUrl: 'https://img.icons8.com/plumpy/344/sensor.png',
    iconSize: [38, 38], // size of the icon
  });

  private addMarker(code: any, lat: any, lng: any): void {
    var p = L.marker([lat,lng]).setIcon(this.greenIcon);
    p.bindPopup(code);
    p.addTo(this.map);
    var c = L.circle([lat,lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 0
    }).addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [52.237049, 21.017532],
      zoom: 3
    });

    let points = [
      ["Szczecin", 53.428543, 14.552812],
      ["Gdańsk", 54.372158, 18.638306],
      ["Kraków", 50.049683, 19.944544]
    ];

    for (let i = 0; i < points.length; i++) {
      this.addMarker(points[i][0], points[i][1], points[i][2]);
    }

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 6,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  constructor(service: DataService) {
    this.points = service.getStations().subscribe(data => {
      console.log(data);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
