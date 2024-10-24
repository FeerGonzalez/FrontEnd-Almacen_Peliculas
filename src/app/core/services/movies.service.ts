import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../interfaces/pelicula';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'http://localhost:8080/almacen/pelicula'

  constructor(private http:HttpClient) { }

  getMovies():Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getMoviesById(id:number):Observable<Pelicula>{
    return this.http.get<Pelicula>('${this.apiUrl}/${id}');
  }

  createMovie(movie:Pelicula):Observable<Pelicula>{
    return this.http.post<Pelicula>(this.apiUrl, movie);
  }

  updateMovie(movie:Pelicula){
    return this.http.put(this.apiUrl, movie);
  }

  deleteMovieById(id:number){
    return this.http.delete('${this.apiUrl}/${id}');
  }
}
