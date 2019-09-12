import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarService } from '../core/snackbar.service';
import { BooksService } from '../core/services/books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../model/book';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.css']
})
export class UpdateCardComponent implements OnInit, OnDestroy {
  @Input()
  books: Book[];

  private stop = new Subject();

  formGroup: FormGroup;

  selectFormGroup: FormGroup;

  selectedBook: Book;

  constructor(
    private snackbarService: SnackbarService,
    private bookService: BooksService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.selectFormGroup = this.formBuilder.group({
      selectedBook: [null, Validators.required]
    });

    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      publisher: [null, Validators.required],
      type: [null, Validators.required],
      numberOfPages: [null, Validators.required],
    });

    this.selectFormGroup.get('selectedBook').valueChanges
    .pipe(takeUntil(this.stop))
    .subscribe((value: Book) => {
      this.selectedBook = value; 
      this.formGroup.get('title').setValue(this.selectedBook.title);
      this.formGroup.get('publisher').setValue(this.selectedBook.publisher);
      this.formGroup.get('type').setValue(this.selectedBook.type);
      this.formGroup.get('numberOfPages').setValue(this.selectedBook.numberOfPages);
    });
  }

  updateBook() {
    this.selectedBook.title = this.formGroup.get('title').value;
    this.selectedBook.publisher = this.formGroup.get('publisher').value;
    this.selectedBook.type = this.formGroup.get('type').value;
    this.selectedBook.numberOfPages = this.formGroup.get('numberOfPages').value;
    
    this.bookService.update(this.selectedBook)
    .pipe(takeUntil(this.stop))
    .subscribe(
      (book: Book) => this.snackbarService.show('The book #' + book.id + ' has been updated.')
    );
  }

  ngOnDestroy() {
    this.stop.next();
    this.stop.complete();
  }
}
