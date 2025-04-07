import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../interface/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private readonly http: HttpClient) {}  

  getMovieByName(movieName: string) {
    return this.http.get<Movie>(`${environment.url}/?t=${movieName}&apikey=${environment.key}`)
  }
}