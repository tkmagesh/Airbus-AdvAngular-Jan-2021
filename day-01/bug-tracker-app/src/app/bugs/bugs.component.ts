import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  bugsList : any[] = [];  
  
  newBugName : string = '';

  constructor() { }

  ngOnInit(): void {
    this.bugsList.push({id : 1, name : 'Server communication failure', isClosed  : false, createdAt : new Date('1-jan-2020')});
    this.bugsList.push({id : 2, name : 'Data Integrity checks failed', isClosed  : true, createdAt : new Date('1-Apr-2020')});
    this.bugsList.push({id : 3, name : 'User actions not recognized', isClosed  : true, createdAt : new Date('1-Oct-2020')});
    this.bugsList.push({id : 4, name : 'Application not responding', isClosed  : false, createdAt : new Date('1-Jan-2021')});
  }

  getClosedCount():number { 
    console.log('getClosedCount triggered');
    return  this.bugsList.reduce((result, bug) => bug.isClosed ? result + 1 : result, 0);
  }

  onAddNewClick(){
    const newBugId = this.bugsList.reduce((bug, result) => bug.id > result ? bug.id : result, 0) + 1;
    const newBug = {
      id : newBugId,
      name : this.newBugName,
      isClosed : false,
      createdAt : new Date()
    };
    //this.bugsList.push(newBug);
    this.bugsList = [...this.bugsList, newBug];
  }

  onRemoveClick(bugToRemove : any){
    this.bugsList = this.bugsList.filter(bug => bug.id !== bugToRemove.id);
  }

  onRemoveClosedClick() {
    this.bugsList = this.bugsList.filter(bug => !bug.isClosed);
  }

  onBugNameClick(bugToToggle : any){
    //bug.isClosed = !bug.isClosed;
    const toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed};
    this.bugsList = this.bugsList.map(bug => bug.id === bugToToggle.id ? toggledBug : bug);
  }

  
}
