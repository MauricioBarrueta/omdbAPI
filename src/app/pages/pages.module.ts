import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    MoviesComponent,
    SeriesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule
  ],
  exports: [
    HeaderComponent,
    MoviesComponent,
    SeriesComponent, 
  ]
})
export class PagesModule { }
