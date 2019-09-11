import { Component, OnInit } from '@angular/core';
import { BooksService } from './core/services/books.service';
import { Observable } from 'rxjs';
import { Book } from './model/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allBooks: Observable<Book[]>;

  constructor(
    private bookService: BooksService,
  ) {}

  ngOnInit() {
    this.allBooks = this.bookService.get();
  }

}
