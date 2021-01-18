import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name :'sort'
})
export class SortPipe implements PipeTransform{

    private getComparerFor(attrName : string, isDesc : boolean){
        const comparer = function(p1 : any, p2:any){
            if (p1[attrName] < p2[attrName]) return -1;
            if (p1[attrName] > p2[attrName]) return 1;
            return 0;
        }
        if (isDesc){
            return this.getDescComparerFor(comparer);
        }
        return comparer;
    }

    private getDescComparerFor(comparer : any) : any {
        return function(p1 : any, p2:any){
            return comparer(p1, p2) * -1;
        }
    }
    transform(list: any[], attrName : string, isDesc : boolean = false) {
        if (!list || !list.length || !attrName) return list;
        return list.sort(this.getComparerFor(attrName, isDesc));
    }

}