import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Rating} from "../models/entities/Rating";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  protected baseURL = environment.serverURL + '/rating';
  constructor(protected http: HttpClient) { }


  public save(rating: Rating): Observable<Rating>
  {
    return this.http.post(this.baseURL + '/save', rating).pipe(map(data => {
      return new Rating(data);
    }));
  }

  public getByMovieId(movieId: number): Observable<Array<Rating>>
  {
    return this.http.get(this.baseURL + '/get/by-movie-id/' + movieId).pipe(map(data => {
      let ratings = new Array<Rating>();

      Object.values(data).forEach(ratingData => ratings.push(ratingData));

      return ratings;
    }));
  }
}
