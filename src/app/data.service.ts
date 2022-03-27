import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  readonly operationsUrl;

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.operationsUrl);
  }

  constructor(private http: HttpClient) {
    this.operationsUrl = 'http://localhost:8080/stations';
  }
}

export interface Station {
  addressStreet: string,
  city: City,
  id: number,
  gegrLat: string,
  gegrLon: string,
  stationName: string
  stIndex: StationIndex
}

interface City {
  id: number,
  name: string,
}

export interface StationIndex {
  id: number,
  name: string
}
