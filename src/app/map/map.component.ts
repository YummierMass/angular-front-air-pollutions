import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {DataService} from "../data.service";
import {StationIndex} from "../data.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map: any;
  private points: any;
  private fillColor: any;

  private selectColor(stIndex: StationIndex): void {
    // this.fillColor = '#f03';
    let stIndexId: number;

    if (stIndex){
      stIndexId = stIndex.id;
    }
    else{
      stIndexId = -2;
    }

    if (stIndexId == 0){
      this.fillColor = '#34640d'
    }
    else if (stIndexId == 1){
      this.fillColor = '#b1ec4a'
    }
    else if (stIndexId == 2){
      this.fillColor = '#e8d927'
    }
    else if (stIndexId == 3){
      this.fillColor = '#e58100'
    }
    else if (stIndexId == 4){
      this.fillColor = '#f03'
    }
    else {
      this.fillColor = '#000000';
    }
  }

  private addMarker(code: any, lat: any, lng: any): void {
    L.circle([lat,lng], {
      color: this.fillColor,
      fillOpacity: 0.5,
      radius: 200
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
        this.selectColor(station.stIndex);
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
