import { Injectable, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class HeroService  {
  
  constructor(private messageService: MessageService) { }
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  
  // this is about promises

  // getMyfirstName(): Promise<string> {
  //   let name = 'empty';
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       name = 'harish';
  //       console.log(name)
  //       resolve(name)
  //     }, 4000);
  //   })
  // }

  // getMyLastName(): Promise<string> {
  //   let name = 'empty';
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       name = 'konda';
  //       console.log(name)
  //       resolve(name)
  //     }, 2000);
  //   })
  // }

  // getAddress(): Promise<string> {
  //   let name = 'empty';
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       name = 'metpally';
  //       console.log(name)
  //       resolve(name)
  //     }, 4000);
  //   })
  // }

  // getMyName(): Observable<string>{
  //   let name = 'empty';
  //   return  new Observable(observer =>{
  //     setInterval(() => {
  //       name = 'harish'
  //       observer.next(new Date().toISOString())
  //     }, 4000)
  //   })
  // }


getHero(id: number): Observable<Hero> {
  const hero = HEROES.find(h => h.id ===id)!;
  this.messageService.add('HeroService: fetched hero id=${id})`; ');
  return of(hero);
}
}