import {Reviewer} from "./Reviewer";

export class Rating
{
  id: number;
  movieId: number;
  reviewerId: number;
  reviewer?: Reviewer;
  star: number;
  ratingDate: Date;

  constructor(data: any) {
    this.id = data.id;
    this.movieId = data.movieId;
    this.reviewerId = data.reviewerId;

    if(data.reviewer)
      this.reviewer = new Reviewer(data.reviewer);

    this.star = data.star;
    this.ratingDate = data.ratingDate;
  }
}
