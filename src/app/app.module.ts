import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {routeing} from "./app.routing";
import {MovieComponent} from './components/movie/movie.component';
import {MoviePreviewComponent} from './components/movie/components/movie-preview/movie-preview.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MovieAddComponent } from './components/movie/components/movie-add/movie-add.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { RatingComponent } from './components/rating/rating.component';
import { ReviewerCreatePopupComponent } from './components/rating/components/reviewer-create-popup/reviewer-create-popup.component';
import { RatingCreatePopupComponent } from './components/rating/components/rating-create-popup/rating-create-popup.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MoviePreviewComponent,
    MovieAddComponent,
    RatingComponent,
    ReviewerCreatePopupComponent,
    RatingCreatePopupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routeing,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
