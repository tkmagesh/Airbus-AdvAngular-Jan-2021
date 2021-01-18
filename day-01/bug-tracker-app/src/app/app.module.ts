import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BugsComponent } from './bugs/bugs.component';

import { ClosedCountPipe } from './bugs/pipes/closedCount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    ClosedCountPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
