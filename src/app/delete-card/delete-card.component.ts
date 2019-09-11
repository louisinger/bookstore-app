import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '../core/snackbar.service';
import { BooksService } from '../core/services/books.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css']
})
export class DeleteCardComponent implements OnInit {

  private formGroup: FormGroup;

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
    .subscribe((book: Book) => this.snackbarService.show('The book ' + book.title + ' has been deleted.'));
  }

}
