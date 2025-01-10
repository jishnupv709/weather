import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { WeatherCard2Component } from './weather-card2/weather-card2.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirect default route to /weather
  { path: 'weather', component: WeatherCardComponent }, 
  { path: 'weather2', component: WeatherCard2Component }, 
  { path: 'home', component: HomeComponent }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
