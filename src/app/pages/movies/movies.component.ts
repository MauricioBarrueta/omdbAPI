import { Component } from '@angular/core';
import { MovieService } from './service/movie.service';
import { Movie } from './interface/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  constructor(private movieService: MovieService) {}

  movieData: Movie[] = [] 
  requestStatus!: string
  
  getMovieNameValue(name: string) {  
    this.movieData = []  
    this.requestStatus = ''
    this.movieService.getMovieByName(name)  
      .subscribe((res: any) => {
        res.Response === 'True' && name ? this.movieData.push(res) : this.responseError(name)        
      })    
  }

  /* Si la respuesta devuelve un 'False' o el valor de 'name' viene vacío */
  responseError(nameValue: string) {
    this.movieData = [] 
    this.requestStatus = !nameValue ? 'No has ingresado ninguna película para buscar...' : 'No existe ninguna película con este nombre' 
  }
}
