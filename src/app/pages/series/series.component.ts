import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerieService } from './service/serie.service';
import { Episode, Episodes, Serie } from './interface/serie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit, OnDestroy {

  constructor(private readonly serieService: SerieService, private route: ActivatedRoute, private renderer: Renderer2) {}

  @ViewChild('card') serieCard!: ElementRef
  @ViewChild('episode') episodeCard!: ElementRef
  @ViewChild('episodesList') episodes!: ElementRef

  serieName!: string 
  serie$: Serie[] = []

  totalSeasonsValue!: number 
  totalSeasons$: number[] = [] 
  
  season$: Episodes[] = []
  episodes$: any[] = []
  episode$: Episode[] = []

  requestStatus!: string
  svgPath: string = environment.filesPath
  
  ngOnInit(): void {
    //* Obtiene el parámetro de la ruta, si viene vacío se asigna un valor predeterminado
    this.route.queryParams.subscribe(params => { this.serieName = params['show'] })
    if(this.serieName === undefined || this.serieName === null || this.serieName === '') {
      this.serieName =  'Blue Eye Samurai'
    }
    this.getSerieDetails()
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'overflow')
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

  /* Obtiene la lista de episodios de la temporada seleccionada */  
  getSelectedSeason(season: number) {
    this.season$ = [], this.episodes$ = [], this.episode$ = []

    this.serieService.getEpisodesBySeason(this.serieName, season)
      .subscribe((res: any) => {
        if (res.Response === 'True') {
          this.season$.push(res)
          //* Se inyecta la interface 'Episodes[]' de la respuesta en el array
          res.Episodes.forEach((episode: any) => {
            this.episodes$.push(episode)
          });
          setTimeout(() => {
            this.episodes.nativeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          });
        } else {
          this.responseStatus(this.serieName)
        }
      });
  }

  /* Controla si el scroll del navegador se muestra o no, se oculta cuando se muestran los detalles del episodio */
  toggleBodyScroll() {
    let overflowValue = this.episode$.length > 0 ? 'hidden' : 'auto'
    this.renderer.setStyle(document.body, 'overflow', overflowValue)
  }

  /* Obtiene los datos del episodio seleccionado */
  getSelectedEpisode(season: string, episode: number) {  
    this.episode$ = []

    this.serieService.getEpisodeDataBySeason(this.serieName, season, episode)
      .subscribe((res: any) => {
        if (res.Response === 'True') {
          this.episode$.push(res)
          setTimeout(() => {
            this.toggleBodyScroll()
            this.episodeCard.nativeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });      
          });
        } else {
          this.responseStatus(this.serieName)
        }
      });
  }

  /* Alterna el color por columnas cada 4 episodios, considerando filas de impares y pares */
  getEpisodeClass(epNumber: number): string {
    const isOdd = epNumber % 2 !== 0
    const expected = isOdd ? 1 : 2
    return epNumber % 4 === expected ? 'odd' : 'even'
  }

  /* Si la petición falla o si el nombre que se recibe viene vacío */
  responseStatus(nameValue: string) {
    this.serie$ = []
    this.requestStatus = !nameValue || nameValue === undefined ? `${environment.emptyParam}` : `${environment.paramNotFound}`
  }

  /* Se ocultan los detalles del episodio y se vuelve a mostrar la lista de episodios */
  clearEpisode() {
    this.episode$ = []
    this.toggleBodyScroll()
    setTimeout(() => {
      this.episodes.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
  
  /* Limpiar tabla de episodios por temporada */
  clearContent() {
    this.season$ = [], this.episode$ = []  
    setTimeout(() => {
      this.toggleBodyScroll()
      this.serieCard.nativeElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    });     
  }  
}