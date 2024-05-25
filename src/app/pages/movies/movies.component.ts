import { Component, OnInit } from '@angular/core';
import { MovieService } from './service/movie.service';
import { Movie } from './interface/movie';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['../../app.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  movieNameParam!: string
  movie$: Movie[] = [] 
  requestStatus!: string

  ngOnInit(): void {
    //* Obtiene el parámetro de la ruta, si viene vacío se asigna un valor predeterminado a la variable
    this.route.queryParams.subscribe(params => { this.movieNameParam = params['movie'] });
    if(this.movieNameParam === undefined || this.movieNameParam === null || this.movieNameParam === '') {
      this.movieNameParam = 'Inglourious Basterds'
    }
    this.getMovieDetails()
  }
  
  /* Obtiene los datos de la película de acuerdo al nombre */
  getMovieDetails() {  
    this.requestStatus = ''
    this.movie$ = []
      this.movieService.getMovieByName(this.movieNameParam)  
      .subscribe((res: any) => {
        res.Response === 'True' && this.movieNameParam ? this.movie$.push(res) : this.responseError(this.movieNameParam)     
      })     
  }

  /* Obtiene el valor que llega del elemento input */
  getMovieParam(name: string) {
    this.movieNameParam = name
    this.getMovieDetails()    
  }

  /* Muestra un mensaje dependiendo la respuesta de la petición */
  responseError(nameValue: string) {
    this.movie$ = [] 
    this.requestStatus = !nameValue || nameValue === undefined ? `${environment.movieParamEmpty}` : `${environment.movieNotFound}` 
  }
}
