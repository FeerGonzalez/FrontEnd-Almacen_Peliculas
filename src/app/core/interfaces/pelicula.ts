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

interface Actor {
    id: number;
    nombre: string;
    apellido: string;
}

interface Director {
    id: number;
    nombre: string;
    apellido: string;
}