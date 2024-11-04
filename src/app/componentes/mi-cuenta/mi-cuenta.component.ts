import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../clases/usuario';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  currentUser: Usuario | null = null;
  editMode: boolean = false;

  constructor(private authService: AuthService, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user: Usuario | null) => {
      if (user) {
        this.currentUser = user;
      }
    });
  }

  actualizarUsuario() {
    if (this.currentUser) {
      this.usuarioService.updateUsuario(Number(this.currentUser.idUsuario), this.currentUser).subscribe(
        () => {
          alert('Usuario actualizado con éxito');
          this.editMode = false;
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }
    
  toggleEditMode() {
    this.editMode = !this.editMode;
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
}

