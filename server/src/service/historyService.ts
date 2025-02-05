import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('db/db.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }
  //TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
   async getCities(): Promise<City[]> {
    try {
      const data = await this.read();
      if (!data) return []; // Return empty array if file is empty
      const cities = JSON.parse(data);
      
      // Ensure it returns an array of City objects
      return Array.isArray(cities) ? cities.map(city => new City(city.name, city.id)) : [];
    } catch (error) {
      console.error("Error reading cities:", error);
      return [];
    }
  } 
    
   
  // TODO Define an addCity method that adds a city to the searchHistory.json file
   async addCity(cityName: string) : Promise<void> {
    try {
      const cities = await this.getCities();
      
      // Check for duplicates
      if (cities.some((city: City) => city.name.toLowerCase() === cityName.toLowerCase())) {
        console.log(`City "${cityName}" already exists.`);
        return;
      }
  
      // Create a new city and add to the array
      const newCity = new City(cityName, uuidv4());
      cities.push(newCity);
      
      // Write updated list back to file
      await this.write(cities);
      console.log(`City "${cityName}" added successfully.`);
    } catch (error) {
      console.error("Error adding city:", error);
    }
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file

  // async removeCity(id: string): Promise<void> {
  //   try {
  //     let cities = await this.getCities();
  //     const updatedCities = cities.filter((city: City) => city.id !== id);

  //     if (cities.length === updatedCities.length) {
  //       console.log(`City with ID "${id}" not found.`);
  //       return;
  //     }

  //     await this.write(updatedCities);
  //     console.log(`City with ID "${id}" removed successfully.`);
  //   } catch (error) {
  //     console.error("Error removing city:", error);
  //   }
  // }


  // async removeCity(id: string) {}
}

export default new HistoryService();
