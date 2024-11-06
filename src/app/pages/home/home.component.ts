import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Pelicula } from '../../core/interfaces/pelicula';
import { MoviesService } from '../../core/services/movies.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Nota: Corregido styleUrl a styleUrls para que acepte un arreglo.
})
export class HomeComponent implements OnInit {

  movies: Pelicula[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Error al obtener las películas:', err)
    });
  }

  deleteMovieById(id: number): void {
    this.movieService.deleteMovieById(id).subscribe({
      next: () => this.movies = this.movies.filter(movie => movie.id !== id),
      error: (err) => console.error('Error al eliminar la película:', err)
    });
  }

  trackById(index: number, movie: Pelicula): number {
    return movie.id;
  }
}
