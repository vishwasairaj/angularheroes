import { Injectable, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HeroesComponent } from './heroes/heroes.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) {

  }

  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    let heroes = this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
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
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  getHero(id: number): Observable<Hero> {
    const Url = `${this.heroesUrl}/ ${id}`;
    return this.http.get<Hero>(Url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?
    name= ${term}`).pipe(
      tap(X => X.length ?
        this.log(`found heroes matching "${term}"`):
        this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero,
      this.httpOptions).pipe(
        tap((newHero: Hero) => this.log(`addedhero w/
        id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))

      );
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero,
      this.httpOptions).pipe(
        tap(_=> this.log(`updated Hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
   }
   deleteHero(id: number): Observable<Hero> {
     const url = `${this.heroesUrl}/${id}`;
     return this.http.delete<Hero>(url, this.httpOptions).pipe(
       tap(_=> this.log(`deleted hero id = ${id}`)),
       catchError(this.handleError<Hero>('deletedHero'))
       );
   }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}