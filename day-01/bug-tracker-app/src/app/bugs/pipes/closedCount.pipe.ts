import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'closedCount'
})
export class ClosedCountPipe implements PipeTransform { 
    transform( list : any[]) : number {
        console.log('closedCount.pipe triggered');
        return  list.reduce((result, bug) => bug.isClosed ? result + 1 : result, 0);
    }
}