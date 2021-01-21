
import { Injectable } from '@angular/core';
import { Bug } from '../models/bug';
import { BugList } from '../models/bugList';
import { BugApiService } from './bugApi.service'

@Injectable()
export class BugOperationsService{

    //To be removed after implementing the server side communication
    private _currentBugId = 0;
    public bugsList : BugList = [];  

    constructor(private _bugApi : BugApiService){

    }

    load(){
        this._bugApi
            .getAll()
            .subscribe(bugs => this.bugsList = bugs);
    }

    createNew(newBugName : string) : void {
        const newBug : Bug = {
            id : ++this._currentBugId,
            name : newBugName,
            isClosed : false,
            createdAt : new Date()
        };
        this.bugsList = [...this.bugsList, newBug];
    }
    
    toggle(bugToToggle : Bug) : void {
        const toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed};
        this.bugsList = this.bugsList.map(bug => bug.id === bugToToggle.id ? toggledBug : bug);
    }

    remove(bugToRemove : Bug) : void {
        this.bugsList = this.bugsList.filter(bug => bug.id !== bugToRemove.id);
    }
    removeClosed() : void {
        this.bugsList = this.bugsList.filter(bug => !bug.isClosed);
    }

    
}