import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './snackbar/snackbar.component';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
];

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules,
    SnackbarComponent
  ],
  declarations: [SnackbarComponent]
})
export class CoreModule { }
