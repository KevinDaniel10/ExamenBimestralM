import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DogService {

  private dogApiUrl = 'https://dog.ceo/api/breeds/image/random'; // URL de la API de perros
  private booksApiUrl = 'https://gutendex.com/books/'; // URL de la API de libros

  constructor(private http: HttpClient) {}

  // Obtener una imagen de perro aleatoria
  getDogImage(): Observable<any> {
    return this.http.get<any>(this.dogApiUrl);
  }

  // Obtener los libros a partir de la API Gutendex
  getBooks(): Observable<any> {
    return this.http.get<any>(this.booksApiUrl + '?ids=1,2,3,4,5,6,7,8,9,10');
  }

  
}
