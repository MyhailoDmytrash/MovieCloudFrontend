import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../models/entities/Movie";
import {ReviewerService} from "../../services/reviewer.service";
import {MatDialog} from "@angular/material/dialog";
import {ReviewerCreatePopupComponent} from "./components/reviewer-create-popup/reviewer-create-popup.component";
import {RatingCreatePopupComponent} from "./components/rating-create-popup/rating-create-popup.component";
import {RatingService} from "../../services/rating.service";
import {Rating} from "../../models/entities/Rating";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  movie: Movie;
  ratings = new Array<Rating>();

  tableRows = ['id', 'reviewer', 'star', 'ratingDate'];

  @ViewChild(MatTable)
  table: MatTable<Rating>;

  constructor(protected movieService: MovieService,
              protected activatedRoute: ActivatedRoute,
              protected reviewerService: ReviewerService,
              protected ratingService: RatingService,
              protected dialog: MatDialog) { }

  ngOnInit(): void
  {
    this.activatedRoute.params.subscribe(params => {
      this.movieService.getById(params['id']).subscribe(movie => {
        this.movie = movie;

        this.ratingService.getByMovieId(movie.id).subscribe(ratings =>{
          ratings.forEach(ratingItem => {

            this.reviewerService.getById(ratingItem.reviewerId).subscribe(reviewer => {
              ratingItem.reviewer = reviewer;
              this.ratings.push(ratingItem);
              this.table.renderRows();
            })
          });
        });

      });
    })

  }

  createReviewer(): void
  {
    this.dialog.open(ReviewerCreatePopupComponent, {width: '250px'}).afterClosed().subscribe(data => {
      if(data.reviewer)
        this.reviewerService.create(data.reviewer).subscribe();
    });
  }

  createRating(): void
  {
    this.dialog.open(RatingCreatePopupComponent, {width: '250px'}).afterClosed().subscribe(data => {
      if(data.rating)
      {
        data.rating.movieId = this.movie.id;
        this.ratingService.save(data.rating).subscribe(rating => {
          this.reviewerService.getById(rating.reviewerId).subscribe(reviewer => {
            rating.reviewer = reviewer;

            let existsRating = this.ratings.find(ratingsItem => ratingsItem.reviewerId === rating.reviewerId);

            if(existsRating)
              this.ratings.splice(this.ratings.indexOf(existsRating), 1);

            this.ratings.push(rating);
            this.table.renderRows();
          });
        });
      }
    });
  }

  getMiddleRating(): number
  {
    let ratingSum: number = 0;

    this.ratings.forEach(rating => ratingSum += rating.star);

    return ratingSum / this.ratings.length;
  }
}
