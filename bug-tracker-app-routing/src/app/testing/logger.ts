export class Logger{

    formattedLogMessage(x,y, msg) : string{
        return `${msg}, ${x}, ${y}`;
    }
    
    log(message:string) : void {
        console.log(message);
    }
}