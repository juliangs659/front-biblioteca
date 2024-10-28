import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormsModule } from '@angular/forms'; // Agrega esto
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  searchTerm: string = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listaUsuarios();
  } 


  listaUsuarios() {
    this.usuarioService.getUsuariosList().subscribe(data => {
      this.usuario = data.map((usuario: any) => ({
        ...usuario,
        avatarUrl: this.construirUrlAvatar(usuario.avatar)
      }));
      this.filteredUsuarios = this.usuario;
    });
  }
  
  
  construirUrlAvatar(avatar: string): string {
    // crea url de la imagen del avatar
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

  searchUsuarios() {
    // Filtrar usuarios según el término de búsqueda
    this.filteredUsuarios = this.usuario.filter(user => 
      user.idUsuario.toString().includes(this.searchTerm) ||
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) || // Comparar en minúsculas
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) // Comparar en minúsculas
    );
  } 
}
