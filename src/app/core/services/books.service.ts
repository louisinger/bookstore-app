import { Injectable } from '@angular/core';
import { Book } from 'src/app/model/book';
import { readFileSync } from 'fs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private books: Array<Book> = JSON.parse(readFileSync('src/assets/books.json', 'utf-8'));

  constructor() { }

  get(): Observable<Book[]> {
    return of(this.books);
  }

  create(book: Book): Observable<Book> {
    const nextId: number = Math.max(
      ...this.books.map((book: Book) => book.id)
    ) + 1;
    book.id = nextId;
    return this.books.push(book) === -1 ? of(null) : of(book);
  }

  delete(id: number): Observable<Book> {
    const bookToDelete: Book = this.books.find((book: Book) => book.id === id);
    if (!bookToDelete) {
      return of(null);
    }
    this.books.splice(bookToDelete.id);
    return of(bookToDelete);
  }

  deleteBook(book: Book): Observable<Book> {
    if (!book.id) {
      return of(null);
    }
    return this.delete(book.id);
  }

  update(book: Book): Observable<Book> {
    if (!book.id) {
      return of(null);
    }
    const index = this.books.findIndex((bookC: Book) => bookC.id === book.id);
    if (!index) {
      return of(null);
    }

    this.books.splice(index, 0, book);
  }

}
