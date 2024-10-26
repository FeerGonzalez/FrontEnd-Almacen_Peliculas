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

export interface Actor {
    id: number;
    nombre: string;
    apellido: string;
}

export interface Director {
    id: number;
    nombre: string;
    apellido: string;
}