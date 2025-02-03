//import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
// interface Coordinates {
//   name: string;
//   lat: number;
//   lon: number;
//   country: string;
//   state: string;
// }
  interface TestCity {
    id: number;
    name: string;
    coord:{lat: number, lon: number};
    country?: string;
  }

  interface List {
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
        main: string,
        description: string,
        icon: string
              } [];
    wind: {speed: number,};
    dt_txt: string;
   }
// TODO: Define a class for the Weather object
// class Weather {
//   city: string;
//   date:  string;
//   tempF: number;
//   windSpeed: number;
//   humidity: number;
//   icon: string;
//   iconDescription: string;
//   constructor(
//     city: string,
//     date: string,
//     tempF: number,
//     windSpeed: number,
//     humidity: number,
//     icon: string,
//     iconDescription: string
//   ) {
//     this.city = city;
//     this.date = date;
//     this.tempF = tempF;
//     this.windSpeed = windSpeed;
//     this.humidity = humidity;
//     this.icon = icon;
//     this.iconDescription = iconDescription;
//   }
// }

// TODO: Complete the WeatherService class
class WeatherService {

  private baseURL?: string;

  private apiKey?: string;

   city?: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';

    this.apiKey = process.env.API_KEY || '';

    //this.city = '';

  }

  // * Note: The following methods are here as a guide, but you are welcome to provide your own solution.
  // * Just keep in mind the getWeatherForCity method is being called in your
  // * 09-Servers-and-APIs/02-Challenge/Develop/server/src/routes/api/weatherRoutes.ts file

  // * the array of Weather objects you are returning ultimately goes to
  // * 09-Servers-and-APIs/02-Challenge/Develop/client/src/main.ts

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  //fetch request with city name
  async getWeatherForCity(city: string) {
    //console.log(city)
    this.city = city
    try {
      const responseStuff = await fetch(`${this.baseURL}/data/2.5/forecast?q=${this.city}&units=imperial&appid=${this.apiKey}`)

      //wResponse contains an object that has three properties: cod (200, 300, 400 etc), message(i dont know what that does, possible the code message), cnt(don't know what that is either) and the list property that is used in the testFunction array of objects and a city object at the end of it.
      const wResponse = await responseStuff.json()

      const testForecast: List[] = wResponse.list ?? [];
      //testForecast contains the list property from the wResponse, in the list is an array of all the objects. use brakets then dot notation to access the specific object then the property on that object.

      // for (let index = 0; index < wResponse.list.length; index++) {
      //   testForecast.push(wResponse.list[index]); 
      // }
      
      //cityObject contains an object that has the name of the city the lat and lon and the country.
      const cityObject: TestCity = wResponse.city

      
      console.log(wResponse)
     
      console.log(cityObject)
      
      console.log(testForecast[0])
       
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }

   
  }

}

//fetch(`${this.baseURL}api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`)
export default new WeatherService();
