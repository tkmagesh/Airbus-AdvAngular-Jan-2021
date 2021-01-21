import { Component, OnInit } from '@angular/core';
import { Bug } from './models/bug';
import { BugList } from './models/bugList'
import { BugOperationsService } from './services/bugOperations.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  
  
  newBugName : string = '';

  sortAttr : string = '';
  sortDesc : boolean = false;

  constructor(public bugOperations : BugOperationsService) { 

  }

  ngOnInit(): void {
    this.bugOperations.load();
  }

  /* getClosedCount():number { 
    console.log('getClosedCount triggered');
    return  this.bugsList.reduce((result, bug) => bug.isClosed ? result + 1 : result, 0);
  } */

  onAddNewClick(){
    this.bugOperations.createNew(this.newBugName);
  }

  onRemoveClick(bugToRemove : Bug){
    this.bugOperations.remove(bugToRemove);
  }

  onRemoveClosedClick() {
    this.bugOperations.removeClosed();
  }

  onBugNameClick(bugToToggle : Bug){
    this.bugOperations.toggle(bugToToggle);
  }


}
