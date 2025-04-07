import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerieService } from './service/serie.service';
import { Episode, Episodes, Serie } from './interface/serie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  constructor(private readonly serieService: SerieService, private route: ActivatedRoute) {}

  serieName!: string 
  serie$: Serie[] = []

  totalSeasonsValue!: number 
  totalSeasons$: number[] = [] 
  
  season$: Episodes[] = []
  episodes$: any[] = []
  episode$: Episode[] = []

  requestStatus!: string
  errorIcon: string = environment.customIcon
  svgPath: string = environment.filesPath
  
  ngOnInit(): void {
    //* Obtiene el parámetro de la ruta, si viene vacío se asigna un valor predeterminado
    this.route.queryParams.subscribe(params => { this.serieName = params['serie'] })
    if(this.serieName === undefined || this.serieName === null || this.serieName === '') {
      this.serieName = 'Blue Eye Samurai'
    }
    this.getSerieDetails()
  }

  /* Obtiene el valor que llega del input */
  getSerieParam(name: string) {
    this.serieName = name
    this.getSerieDetails()
  }

  /* Se obtiene la serie de acuerdo al nombre */
  getSerieDetails() {
    this.serie$ = [], this.totalSeasons$ = [], this.episodes$ = [], this.episode$ = [], this.season$ = []
    this.requestStatus = ''

    this.serieService.getSerieByName(this.serieName)
      .subscribe((res: any) => {        
        if(res.Response === 'True' && this.serieName && !this.serieName.includes('undefined')) {
          this.totalSeasonsValue = res.totalSeasons
          for (let i = 1; i <= this.totalSeasonsValue; i++) {
            this.totalSeasons$.push(i)
          }
          this.serie$.push(res)
        } else {
          this.responseStatus(this.serieName)
        }
      })
  }

  /* Obtener la season seleccionada y los datos de esta */
  getSelectedSeason(season: number) {
    this.season$ = [], this.episodes$ = [], this.episode$ = []

    this.serieService.getEpisodesBySeason(this.serieName, season)
      .subscribe((res: any) => {
        if(res.Response === 'True') { 
          this.season$.push(res)          
          //* Se inyecta la interface 'Episodes[]' de la respuesta en el array
          res.Episodes.forEach((episode: any) => {
            this.episodes$.push(episode)  
          });
        } else { 
          this.responseStatus(this.serieName)
        }        
      })
  }

  /* Obtener datos del episodio seleccionado */
  getSelectedEpisode(season: string, episode: number) {  
    this.episode$ = []

    this.serieService.getEpisodeDataBySeason(this.serieName, season, episode)
      .subscribe((res: any) => {
        res.Response === 'True' ? this.episode$.push(res) : this.responseStatus(this.serieName)
      })     
  }

  /* Si la petición falla o si el nombre que se recibe viene vacío */
  responseStatus(nameValue: string) {
    this.serie$ = []
    this.requestStatus = !nameValue || nameValue === undefined ? `${environment.emptyParam}` : `${environment.paramNotFound}`
  }
  
  /* Limpiar tabla de episodios por temporada */
  clearContent() {
    this.season$ = [] 
    this.episode$ = []
  }
}