import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name :'sort'
})
export class SortPipe implements PipeTransform{

    private getComparerFor(attrName : string){
        return function(p1 : any, p2:any){
            if (p1[attrName] < p2[attrName]) return -1;
            if (p1[attrName] > p2[attrName]) return 1;
            return 0;
        }
    }
    transform(list: any[], attrName : string, isDesc : boolean = false) {
        if (!list || !list.length || !attrName) return list;
        return list.sort(this.getComparerFor(attrName));
    }

}