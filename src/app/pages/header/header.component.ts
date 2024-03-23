import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  placeholderValue: string = 'Ingresa el nombre de la película:'

  movieName!: string
  @Output() nameValueEmitter = new EventEmitter<string>()

  ngOnInit() {
    this.setMovieValue()
  }

  setMovieValue(): void {
    this.nameValueEmitter.emit(this.movieName)
  }

  redirectTo(path: string) {  
    this.movieName = ''
    this.placeholderValue = path == 'movies' ? 'Ingresa el nombre de la película:' : 'Ingresa el nombre de la serie, caricatura, anime, etc:' 
    this.router.navigate([`${path}`])  
  }
}