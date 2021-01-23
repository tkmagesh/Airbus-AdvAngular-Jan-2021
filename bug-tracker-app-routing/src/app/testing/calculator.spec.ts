import { TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';
import { Logger } from './logger';

describe('Calculator', () => {
    let calc: Calculator;
     let loggerMock ; 

    beforeEach(() => {
        loggerMock = jasmine.createSpyObj("Logger", {"log" : undefined,  "formattedLogMessage" : `Add operation, 10, 20`});

        TestBed.configureTestingModule({
            providers : [
                Calculator,
                { provide : Logger, useValue : loggerMock }
            ]
        })
        calc = TestBed.inject<Calculator>(Calculator);
    })

    it('should add the given numbers', () => {
        //arrange
        let x = 10,
            y = 20,
            expectedResult = 30;

        //act
        let actualResult = calc.add(x,y);

        //assert
        expect(actualResult).toBe(expectedResult);
        expect(loggerMock.log).toHaveBeenCalledWith('Add operation, 10, 20');
    })

    it('should subtract the given numbers', () => {
        //arrange
        let loggerMock = jasmine.createSpyObj("Logger", ["log", { "formattedLogMessage" : `Subtract operation, 10, 20`} ]),
            calc = new Calculator(loggerMock),
            x = 10,
            y = 20,
            expectedResult = -10;

        //act
        let actualResult = calc.subtract(x,y);

        //assert
        expect(actualResult).toBe(expectedResult);
    })

})