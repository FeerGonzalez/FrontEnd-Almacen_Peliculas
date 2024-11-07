import { Actor } from "./actor";
import { Director } from "./director";

export interface Pelicula {
    id: number;
    titulo: string;
    sinopsis: string;
    imagenPequena: ImageBitmap;
    imagenGrande: ImageBitmap;
    actores: Actor[];
    directores: Director[];
    fechaSalida: string;
}

