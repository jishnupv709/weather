import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {


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
  firstforecastTime:any;
  forecastListGroupedData:any;


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
          this.forecastListGroupedData = this.groupByDate(this.weatherData.list);
          this.locationInfo =data.city;
          console.log("forecastListGroupedData",this.forecastListGroupedData)
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
  


  groupByDate(data: any[]): any[] {
    const grouped: { [key: string]: any[] } = {};

    data.forEach(item => {
      const date = item.dt_txt.split(' ')[0]; // Extract date part
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });

    // Convert grouped object into an array of objects
    return Object.keys(grouped).map(date => ({
      date,
      entries: grouped[date]
    }));
  }


  // Dummy data for a week's weather forecast
  weeklyWeather: any[] = [
    {
      day: 'Sun',
      date: '22 Dec',
      weather: 'Sunny',
      temp: { min: 15, max: 22 },
      sunrise: '7:00 AM',
      sunset: '5:00 PM',
    },
    {
      day: 'Mon',
      date: '23 Dec',
      weather: 'Cloudy',
      temp: { min: 12, max: 20 },
      sunrise: '7:01 AM',
      sunset: '5:01 PM',
    },
    {
      day: 'Tue',
      date: '24 Dec',
      weather: 'Rainy',
      temp: { min: 14, max: 18 },
      sunrise: '7:02 AM',
      sunset: '5:02 PM',
    },
    {
      day: 'Wed',
      date: '25 Dec',
      weather: 'Sunny',
      temp: { min: 16, max: 23 },
      sunrise: '7:03 AM',
      sunset: '5:03 PM',
    },
    {
      day: 'Thu',
      date: '26 Dec',
      weather: 'Cloudy',
      temp: { min: 11, max: 21 },
      sunrise: '7:04 AM',
      sunset: '5:04 PM',
    },
    {
      day: 'Fri',
      date: '27 Dec',
      weather: 'Rainy',
      temp: { min: 10, max: 19 },
      sunrise: '7:05 AM',
      sunset: '5:05 PM',
    },
    {
      day: 'Sat',
      date: '28 Dec',
      weather: 'Sunny',
      temp: { min: 13, max: 24 },
      sunrise: '7:06 AM',
      sunset: '5:06 PM',
    },
  ];


}
