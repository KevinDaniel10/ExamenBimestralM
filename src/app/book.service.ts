import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BokService {

 
  private bokurl = 'https://gutendex.com/books/?ids=1,2,3,4,5,6,7,8,9,10'

  constructor(private http: HttpClient) {}

  
 

  // Obtener una lista de libros
  public getbookList(limit: number): Observable<{ results: any[] }> {
    return this.http.get<{ results: any[] }>(`${this.bokurl}?limit=${limit}`);
  }

}