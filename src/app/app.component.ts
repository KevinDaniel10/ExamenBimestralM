import { Component, OnInit } from '@angular/core';
import { DogService } from './dog.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  books: { title: string; dogImage: string }[] = [];

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.loadBooks();
  }

  // Cargar los libros y las imágenes de los perros
  loadBooks() {
    this.dogService.getBooks().subscribe((response) => {
      const bookTitles = response.results; // Los libros vienen en el array "results" de la API
      this.fetchDogImages(bookTitles);
    });
  }

  // Obtener las imágenes de perros
  fetchDogImages(bookTitles: any[]) {
    bookTitles.forEach((book: any) => {
      this.dogService.getDogImage().subscribe((dogResponse) => {
        this.books.push({
          title: book.title, // El título del libro
          dogImage: dogResponse.message, // La imagen del perro
        });
      });
    });
  }
}

