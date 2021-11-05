import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Reviewer} from "../models/entities/Reviewer";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewerService
{

  protected baseURL = environment.serverURL + '/reviewer';
  constructor(protected http: HttpClient) { }

  public create(reviewer: Reviewer): Observable<Reviewer>
  {
    return this.http.post(this.baseURL + "/create", reviewer).pipe(map(data => {
      return new Reviewer(data);
    }));
  }

  public getAll(): Observable<Array<Reviewer>>
  {
    return this.http.get(this.baseURL + '/all').pipe(map(data => {
      let reviewers = new Array<Reviewer>();

      Object.values(data).forEach(reviewerData => reviewers.push(new Reviewer(reviewerData)));

      return reviewers;
    }));
  }

  public getById(id: number): Observable<Reviewer>
  {
    return this.http.get(this.baseURL + '/' + id).pipe(map(data => {
      return new Reviewer(data);
    }));
  }
}
