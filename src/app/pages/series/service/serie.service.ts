import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Episode, Episodes, Serie } from '../interface/serie';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private readonly http: HttpClient) { }
  
  getSerieByName(serieName: string) {
    return this.http.get<Serie>(`${environment.url}/?t=${serieName}&apikey=${environment.key}`)
  }

  getEpisodesBySeason(serieName: string, season: number) {
    return this.http.get<Episodes>(`${environment.url}/?t=${serieName}&season=${season}&apikey=${environment.key}`)
  }

  getEpisodeDataBySeason(serieName: string, season: string, episode: number) {
    return this.http.get<Episode>(`${environment.url}/?t=${serieName}&Season=${season}&Episode=${episode}&apikey=${environment.key}`)
  }
}
