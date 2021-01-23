import { Injectable } from '@angular/core';
import { Logger } from './logger';

@Injectable()
export class Calculator{

    constructor(private logger : Logger){

    }

    public add(x : number, y : number) : number{
        const formattedMsg = this.logger.formattedLogMessage(x, y, 'Add Operation');
        this.logger.log(formattedMsg)
        return x + y;
    }

    public subtract(x : number, y : number) : number{
        this.logger.log('Subtract operation performed')
        return x - y;
    }
}