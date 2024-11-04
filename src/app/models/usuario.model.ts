export interface Usuario {
  idUsuario: number; // Cambia esto si en el otro archivo se llama `id`
  nombre: string;
  username: string;
  email: string;
  pass: string; // Si no necesitas la contraseña en el frontend, puedes omitirla
  avatar: string; // Cambia esto si Avatar es de un tipo diferente
  fecha_creacion: string; 
  rol: string; // Ajusta según tu implementación
}
