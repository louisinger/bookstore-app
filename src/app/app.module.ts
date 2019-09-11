import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CreateCardComponent } from './create-card/create-card.component';
import { ReadCardComponent } from './read-card/read-card.component';
import { UpdateCardComponent } from './update-card/update-card.component';
import { DeleteCardComponent } from './delete-card/delete-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCardComponent,
    ReadCardComponent,
    UpdateCardComponent,
    DeleteCardComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
