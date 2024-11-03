import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password: string = '';
  loginSuccess: boolean = false;


  constructor(
    private authService: AuthService, 
    private router: Router){}

    login() {
      this.authService.login(this.usernameOrEmail, this.password).subscribe(success => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          alert('Login failed');
        }
      });
    this.loginSuccess = true;
    }

    logout() {
      this.loginSuccess = false;
      this.usernameOrEmail = '';
      this.password = '';
    }
  
}

