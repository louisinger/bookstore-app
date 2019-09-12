import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from './core/services/books.service';
import { Observable, Subject } from 'rxjs';
import { Book } from './model/book';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private stop = new Subject();

  allBooks: Observable<Book[]>;

  constructor(
    private bookService: BooksService,
  ) {}

  ngOnInit() {
    this.allBooks = this.bookService.get().pipe(takeUntil(this.stop));
  }

  ngOnDestroy() {
    this.stop.next();
    this.stop.complete();
  }
}
