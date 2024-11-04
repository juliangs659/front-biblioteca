import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../servicios/libros.service';

@Component({
  selector: 'app-subir-libro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './subir-libro.component.html',
  styleUrls: ['./subir-libro.component.css']
})
export class SubirLibroComponent {
  libro = {
    titulo: '',
    referenciaPdf: ''
  };
  categoria = {
    nombreCategoria: '',
    descripcion: ''
  };
  autor = {
    nombreAutor: ''
  };

  constructor(private libroService: LibrosService) {}

  subirLibro() {
    const libroData = {
      libro: this.libro,
      categoria: this.categoria,
      autor: this.autor
    };

    this.libroService.subirLibro(libroData).subscribe(
      response => {
        alert('Libro subido con éxito');
        this.resetForm();
      },
      error => {
        console.error('Error al subir el libro:', error);
      }
    );
  }

  resetForm() {
    this.libro = {
      titulo: '',
      referenciaPdf: ''
    };
    this.categoria = {
      nombreCategoria: '',
      descripcion: ''
    };
    this.autor = {
      nombreAutor: ''
    };
  }
}