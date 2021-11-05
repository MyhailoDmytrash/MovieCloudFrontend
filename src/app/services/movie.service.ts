import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Movie} from "../models/entities/Movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  protected baseURL = environment.serverURL + '/movie';
  constructor(protected http: HttpClient) { }

  public getAllMovies(): Observable<Array<Movie>>
  {
    return this.http.get(this.baseURL + '/all').pipe(map(data => {
      let movies = new Array<Movie>();

      Object.values(data).forEach(movieData => movies.push(new Movie(movieData)));

      return movies;
    }));
  }

  public addMovie(movie: Movie): Observable<Movie>
  {
    return this.http.post(this.baseURL + '/save', movie).pipe(map(data => {
      return new Movie(data);
    }));
  }

  public removeMovie(id: number): Observable<void>
  {
    return this.http.delete<void>(this.baseURL + '/remove/' + id, {});
  }

  public update(movie: Movie): Observable<Movie>
  {
    return this.http.post(this.baseURL + '/update', movie).pipe(map(data => {
      return new Movie(data);
    }));
  }

  public getById(id: number): Observable<Movie>
  {
    return this.http.get(this.baseURL + '/' + id).pipe(map(data => {
      return new Movie(data);
    }));
  }
}
