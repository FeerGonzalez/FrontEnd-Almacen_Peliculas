import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "movies",
        component: MoviesComponent
    },
    {
        path: "register",
        component: RegisterComponent
    }
];
