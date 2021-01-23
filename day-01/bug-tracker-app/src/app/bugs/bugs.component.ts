import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  bugs$? : Observable<Bug[]>;
  activeBugs$?: Observable<Bug[]>;
  InactiveBugs$? : Observable<Bug[]>;

  sortAttr : string = '';
  sortDesc : boolean = false;

  constructor(public bugOperations : BugOperationsService) { 

  }

  ngOnInit(): void {
    this.loadBugs();
  }

  private loadBugs(){
    this.bugs$ = this.bugOperations.load();
    this.activeBugs$ = this.bugs$.pipe(
      map(bugs => bugs.filter(bug => bug.active))
    );
    this.InactiveBugs$ = this.bugs$.pipe(
      map(bugs => bugs.filter(bug => !bug.active))
    );
  }

  /* getClosedCount():number { 
    console.log('getClosedCount triggered');
    return  this.bugsList.reduce((result, bug) => bug.isClosed ? result + 1 : result, 0);
  } */

  onNewBugCreated(newBug : Bug){
    this.loadBugs();
  }

  onRemoveClick(bugToRemove : Bug){
    this.bugOperations
      .remove(bugToRemove)
      .subscribe(() => this.loadBugs())
  }

  onRemoveClosedClick() {
    this.bugOperations.removeClosed();
  }

  onBugNameClick(bugToToggle : Bug){
    this.bugOperations
      .toggle(bugToToggle)
      .subscribe(() => this.loadBugs())
  }


}
