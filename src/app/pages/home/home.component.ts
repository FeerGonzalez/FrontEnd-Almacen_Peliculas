import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Pelicula } from '../../core/interfaces/pelicula';
import { MoviesService } from '../../core/services/movies.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  movies:Pelicula[] = []

  constructor(private movieService: MoviesService){}

  ngOnInit(): void {

  }

  getAllMovies(){
    this.movieService.getMovies().subscribe(data=>{
      this.movies = data;
    })
  }
}
