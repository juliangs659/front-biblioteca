import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../servicios/libros.service';
import { Libro } from '../models/libro.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Libros: Libro[] = [];
  librosFiltrados: Libro[] = []; // Propiedad para almacenar libros filtrados
  categorias: string[] = []; // Propiedad para almacenar categorías únicas
  categoriasSeleccionadas: string[] = []; // Almacena las categorías seleccionadas

  constructor(private libroService: LibrosService) {}

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.libroService.getLibros().subscribe(
      data => {
        this.Libros = data;
        this.extraerCategorias(data);
        this.librosFiltrados = data; // Inicialmente, todos los libros están filtrados
      },
      error => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  extraerCategorias(data: Libro[]): void {
    const categoriasSet = new Set<string>();
    data.forEach(libro => {
      if (libro.categoria && libro.categoria.nombreCategoria) {
        categoriasSet.add(libro.categoria.nombreCategoria);
      }
    });
    this.categorias = Array.from(categoriasSet);
  }

  // Método para filtrar libros por categorías seleccionadas
  seleccionarCategoria(categoria: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;

    // Añadir o eliminar la categoría de la lista de categorías seleccionadas
    if (isChecked) {
      this.categoriasSeleccionadas.push(categoria);
    } else {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(c => c !== categoria);
    }

    // Filtra los libros según las categorías seleccionadas
    this.librosFiltrados = this.Libros.filter(libro => 
      this.categoriasSeleccionadas.length === 0 || 
      (libro.categoria && this.categoriasSeleccionadas.includes(libro.categoria.nombreCategoria))
    );
  }
}
