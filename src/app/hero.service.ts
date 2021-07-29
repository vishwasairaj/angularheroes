import { Injectable, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class HeroService  {
  name: string = "vishwa"
  constructor(private mesageService: MessageService, private heroservice: HeroService) { }
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.mesageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getName() {
    return this.name
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

}
