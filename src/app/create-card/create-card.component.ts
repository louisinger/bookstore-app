import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../core/services/books.service';
import { Book } from '../model/book';
import { SnackbarService } from '../core/snackbar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit, OnDestroy {

  private stop = new Subject();

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      publisher: [null, Validators.required],
      type: [null, Validators.required],
      numberOfPages: [null, Validators.required],
    });
  }

  createBook() {
    const book: Book = {
      title: this.formGroup.get('title').value,
      publisher: this.formGroup.get('publisher').value,
      type: this.formGroup.get('type').value,
      numberOfPages: this.formGroup.get('numberOfPages').value,
      isFavorite: false
    };

    this.bookService.create(book)
    .pipe(takeUntil(this.stop))
    .subscribe((result: Book) => {
      this.snackbarService.show('Book has been created');
      console.log('The book:', result.title, 'has been created');
      this.formGroup.reset();
    });
  }

  ngOnDestroy() {
    this.stop.next();
    this.stop.complete();
  }

}
