import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '../model/book';

@Component({
  selector: 'app-read-card',
  templateUrl: './read-card.component.html',
  styleUrls: ['./read-card.component.css']
})
export class ReadCardComponent implements OnInit {

  @Input()
  books: Book[];


  constructor(
  ) { }

  ngOnInit() {
  }

}
