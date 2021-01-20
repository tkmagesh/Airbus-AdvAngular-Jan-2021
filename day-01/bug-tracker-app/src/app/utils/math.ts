import { log } from './log';
import { logClass } from './logClass';
import { registerEndPoint} from './registerEndPoint';

@registerEndPoint('calculator')
class Math{

    constructor(private id : number){

    }

    @log(' - done')
    add(x:number , y:number) : number {
        return x + y;
    }

    @log(' - done')
    subtract(x : number , y:number) : number {
        return x - y;
    }
}

export default Math;

/* 



*/