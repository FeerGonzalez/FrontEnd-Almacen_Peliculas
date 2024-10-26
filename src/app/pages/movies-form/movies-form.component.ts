import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoviesService } from '../../core/services/movies.service';
import { ActoresService } from '../../core/services/actores.service';
import { DirectorService } from '../../core/services/director.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  styleUrl: './movies-form.component.css'
})
export class MoviesFormComponent {

  movieForm!:FormGroup
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  actorsList: any[] = [];
  directoresList: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private movieService: MoviesService,
    private actorService: ActoresService,
    private directorService: DirectorService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router:Router,
  ){
    this.movieForm = this.fb.group({
      id: [null],
      titulo:['', Validators.required],
      sinopsis:['', Validators.required],
      fechaSalida:['', Validators.required],
      selectedActors: [],
      selectedDirectores: [],
    })
  }
  
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getActores();
    this.getDirectores();

    if(id !== 'new'){
      this.edit = true;
      this.getMovieById(+id!)
    }
  }

  getMovieById(id:number){
    this.movieService.getMoviesById(id).subscribe({
      next: (foundMovie) =>{
        this.movieForm.patchValue(foundMovie);
      },
      error:()=>{
        this.messageService.add({
          severity: 'error', 
          summary: 'Error', 
          detail: 'No encontrado'
        });
        this.router.navigateByUrl('/')
      }
    })
  }

  createMovie(){
    if(this.movieForm.invalid){
      this.messageService.add({
        severity: 'error', 
        summary: 'Error', 
        detail: 'Revise los campos e intente nuevamente'
      });
      return
    }
    this.movieService.createMovie(this.movieForm.value).subscribe({
      next: () =>{
        this.messageService.add({
          severity: 'success', 
          summary: 'Guardado', 
          detail: 'Pelicula guardada exitosamente'
        });
        this.router.navigateByUrl('/')
      },
      error:()=>{
        this.messageService.add({
          severity: 'error', 
          summary: 'Error', 
          detail: 'No encontrado'
        });
        this.router.navigateByUrl('/')
      }
    })
  }

  updateMovie(){
    if(this.movieForm.invalid){
      this.messageService.add({
        severity: 'error', 
        summary: 'Error', 
        detail: 'Revise los campos e intente nuevamente'
      });
      return
    }
    this.movieService.updateMovie(this.movieForm.value).subscribe({
      next: () =>{
        this.messageService.add({
          severity: 'success', 
          summary: 'Guardado', 
          detail: 'Pelicula actualizada exitosamente'
        });
        this.router.navigateByUrl('/')
      },
      error:()=>{
        this.messageService.add({
          severity: 'error', 
          summary: 'Error', 
          detail: 'No encontrado'
        });
        this.router.navigateByUrl('/')
      }
    })
  }

  getActores(){
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
        //this.router.navigateByUrl('/');
      }
    });
  }

  getDirectores(){
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
        //this.router.navigateByUrl('/');
      }
    });
  }
}
