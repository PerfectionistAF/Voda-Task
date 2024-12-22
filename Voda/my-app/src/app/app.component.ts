import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from './services/weather-service.service';


const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'Toronto',
  'London', 'Paris', 'Tokyo', 'Sydney', 'Beijing'];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  
  city: string = '';

  forecasts: any[] = [];  ///array of forecasts per city
  searchCityName: string = '';
  filterDate: string = '';
  filteredForecasts: any[] = [];

  constructor(private weatherService: WeatherServiceService) {}

  ngOnInit() {
    this.getCityForecast(2); //Test with ids //1 is home
  }

  getCityForecast(cityId: number) {
    this.weatherService.getCityForecast(cityId).subscribe(
      data => {
        this.city = data.city;
        this.forecasts = data.forecast;
        this.filteredForecasts = this.forecasts;

      },
      error => {
        console.error('Error fetching city forecast', error);
      }
    );
  }

  searchByCityName(searchCityName: string) {
    /*if(this.searchCityName in cities) {
      this.getCityForecast(cities.indexOf(this.searchCityName) + 1);
    }
      else{
        console.log('City not found, please try again');
      }*/
        this.weatherService.searchCityForecast(searchCityName).subscribe(
          data => {
            this.city = data.city;
            this.forecasts = data.forecast;
            this.filteredForecasts = this.forecasts;
          },
          error => {
            console.error('Error fetching city forecast', error);
          }
        );
  }


  selectCity(cityName: string) {
    this.searchByCityName(cityName);
  }


  filterByDate() {
    if (this.filterDate) {
      this.filteredForecasts = this.forecasts.filter(forecast => forecast.date === this.filterDate);
    } else {
      this.filteredForecasts = this.forecasts;
    }
  }

}
