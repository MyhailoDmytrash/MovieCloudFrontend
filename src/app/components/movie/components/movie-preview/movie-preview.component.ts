import {Component, Host, Input, OnInit} from '@angular/core';
import {Movie} from "../../../../models/entities/Movie";
import {MatDialog} from "@angular/material/dialog";
import {MovieService} from "../../../../services/movie.service";
import {SnackBarService} from "../../../../services/snack-bar.service";
import {MovieComponent} from "../../movie.component";
import {MovieAddComponent} from "../movie-add/movie-add.component";

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent implements OnInit {

  @Input()
  public movie: Movie;

  constructor(protected dialog: MatDialog,
              protected movieService: MovieService,
              protected snackBar: SnackBarService,
              @Host() private parentComponent?: MovieComponent) { }

  ngOnInit(): void {}

  onUpdate(): void
  {
    const dialog = this.dialog.open(MovieAddComponent, {width: '250px', data: this.movie});

    dialog.afterClosed().subscribe(data =>{
      if(data.movie)
      {
        data.movie.id = this.movie.id;
        this.movieService.update(data.movie).subscribe({
          next: movie =>{
            this.movie.update(movie);
            this.snackBar.printOk("Movie has updated");
          },
          error: data => {
            console.log(data)
            this.snackBar.printError(data.error);
          }
        });
      }
    })
  }

  onRemove(): void
  {
    this.movieService.removeMovie(this.movie.id).subscribe({
      next: ignore => {
        this.parentComponent?.removeMovie(this.movie);
        this.snackBar.printOk("Movie has removed");
      },
      error: data => {
        this.snackBar.printError(data.error);
      }
    })
  }
}
