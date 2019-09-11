import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit, OnDestroy {

  show = false;
  message = 'I am a snackbar';
  private type = 'success';
  private snackbarSubscription: Subscription;

  constructor(
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
    this.snackbarSubscription = this.snackbarService.snackbarState.subscribe(
      (state) => {
        if (state.type) {
          this.type = state.type;
        } else {
          this.type = 'success';
        }
        this.message = state.message;
        this.show = state.show;
        if (this.type === 'success') {
          setTimeout(() => this.show = false, 3000);
        } else {
          setTimeout(() => this.show = false, 6000);
        }
      }
    );
  }

  ngOnDestroy() {
    this.snackbarSubscription.unsubscribe();
  }

}
