import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { RegisterComponent } from './pages/register/register.component';
import { MoviesFormComponent } from './pages/movies-form/movies-form.component';

export const routes: Routes = [
    {
        path:'login',
        component: LoginComponent,
        title:'Inicio de Sesion'
    },
    {
        path:'',
        component: HomeComponent,
        title:'Pagina Principal'
    },
    {
        path:'movies',
        component: MoviesComponent,
        title:'Peliculas'
    },
    {
        path:'movies-form/:id',
        component: MoviesFormComponent,
        title:'Formulario Pelicula'
    },
    {
        path:'register',
        component: RegisterComponent,
        title:'Registro'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch: 'full'
    }
];
