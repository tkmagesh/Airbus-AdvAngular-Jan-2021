import { Pipe, PipeTransform } from "@angular/core";

type CompareResult<T> = ReturnType<Comparer<T>>;
type Comparer<T> = (p1 : T, p2 : T) => -1 | 0 | 1;

@Pipe({
    name :'sort'
})
export class SortPipe<T, TKey extends keyof T>implements PipeTransform{

    private getComparerFor(attrName : TKey, isDesc : boolean) : Comparer<T>{
        const comparer : Comparer<T> = (p1 : T, p2 : T) : CompareResult<T>  => {
            if (p1[attrName] < p2[attrName]) return -1;
            if (p1[attrName] > p2[attrName]) return 1;
            return 0;
        }
        if (isDesc){
            return this.getDescComparerFor(comparer);
        }
        return comparer;
    }

    private getDescComparerFor(comparer : Comparer<T>) : Comparer<T> {
        return (p1 : T, p2: T) : CompareResult<T> => {
            //return comparer(p1, p2) * -1;
            if (comparer(p1, p2) === -1) return 1;
            if (comparer(p1, p2) === 1) return -1;
            return 0;
        }
    }
    transform(list: T[], attrName : TKey, isDesc : boolean = false) : T[] {
        if (!list || !list.length || !attrName) return list;
        return list.sort(this.getComparerFor(attrName, isDesc));
    }

}