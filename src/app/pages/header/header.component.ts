import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  placeholderValue: string = 'Nombre de la película o serie:'

  movieName!: string
  @Output() nameValueEmitter = new EventEmitter<string>()

  setMovieValue(): void {
    this.nameValueEmitter.emit(this.movieName)
  }

  redirectTo(path: string) {   
    this.router.navigate([`${path}`])    
    this.placeholderValue = path === 'movies' ? 'Nombre de la película o serie:' : 'Nombre de la serie:' 
  }
}