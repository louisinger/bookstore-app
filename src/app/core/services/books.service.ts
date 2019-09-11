import { Injectable } from '@angular/core';
import { Book } from 'src/app/model/book';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { errorHandler } from './http-error-handler';

/**
 *
 */
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(
    private http: HttpClient,
  ) { }

  get(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books/').pipe(catchError(errorHandler));
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>('api/books', book, this.options).pipe(catchError(errorHandler));
  }

  delete(id: number): Observable<Book> {
    return this.http.delete<Book>(`api/books/${id}`).pipe(catchError(errorHandler));
  }

  update(book: Book): Observable<Book> {
    return this.http.put<Book>(`api/books/${book.id}`, book).pipe(catchError(errorHandler));
  }

}
