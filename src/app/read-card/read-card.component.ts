import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '../model/book';
import { BooksService } from '../core/services/books.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-read-card',
  templateUrl: './read-card.component.html',
  styleUrls: ['./read-card.component.css']
})
export class ReadCardComponent implements OnInit, OnDestroy {

  @Input()
  books: Book[];

  private stop = new Subject();


  constructor(
    private bookService: BooksService
  ) { }

  ngOnInit() {
  }

  switchFavorite(book: Book) {
    book.isFavorite = !book.isFavorite;
    this.bookService.update(book).subscribe();
  }

  sortById() {
    this.books.sort(this.compareById);
  }

  sortByPublisher() {
    this.books.sort(this.compareByPublisher);
  }

  sortByTitle() {
    this.books.sort(this.compareByTitle);
  }

  sortByType() {
    this.books.sort(this.compareByType);
  }

  sortByNumberOfPages() {
    this.books.sort(this.compareByNumberOfPages);
  }

  sortByFavorite() {
    this.books.sort(this.compareByIsFavorite);
  }

  private compareByIsFavorite(book1: Book, book2: Book) {
    if (book1.isFavorite && !book2.isFavorite) {
      return -1;
    } 

    if (!book1.isFavorite && book2.isFavorite) {
      return 1;
    }

    return 0;
  }

  private compareById(book1: Book, book2: Book) {
    if (book1.id > book2.id) {
      return 1;
    } 

    if (book1.id < book2.id) {
      return -1;
    }

    return 0;
  }

  private compareByNumberOfPages(book1: Book, book2: Book) {
    if (book1.numberOfPages > book2.numberOfPages) {
      return 1;
    } 

    if (book1.numberOfPages < book2.numberOfPages) {
      return -1;
    }

    return 0;
  }

  private compareByType(book1: Book, book2: Book) {
    if (book1.title > book2.title) {
      return 1;
    } 

    if (book1.title < book2.title) {
      return -1;
    }

    return 0;
  }

  private compareByTitle(book1: Book, book2: Book) {
    if (book1.title > book2.title) {
      return 1;
    }

    if (book1.title < book2.title) {
      return -1;
    }

    return 0;
  }

  private compareByPublisher(book1: Book, book2: Book) {
    if (book1.publisher > book2.publisher) {
      return 1;
    }

    if (book1.publisher < book2.publisher) {
      return -1;
    }

    return 0;
  }

  ngOnDestroy() {
    this.stop.next();
    this.stop.complete();
  }
}
