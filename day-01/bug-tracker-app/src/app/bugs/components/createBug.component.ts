import { Component, EventEmitter, Output } from '@angular/core';
import { Bug } from '../models/bug';
import { BugOperationsService } from '../services/bugOperations.service';

@Component({
    selector : 'app-bug-create',
    template : `
        <h3>Create Bug</h3>
        <section class="edit">
            <label for="">Bug Name :</label>
            <input type="text" [(ngModel)]="newBugName">
            <span> [ {{newBugName.length}} ] </span>
            <input type="button" value="Add New" (click)="onAddNewClick()">
        </section>
    `,
    /* providers: [BugOperationsService] */
})
export class BugCreateComponent{
    newBugName : string = '';

    @Output()
    bugCreated : EventEmitter<Bug> = new EventEmitter<Bug>();

    constructor(private _bugOperations : BugOperationsService){

    }

    onAddNewClick(){
        this._bugOperations
            .createNew(this.newBugName)
            .subscribe(newBug => this.bugCreated.emit(newBug))
        //this.bugsList.push(newBug);
        //this.bugsList = [...this.bugsList, newBug];
    }
}