import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { LibrosService } from '../../servicios/libros.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {
  libros: Libro[] = [];
  filteredLibros: Libro[] = [];
  searchTerm: string = '';

  constructor(private libroService: LibrosService) {}

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.libroService.getLibros().subscribe(
      (data: Libro[]) => {
        this.libros = data;
        this.filteredLibros = data;
      },
      error => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  searchLibros(): void {
    this.filteredLibros = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      libro.autor.nombreAutor.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  eliminarLibro(libro: Libro): void {
    this.libroService.deleteLibro(String(libro.idLibro)).subscribe(
      () => {
        this.libros = this.libros.filter(l => l.idLibro !== libro.idLibro);
        this.searchLibros(); // Actualiza la lista filtrada
      },
      error => {
        console.error('Error al eliminar el libro:', error);
      }
    );
  }
}