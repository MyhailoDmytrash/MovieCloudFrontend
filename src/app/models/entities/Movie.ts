export class Movie
{
  id: number;
  imgURL: string;
  title: string;
  year: number;
  director: string;


  constructor(data: any) {
    this.id = data.id;
    this.imgURL = data.imgURL;
    this.title = data.title;
    this.year = data.year;
    this.director = data.director;
  }

  public update(movie: Movie)
  {
    this.title = movie.title;
    this.imgURL = movie.imgURL;
    this.year = movie.year;
    this.director = movie.director;

  }
}
