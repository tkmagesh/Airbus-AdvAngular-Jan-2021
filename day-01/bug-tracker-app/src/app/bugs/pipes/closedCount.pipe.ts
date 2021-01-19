import { Pipe, PipeTransform } from "@angular/core";
import { Bug } from "../models/bug";
import { BugList } from '../models/bugList';

@Pipe({
    name : 'closedCount'
})
export class ClosedCountPipe implements PipeTransform { 
    transform( list : BugList) : number {
        console.log('closedCount.pipe triggered');
        return  list.reduce((result, bug) => bug.isClosed ? result + 1 : result, 0);
    }
}