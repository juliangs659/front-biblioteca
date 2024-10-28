import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../models/libro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private apiUrl = 'http://localhost:8080/libros'; // URL de tu backend


  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }
}
