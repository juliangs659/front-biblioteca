import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './servicios/auth.service';
import { NgIf } from '@angular/common';
import { Usuario } from './clases/usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  currentUser: Usuario | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user: Usuario | null) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
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
