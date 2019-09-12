import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '../core/snackbar.service';
import { BooksService } from '../core/services/books.service';
import { Book } from '../model/book';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css']
})
export class DeleteCardComponent implements OnInit, OnDestroy {

  private formGroup: FormGroup;

  private stop = new Subject();
  
  @Output()
  deleteDone: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(
    private formBuilder: FormBuilder, 
    private snackbarService: SnackbarService,
    private bookService: BooksService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      id: [null, Validators.required],
    });
  }

  deleteBook() {
    this.bookService.delete(this.formGroup.get('id').value)
    .pipe(takeUntil(this.stop))
    .subscribe((book: Book) => {
      this.snackbarService.show('The book has been deleted.');
      this.deleteDone.emit(book);
    });
  }

  ngOnDestroy() {
    this.stop.next();
    this.stop.complete();
  }
}
