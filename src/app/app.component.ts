import { Component, OnInit } from '@angular/core';
import { DogService } from './dog.service';
import { StorageService } from './storage.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  books: { title: string; dogImage: string }[] = [];

  constructor(

    private dogService: DogService,
    private storageService: StorageService,
    
  ) {
    this.showSplash();
  }

  ngOnInit() {
    this.loadBooks();
  }

  async showSplash(){
    await SplashScreen.show({
      autoHide: true,
      showDuration: 3000
    });
  }

  // Cargar los libros y las imágenes de los perros
  loadBooks() {
    this.dogService.getBooks().subscribe((response) => {
      const bookTitles = response.results; // Los libros vienen en el array "results" de la API
      this.fetchDogImages(bookTitles);
    });
  }

  // Obtener las imágenes de perros y mostrar en la lista sin guardarlas en Firebase automáticamente
  fetchDogImages(bookTitles: any[]) {
    bookTitles.forEach((book: any) => {
      this.dogService.getDogImage().subscribe((dogResponse) => {
        // Aquí se agrega el libro y la imagen en el array de books sin guardarlos automáticamente
        this.books.push({
          title: book.title, // El título del libro
          dogImage: dogResponse.message, // La imagen del perro
        });
      });
    });
  }

  // Método para guardar el título del libro y la URL de la imagen en Firebase
  async saveBookAndImage(title: string, dogImage: string) {
    try {
      const result = await this.storageService.addNote({
        title: title, // Título del libro
        text: dogImage, // URL de la imagen del perro
      });

      if (result) {
        console.log('Elemento guardado correctamente en Firebase');
      } else {
        console.error('Error al guardar el elemento en Firebase');
      }
    } catch (error) {
      console.error('Error al guardar el elemento:', error);
    }
  }
}
