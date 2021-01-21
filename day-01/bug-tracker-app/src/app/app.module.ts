import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BugsComponent } from './bugs/bugs.component';

import { ClosedCountPipe } from './bugs/pipes/closedCount.pipe';
import { ElapsedPipe } from './bugs/pipes/elapsed.pipe';
import { SortPipe } from './bugs/pipes/sort.pipe';

import { BugOperationsService } from './bugs/services/bugOperations.service';
import { BugCreateComponent } from './bugs/components/createBug.component';

import { MOMENT_API } from './tokens'

import * as moment from 'moment';
import { Moment } from 'moment';

import { RegistrationComponent } from './registration/registration.component';

//moment factory
function createMoment() : Function{
  console.log('moment instance created');
  return moment;
}

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    ClosedCountPipe,
    ElapsedPipe,
    SortPipe,
    BugCreateComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    /* BugOperationsService */
    /* Injection Token - Type, string, InjectionToken */
    { provide : BugOperationsService, useClass : BugOperationsService },
    //InjectionToken as a string
    /* { provide : 'MOMENT', useValue : moment} */
    //InjectionToken as token
    /* { provide : MOMENT_API, useValue : moment } */
    { provide : MOMENT_API, useFactory : createMoment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
