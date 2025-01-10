import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  weatherData: any = null;  // To store the weather data
  forecastList: any = null;  // To store the weather data
  locationInfo: any = null;  // To store the weather data
  loading: boolean = false;  // To indicate loading state
  error: string = '';  // To store error messages
  firsttemp:any;
  firstfeelsLike:any;
  firstweatherMain:any;
  firstweatherDescription:any;
  firstwindSpeed:any;
  firstwindDirection:any;
  firstforecastTime:any


  @Input() lat: number | undefined;  // Input to receive latitude
  @Input() lon: number | undefined;  // Input to receive longitude

  constructor(private weatherService:WeatherService) { }

 
  ngOnInit(): void {
    this.getWeatherData(this.lat, this.lon);  // Call the method with lat and lon
  }
  
  // ngOnChanges will be called when lat or lon changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lat'] || changes['lon']) {
      console.log('Location changed:', this.lat, this.lon);
      // Call the function to fetch weather data or any other function
      this.getWeatherData(this.lat, this.lon);
    }
  }
  getWeatherData(latitude:any,longitude:any): void {

    this.loading = true;  // Set loading to true while the API call is being made
    this.weatherService.getWeatherForecast(latitude, longitude).subscribe({
      next: (data) => {
        this.weatherData = data;  // Store the response in weatherData
        this.forecastList = this.weatherData.list
        this.locationInfo =data.city;
        console.log("data",data)
// 

        // Example: Extracting weather data for the first forecast item
        const firstForecast = this.forecastList[0];

        // Temperature and feels like
        this.firsttemp = firstForecast.main.temp; // Temperature in Kelvin
        this.firstfeelsLike = firstForecast.main.feels_like; // Feels like in Kelvin

        // Weather description
        this.firstweatherDescription = firstForecast.weather[0].description;
        this.firstweatherMain = firstForecast.weather[0].main;

        // Wind speed and direction
        this.firstwindSpeed = firstForecast.wind.speed;
        this.firstwindDirection = firstForecast.wind.deg;

        // Cloud coverage
        // const cloudCoverage = firstForecast.clouds.all;

        // Rain in the last 3 hours (if available)
        // const rainVolume = firstForecast.rain ? firstForecast.rain['3h'] : 0;

        // Format the date/time of the forecast
        this.firstforecastTime = firstForecast.dt_txt;
// 
        this.loading = false;  // Set loading to false once the data is received
      },
      error: (err) => {
        this.error = 'Error fetching weather data. Please try again later.';  // Handle errors
        this.loading = false;  // Set loading to false on error
      }
    });
  }

  dynamicTimezone(timezone: number): string {
    // Convert seconds to hours and minutes
    const hours = Math.floor(timezone / 3600);
    const minutes = Math.abs(Math.floor((timezone % 3600) / 60));
  
    // Determine if the timezone is positive or negative
    const sign = hours >= 0 ? '+' : '-';
  
    // Format the timezone string as UTC±X:XX
    return `UTC${sign}${Math.abs(hours)}:${minutes < 10 ? '0' + minutes : minutes}`;
  }
  
}
