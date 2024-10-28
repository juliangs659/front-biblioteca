import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model'; // Asegúrate de crear este modelo


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = 'http://localhost:8080/usuarios'; // URL de tu backend

    constructor(private http: HttpClient) { }

  
    getUsuariosList(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    getUsuarioById(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    createUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }

    updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
    }

    deleteUsuario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    construirUrlAvatar(avatar: string): string {
      switch (avatar) {
        case 'AVATAR1': return `https://cdn-icons-png.flaticon.com/128/236/236832.png`;
        case 'AVATAR2': return `https://cdn-icons-png.flaticon.com/128/4202/4202835.png`;
        case 'AVATAR3': return `https://cdn-icons-png.flaticon.com/128/1993/1993341.png`;
        case 'AVATAR4': return `https://cdn-icons-png.flaticon.com/128/4202/4202850.png`;
        case 'AVATAR5': return `https://cdn-icons-png.flaticon.com/128/1993/1993338.png`;
        case 'AVATAR6': return `https://cdn-icons-png.flaticon.com/128/4202/4202848.png`;
        case 'AVATAR7': return `https://cdn-icons-png.flaticon.com/128/5024/5024561.png`;
        case 'AVATAR8': return `https://cdn-icons-png.flaticon.com/128/2436/2436848.png`;
        case 'AVATAR9': return `https://cdn-icons-png.flaticon.com/128/2922/2922510.png`;
        case 'AVATAR10': return `https://cdn-icons-png.flaticon.com/128/3135/3135715.png`;
        default: return 'https://cdn-icons-png.flaticon.com/128/2550/2550260.png';
      }
    }
}
