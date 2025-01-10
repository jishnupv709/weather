import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

// Define the base URL for the OpenWeatherMap API
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const GEO_URL = 'https://api.opencagedata.com/geocode/v1/json';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string = environment.OpenWeatherAPIKey; // Replace with your actual OpenWeatherMap API key
  

  constructor(private http: HttpClient) { }

   // Method to get weather forecast based on lat and lon
  getWeatherForecast(lat: number, lon: number): Observable<any> {
    const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`; // Units in metric (Celsius)
    return this.http.get<any>(url);
  }
  getLocation(location: string): Observable<any> {
    const url = `${GEO_URL}?q=${location}&key=fd348f065d034b4a9aeee3b9a769b478`;
    return this.http.get<any>(url);
  }
}
