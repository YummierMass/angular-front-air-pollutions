import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {DataService} from "../data.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map: any;
  private points: any;

  private addMarker(code: any, lat: any, lng: any): void {
    L.circle([lat,lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 100
    }).bindPopup(code).openPopup().addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [52.237049, 21.017532],
      zoom: 3,
      preferCanvas: true
    });

    this.points.forEach((point: any[]) => {
      point.forEach((station: any) => {
        this.addMarker(station.name, station.gegrLat, station.gegrLon);
      })
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 6,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  constructor(service: DataService) {
    this.points = service.getStations();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
