import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SerieService } from './service/serie.service';
import { Episode, Episodes, Serie } from './interface/serie';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent {

  constructor(private readonly serieService: SerieService, private router: Router) {}

  serieName!: string /* Recibe el valor enviado desde el header */
  serieData: Serie[] = []
  totalSeasonsValue!: number 
  totalSeasonsArray: number[] = [] 

  seasonData: Episodes[] = []
  episodesList: any[] = []

  episodeData: Episode[] = []

  requestResponse!: string

  /* Obtener datos generales de la serie */
  getSerieNameValue(name: string) {
    this.serieData = []
    this.requestResponse = ''
    this.serieService.getSerieByName(name)
      .subscribe((res: any) => {        
        if(res.Response === 'True' && name) {
          this.serieName = name
          this.totalSeasonsValue = res.totalSeasons
          for (let i = 1; i <= this.totalSeasonsValue; i++) {
            this.totalSeasonsArray.push(i)
          }
          this.serieData.push(res)
        } else {
          this.serieName = ''
          this.responseStatus(name)
        }
      })
  }

  /* Obtener la season seleccionada y los datos de esta */
  getSelectedSeason(season: number) {
    this.seasonData = []
    this.episodesList = []
    this.episodeData = []
    this.serieService.getEpisodesBySeason(this.serieName, season)
      .subscribe((res: any) => {
        if(res.Response === 'True') { 
          this.seasonData.push(res)          
          /* Se inyecta la interface 'Episodes[]' de la respuesta en el array local  */
          res.Episodes.forEach((element: any) => {
            this.episodesList.push(element)  
          });
        } else { 
          this.responseStatus(this.serieName)
        }        
      })
  }

  /* Obtener datos del episodio seleccionado */
  getSelectedEpisode(season: string, episode: number) {  
    this.episodeData = []
    this.serieService.getEpisodeDataBySeason(this.serieName, season, episode)
      .subscribe((res: any) => {
        res.Response === 'True' ? this.episodeData.push(res) : this.responseStatus(this.serieName)
      })
  }

  /* Si la petición falla o si el nombre que se recibe viene vacío */
  responseStatus(nameValue: string) {
    this.serieData = []
    this.requestResponse = !nameValue ? 'No haz ingresado ninguna serie' : 'No existe ninguna serie con este nombre'
  }
  
  /* Limpiar tabla de episodios por temporada */
  clearContent() {
    this.seasonData = [] 
    this.episodeData = []
  }
}