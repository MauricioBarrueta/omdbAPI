import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MoviesComponent,
    SeriesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    MoviesComponent,
    SeriesComponent, 
  ]
})
export class PagesModule { }
