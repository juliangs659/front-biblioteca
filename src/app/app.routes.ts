import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LibrosComponent } from './componentes/libros/libros.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path:"book", component:SingleBookComponent},
    {path:"admin", component: LibrosComponent},
    {path:"usuarios", component: UsuariosComponent},
    {path:"registro", component: RegistroComponent}
];
