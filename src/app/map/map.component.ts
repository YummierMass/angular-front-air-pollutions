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

  // private addMarker(code: any, lat: any, lng: any): void {
  //   var c = L.circle([lat,lng], {
  //     color: 'red',
  //     fillColor: '#f03',
  //     fillOpacity: 0.5,
  //     radius: 0
  //   }).addTo(this.map);
  // }

  private initMap(): void {
    this.map = L.map('map', {
      center: [52.237049, 21.017532],
      zoom: 3,
      preferCanvas: true
    });
    let points = [
      ["Szczecin", 53.428543, 14.552812],
      ["Gdańsk", 54.372158, 18.638306],
      ["Kraków", 50.049683, 19.944544]
    ];
    // console.log(this.points);
    console.log(this.points);
    console.log(points);
    console.log(typeof(this.points));
    console.log(typeof(points));
    this.points.forEach((point: any[]) => {
      console.log(point);
      L.marker([point[1], point[2]], {
      }).addTo(this.map);//.bindPopup('marker ' + i);
      // L.circle([point[1],point[2]], {
      //   color: 'red',
      //   fillColor: '#f03',
      //   fillOpacity: 0.5,
      //   radius: 0
      // }).addTo(this.map);
      // this.addMarker(point[0], point[1], point[2]);
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 6,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  constructor(service: DataService) {
    this.points = [];
    service.getStations().subscribe(data => {
      data.forEach(point => {
        this.points.push([point.city.name, Number(point.gegrLat), Number(point.gegrLon)]);
      });
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
