import { Component, OnInit } from '@angular/core';
import {Movie} from "../../models/entities/Movie";
import {MovieService} from "../../services/movie.service";
import {MatDialog} from "@angular/material/dialog";
import {MovieAddComponent} from "./components/movie-add/movie-add.component";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  readonly movies: Array<Movie> = new Array<Movie>();

  constructor(protected movieService: MovieService,
              protected dialog: MatDialog,
              protected snackBar: SnackBarService) { }

  ngOnInit(): void
  {
    this.movieService.getAllMovies().subscribe(movies => movies.forEach(movie => this.movies.push(movie)));
  }

  addMovie()
  {
    const dialog = this.dialog.open(MovieAddComponent, {width: '250px'});
    dialog.afterClosed().subscribe(data => {

      if(data.movie)
        this.movieService.addMovie(new Movie(data.movie)).subscribe({
          next: movie =>{
            this.snackBar.printOk("Movie added");
            this.movies.push(movie);
          },
          error: data =>{
            this.snackBar.printError(data.error);
          }
        });
    })
  }

  removeMovie(movie: Movie): void
  {
    this.movies.splice(this.movies.indexOf(movie), 1);
  }
}
