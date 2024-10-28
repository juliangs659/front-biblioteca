export class Usuario {
  public idUsuario: number;
  public nombre: string;
  public username: string;
  public email: string;
  public rol: string; 
  public fecha_creacion: string; 
  public avatar: string; 
  public avatarUrl?: string; // Agregamos avatarUrl como propiedad opcional

  constructor(idUsuario: number, nombre: string, username: string, email: string, rol: string, fecha_creacion: string, avatar: string) {
    this.idUsuario = idUsuario;
    this.nombre = nombre;
    this.username = username;
    this.email = email;
    this.rol = rol;
    this.fecha_creacion = fecha_creacion;
    this.avatar = avatar;
  }


  
}
