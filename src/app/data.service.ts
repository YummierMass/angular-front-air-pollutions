import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    this.operationsUrl = 'http://127.0.0.1:5000/api/all';
  }
}

export interface Station {
  addressStreet: string,
  city: City,
  id: number,
  gegrLat: string,
  gegrLon: string,
  stationName: string
}

interface City {
  id: number,
  name: string,
}
