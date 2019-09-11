import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../core/services/books.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BooksService
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

    this.bookService.create(book).subscribe((result: Book) => {
      console.log('The book:', result.title, 'has been created');
    });
  }

}
