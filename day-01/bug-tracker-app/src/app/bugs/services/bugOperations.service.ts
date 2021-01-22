
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bug } from '../models/bug';
import { BugList } from '../models/bugList';
import { BugApiService } from './bugApi.service'

@Injectable()
export class BugOperationsService{

    //To be removed after implementing the server side communication
   /*  private _currentBugId = 0;
    public bugsList : BugList = [];   */

    constructor(private _bugApi : BugApiService){

    }

    load() : Observable<Bug[]> {
        return this._bugApi.getAll()
    }

    createNew(newBugName : string) : Observable<Bug> {
        const newBug : Bug = {
            id : 0,
            name : newBugName,
            isClosed : false,
            createdAt : new Date(),
            active : true
        };
        return this._bugApi.save(newBug);
    }
    
    toggle(bugToToggle : Bug) : Observable<Bug> {
        const toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed};
        return this._bugApi.save(toggledBug)
    }

    remove(bugToRemove : Bug) : Observable<any> {
        return this._bugApi.remove(bugToRemove);
    }
    removeClosed() : void {
        /* to be done */
    }

    
}