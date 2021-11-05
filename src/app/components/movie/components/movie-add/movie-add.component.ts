import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {MovieService} from "../../../../services/movie.service";
import {Movie} from "../../../../models/entities/Movie";
import {SnackBarService} from "../../../../services/snack-bar.service";

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.scss']
})
export class MovieAddComponent implements OnInit {

  form: FormGroup;

  constructor(protected dialogRef: MatDialogRef<MovieAddComponent>,
              protected movieService: MovieService,
              protected snackBar: SnackBarService,
              @Inject(MAT_DIALOG_DATA) public movie?: Movie) { }

  ngOnInit(): void
  {
    this.form = new FormGroup({
      title: new FormControl(this.movie ? this.movie.title : '', [Validators.required]),
      imgURL: new FormControl(this.movie ? this.movie.imgURL : '', [Validators.required]),
      year: new FormControl(this.movie ? this.movie.year : '', [Validators.required]),
      director: new FormControl(this.movie ? this.movie.director : '', [Validators.required])
    });
  }

  onSubmit()
  {
    if(this.form.valid)
      this.dialogRef.close({'movie': new Movie(this.form.getRawValue())});
  }
}
