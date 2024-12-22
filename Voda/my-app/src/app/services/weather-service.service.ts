import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  private base_url = 'http://localhost:4454';
  
  constructor(private http: HttpClient) { }

  getCityForecast(cityId: number): Observable<any> {
    const forecast = this.http.get<any>(`${this.base_url}/cityForecast/${cityId}`);
    return forecast;
  }

  searchCityForecast(cityName: string): Observable<any> {
    const forecast = this.http.get<any>(`${this.base_url}/cityForecast/${cityName}`);
    return forecast;
  }

}
