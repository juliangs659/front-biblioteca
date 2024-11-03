import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/usuarios';
  private currentUserSubject: BehaviorSubject<Usuario | null> ;
  public currentUser: Observable<Usuario | null>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(JSON.parse(localStorage.getItem('user') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(usernameOrEmail: string, password: string): Observable<boolean> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.pass === password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      const user = localStorage.getItem('user');
      if (user) {
        this.currentUser = JSON.parse(user);
      }
    }
    return this.currentUser;
  }
}
