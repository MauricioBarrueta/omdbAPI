import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {}

  currPath!: string
  inputValue!: string
  placeholder!: string

  svgFolder: string = `${environment.svgPath}`

  ngOnInit(): void {    
    //* Se obtiene la ruta para saber a cuál se mandará el parámetro
    this.currPath = this.router.url

    this.placeholder = this.currPath.includes('/movies') ? `${environment.moviePlaceholder}` : `${environment.seriePlaceholder}`
  }

  /* Obtiene el valor ingresado y lo manda como parámetro a la ruta dependiendo de la actual */
  @Output() param = new EventEmitter<string>()
  setParam(value: string) {
    value = this.inputValue === undefined || this.inputValue.includes('undefined') ? '' : this.inputValue
    this.param.emit(value)
    //* Se redirecciona a la ruta y se le asigna su parámetro dependiendo el valor de la ruta actual
    if(value != '') {
      this.currPath.includes('/movies') ? this.router.navigate([`movies/search-by`], { queryParams: { movie: `${value}` }})   
      : this.router.navigate([`series/search-by`], { queryParams: { serie: `${value}` } })
    }
    
  }
    
}