import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pelicula } from '../../core/interfaces/pelicula';
import { Actor } from '../../core/interfaces/actor';
import { Director } from '../../core/interfaces/director';
import { MoviesService } from '../../core/services/movies.service';
import { ActoresService } from '../../core/services/actores.service';
import { DirectorService } from '../../core/services/director.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-movies-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    InputTextModule,
    CalendarModule,
    CardModule,
    MultiSelectModule,
  ],
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.css']
})
export class MoviesFormComponent implements OnInit {
  
  movieForm!: FormGroup;
  isSaveInProgress = false;
  edit = false;
  actorsList: Actor[] = [];
  directoresList: Director[] = [];

  constructor(
    private fb: FormBuilder, 
    private movieService: MoviesService,
    private actorService: ActoresService,
    private directorService: DirectorService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) {
    // Configuración del formulario, con campos de actores y directores correctamente nombrados
    this.movieForm = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      sinopsis: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      actores: [[], Validators.required],       // Aquí especificamos "actores" en lugar de "actorsList"
      directores: [[], Validators.required]     // Aquí especificamos "directores" en lugar de "directoresList"
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getActores();
    this.getDirectores();

    if (id && id !== 'new') {
      this.edit = true;
      this.getMovieById(+id);
    }
  }

  getMovieById(id: number) {
    this.movieService.getMoviesById(id).subscribe({
      next: (foundMovie) => {
        this.movieForm.patchValue(foundMovie);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Película no encontrada'
        });
        this.router.navigateByUrl('/');
      }
    });
  }

  createMovie() {
    if (this.movieForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente'
      });
      return;
    }
    this.isSaveInProgress = true;
    this.movieService.createMovie(this.movieForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Película guardada exitosamente'
        });
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al guardar la película'
        });
      },
      complete: () => {
        this.isSaveInProgress = false;
      }
    });
  }

  updateMovie() {
    if (this.movieForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente'
      });
      return;
    }
    this.isSaveInProgress = true;
    this.movieService.updateMovie(this.movieForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Película actualizada exitosamente'
        });
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar la película'
        });
      },
      complete: () => {
        this.isSaveInProgress = false;
      }
    });
  }

  getActores() {
    this.actorService.getActors().subscribe({
      next: (foundActors) => {
        this.actorsList = foundActors;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los actores'
        });
      }
    });
  }

  getDirectores() {
    this.directorService.getDirectores().subscribe({
      next: (foundDirectores) => {
        this.directoresList = foundDirectores;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los directores'
        });
      }
    });
  }

  onSubmit() {
    if (this.edit) {
      this.updateMovie();
    } else {
      this.createMovie();
    }
  }
}
