// src/app/models/libro.model.ts

export interface Libro {
  idLibro: number;
  titulo: string;
  referenciaPdf: string;
  estado: string; // Asumiendo que 'EstadoLibro' es un string, puedes cambiarlo por un enum si es necesario
  fechaCreacion: string; // El formato de fecha puede variar según tu implementación
  categoria: {
    idCategoria: number;
    nombreCategoria: string;
    descripcion: string;
    // Puedes incluir más campos de la categoría si es necesario
  };
  autor: {
    idAutor: number;
    nombreAutor: string;
    // Puedes incluir más campos del autor si es necesario
  };
}
