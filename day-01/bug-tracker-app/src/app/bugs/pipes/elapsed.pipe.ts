import { Inject, Pipe, PipeTransform } from "@angular/core";
import { MOMENT_API } from '../../tokens'

@Pipe({
    name : 'elapsed'
})
export class ElapsedPipe implements PipeTransform {
    constructor(@Inject(MOMENT_API) private moment : Function){

    }
    transform(value : Date) : string {
        return this.moment(value).fromNow();
    }
    
}
