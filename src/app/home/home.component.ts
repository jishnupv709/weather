import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  locationName:any;
  @ViewChild('selectedItemRef') selectedItemRef: NgSelectComponent | undefined;
  locations:any
  searchInput: any;

  constructor(private weatherService:WeatherService) { }
  
  ngOnInit(): void {
    this.getLocationInfo();
    
  }
  getLocationInfo(){
    if (this.selectedItemRef) {
      this.searchInput= this.selectedItemRef.searchInput.nativeElement.value;
      console.log('Selected Value:', this.searchInput);  // This will give you the selected value
    }
     this.weatherService.getLocation(this.searchInput).subscribe({

      next: (data) => {
        // Successfully received data
      this.locations = data.results.map((result: any) => {
        return {
          name: result.formatted, // You can also use other fields like city, country, etc.
          lat: result.geometry.lat,
          lon: result.geometry.lng
        };
      });
      },
      error: (error) => {
        // Handle any error while fetching data
        console.error('Error fetching locations:', error);
      },
    });
  }
  lat = 12.2557; lon = 75.1341; 
  getWeatherInfoBasedOnLocation(){
    this.lat=this.inputLatatitude;
    this.lon=this.inputLongitude;
  }
  inputLatatitude:any;
  inputLongitude:any
  onLocationChange(location:any){
    console.log("location",location)
    this.inputLatatitude=location.lat;
    this.inputLongitude=location.lon;
  }
}
