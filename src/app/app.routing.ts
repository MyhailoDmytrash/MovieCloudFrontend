import {RouterModule, Routes} from "@angular/router";
import {MovieComponent} from "./components/movie/movie.component";
import {RatingComponent} from "./components/rating/rating.component";

const routs: Routes = [
  {path: "movies", component: MovieComponent},
  {path: "movie/:id", component: RatingComponent}
];

export const routeing = RouterModule.forRoot(routs);
