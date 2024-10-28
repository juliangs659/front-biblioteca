import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro.model';
import { LibrosService } from '../../servicios/libros.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'] // Cambiado a styleUrls
})
export class LibrosComponent implements OnInit { // Implementar OnInit

  Libros: Libro[] = [];

  constructor(private libroService: LibrosService) {}

  ngOnInit() {
    this.getLibros(); // Obtener libros en la inicialización
  }


  getLibros() {
    this.libroService.getLibros().subscribe(data => {
      this.Libros = data;
    });
  }
}
