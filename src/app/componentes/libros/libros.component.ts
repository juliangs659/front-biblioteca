import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro.model';
import { LibrosService } from '../../servicios/libros.service';
import { NgFor, NgIf } from '@angular/common';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';

// Configura el worker de PDF.js
GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.8.162/pdf.worker.min.js';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  Libros: Libro[] = [];
  miniaturas: string[] = [];

  constructor(private libroService: LibrosService) {}

  ngOnInit() {
    this.getLibros();
  }

  getLibros() {
    this.libroService.getLibros().subscribe(data => {
      this.Libros = data;
      this.Libros.forEach((libro, index) => {
        const urlDescarga = this.transformarUrlDrive(libro.referenciaPdf);
        this.generarMiniatura(urlDescarga, index);
      });
    });
  }

  transformarUrlDrive(url: string): string {
    const match = url.match(/\/d\/(.+?)\//);
    return match ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
  }

  async generarMiniatura(url: string, index: number) {
    try {
      const pdf: PDFDocumentProxy = await getDocument(url).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      this.miniaturas[index] = canvas.toDataURL();
    } catch (error) {
      console.error('Error al cargar el PDF:', error);
    }
  }
}
