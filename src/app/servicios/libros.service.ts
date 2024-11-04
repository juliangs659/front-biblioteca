import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../models/libro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private apiUrl = 'http://localhost:8080/libros'; // URL de tu backend

  private categoryImageMap: { [key: string]: string } = {
    "AJAX": "https://www.epitech-it.es/wp-content/uploads/2022/02/ajax-1.jpg",
    "ANGULAR": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png",
    "Algoritmos": "https://concepto.de/wp-content/uploads/2018/04/algoritmo-min-e1523301098719-800x420.jpg",
    "C#": "https://desarrolloweb.com/storage/tag_images/actual/BzOL16MEqsKOe0VThjF6FXPBi0uyK16lkTety9Wz.png",
    "Bootstrap": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/800px-Bootstrap_logo.svg.png",
    "ASP": "https://s3.us-east-1.amazonaws.com/blogueropro-s3-production/blog/que-es-asp-net-y-como-se-usa/Qu%C3%A9-es-ASP.NET-y-c%C3%B3mo-se-usa-1.jpg",
    "Arquitectura de computadores": "https://i0.wp.com/architecnologia.es/wp-content/uploads/2019/05/microprocesador.redimensionado.jpg?resize=800%2C450",
    "Assembler": "https://lenguajesdeprogramacion.net/wp-content/uploads/2018/08/assembler-lenguaje-de-programacion-logo.png",
    "Analisis forense computadoras": "https://recfaces.com/wp-content/uploads/2021/04/la-informatica-forense-y-el-analisis-de-la-informacion-e1618571195903-830x484.jpg",
    "Bases de datos": "https://www.piensasolutions.com/blog/file/uploads/2023/06/5-bases-datos.jpg",
    "Blockchain": "https://i.blogs.es/b5ce90/blockchain2/1366_2000.jpg",
    "Cobol": "https://lenguajesdeprogramacion.net/wp-content/uploads/2018/08/cobol-lenguaje-de-programacion-logo.png",
    "C++": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png",
    "Flask": "https://cdn.worldvectorlogo.com/logos/flask.svg",
    "Android": "https://1000marcas.net/wp-content/uploads/2020/01/Android-Logo-2008-500x314.png",
    "Matlab": "https://1000marcas.net/wp-content/uploads/2020/02/MATLAB-logotipo-600x338.jpg",
    "Django": "https://1000marcas.net/wp-content/uploads/2021/06/Django-Logo-500x313.jpg",
    "Estructuras de datos": "https://edteam-media.s3.amazonaws.com/blogs/original/a3665d79-5990-4dbd-bf68-ee8955c251e7.jpg",
    "Ciberseguridad": "https://noticias.udec.cl/wp-content/uploads/2020/11/ciberseguridad-1024x683.png",
    "Diseño Web": "https://img.freepik.com/foto-gratis/concepto-diseno-web-dibujos_1134-77.jpg",
    "Photoshop": "https://images.sftcdn.net/images/t_app-icon-m/p/44331d24-96d2-11e6-bd68-00163ed833e7/2049902763/adobe-photoshop-express-windows-10-icon.png",
    "OpenGL": "https://tecnologia.uniandes.edu.co/wp-content/uploads/2023/03/Logo-Chimera-Debug-OpenGL.png",
    "Fortran": "https://lenguajesdeprogramacion.net/wp-content/uploads/2024/09/lenguaje-de-programacion-Fortran-logo.png",
    "NodeJs": "https://miro.medium.com/v2/resize:fit:900/1*TY9uBBO9leUbRtlXmQBiug.png",
    "Microsoft": "https://www.disproin.com/wp-content/uploads/2021/05/microsoft-img-1.png",
    "Procesamiento de Imágenes": "https://www.silverfast.com/wp-content/uploads/2018/10/hdr-icon.png",
    "Programación": "https://e7.pngegg.com/pngimages/73/928/png-clipart-web-development-logo-computer-programming-design-trademark-logo-thumbnail.png",
    "Inteligencia Artificial": "https://static.vecteezy.com/system/resources/previews/010/518/719/non_2x/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector.jpg",
    "Haskell": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Haskell-Logo.svg/1200px-Haskell-Logo.svg.png",
    "Hacking": "https://img.freepik.com/vector-gratis/plantilla-logotipo-hacker-creativo_23-2149199402.jpg",
    "Java": "https://www.sommelierdecafe.com/wp-content/uploads/2009/06/java-logo1-1.png",
    "JavaScript": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    "Kotlin": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin_Icon.png/600px-Kotlin_Icon.png",
    "jQuery": "https://e7.pngegg.com/pngimages/265/442/png-clipart-jquery-ui-javascript-web-browser-pasargad-text-trademark-thumbnail.png",
    "Laravel": "https://e7.pngegg.com/pngimages/764/304/png-clipart-laravel-black-logo-tech-companies.png",
    "Scrum": "https://static.cdnlogo.com/logos/s/76/scrum.svg",
    "Machine Learning": "https://www.pngitem.com/pimgs/m/346-3460443_machine-learning-course-near-me-machine-learning-logo.png",
    "Scala": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Scala-full-color.svg/512px-Scala-full-color.svg.png",
    "Seguridad": "https://thumbs.dreamstime.com/z/vector-de-icono-ciberseguridad-logotipo-seguridad-teclado-inteligencia-artificial-s%C3%ADmbolo-velocidad-internet-signo-tecnolog%C3%ADa-244393280.jpg",
    "CompTIA Cloud+": "https://i.pinimg.com/originals/4e/d4/a8/4ed4a8931ce6067847a14dd7de5c2e72.jpg",
    "Ruby": "https://w7.pngwing.com/pngs/980/847/png-transparent-ruby-on-rails-logo-programming-language-rubygems-ruby-angle-design-ruby-thumbnail.png",
    "Rust": "https://www.logo.wine/a/logo/Rust_(programming_language)/Rust_(programming_language)-Logo.wine.svg",
    "Redes Neuronales": "https://cdn-icons-png.flaticon.com/512/7747/7747363.png",
    "Software": "https://w7.pngwing.com/pngs/991/121/png-transparent-business-web-browser-computer-software-organization-jira-business-people-logo-business.png",
    "Visual Basic": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/VB.NET_Logo.svg/512px-VB.NET_Logo.svg.png"
  };

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  getCategoryImageMap(): { [key: string]: string } {
    return this.categoryImageMap;
  }

  getLibroById(id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  subirLibro(libroData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, libroData);
  }

  deleteLibro(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
