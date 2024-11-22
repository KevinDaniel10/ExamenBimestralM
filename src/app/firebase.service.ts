import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';  // Importa Firestore
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) {}

  // Función para guardar el libro y la URL de la imagen (perrito o robot)
  saveBookData(bookTitle: string, imageUrl: string): Promise<any> {
    const bookData = {
      title: bookTitle,
      imageUrl: imageUrl,
      timestamp: new Date()
    };

    // Guardar los datos en la colección 'books'
    return this.firestore.collection('books').add(bookData);
  }
}
