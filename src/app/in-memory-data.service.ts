import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: "vishwa" },
      { id: 2, name: "sai" },
      { id: 3, name: "raj" },
      { id: 4, name: "vinnu" },
      { id: 5, name: "harish" },
      { id: 6, name: "nani" },
      { id: 7, name: "sunny" },
      { id: 8, name: "bunny" },
      { id: 9, name: "addddf"},
      { id: 10,name: "uyyeh"}
    ];
    return { heroes };
  }
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map
      (hero => hero.id)) + 1 : 11;
  }
}
