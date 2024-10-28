import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  avatars = ['AVATAR1', 'AVATAR2', 'AVATAR3', 'AVATAR4', 'AVATAR5', 'AVATAR6', 'AVATAR7', 'AVATAR8', 'AVATAR9', 'AVATAR10'];
  selectedAvatar: string = 'AVATAR1';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      rol: ['USER', Validators.required]
    });
  }

  ngOnInit(): void {}

  construirUrlAvatar(avatar: string): string {
    return this.usuarioService.construirUrlAvatar(avatar);
  }

  selectAvatar(avatar: string): void {
    this.selectedAvatar = avatar;
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const usuarioData = {
        ...this.registroForm.value,
        avatar: this.selectedAvatar
      };

      this.usuarioService.createUsuario(usuarioData).subscribe({
        next: () => {
          alert('Registro exitoso');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          alert('Error en el registro');
        }
      });
    } else {
      // Muestra los errores en el formulario
      const errores = this.registroForm.controls;
      for (const campo in errores) {
        if (errores[campo].invalid) {
          console.log(`Campo ${campo} es inválido:`, errores[campo].errors);
        }
      }
      alert('Por favor, completa todos los campos');
    }
  }
}