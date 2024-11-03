import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LibrosComponent } from './componentes/libros/libros.component';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path:"book", component:SingleBookComponent},
    {path:"libros", component: LibrosComponent},
    {path:"usuarios", component: UsuariosComponent},
    {path:"registro", component: RegistroComponent},
    {path:"login", component: LoginComponent},
    {path:"leer/:idLibro", component: SingleBookComponent}

];
