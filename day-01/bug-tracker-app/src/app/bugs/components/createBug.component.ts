import { Component } from '@angular/core';
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

    constructor(private _bugOperations : BugOperationsService){

    }

    onAddNewClick(){
        const newBug = this._bugOperations.createNew(this.newBugName);
        //this.bugsList.push(newBug);
        //this.bugsList = [...this.bugsList, newBug];
    }
}