var numbers = [ 3,1,5,2,4];

export interface Bug {
  id : number;
  name : string;
  isClosed : boolean;
  createdAt : Date
}

type BugsList = Bug[]

function map<T, TResult>(list : T[], transformFn : (T) => TResult){
    var result : TResult[] = [];
    for(let item of list)
        result.push(transformFn(item));
    return result;
}

const doubleTransformFn = (n : number) : number => n * 2;
const doubleResult = map<number, number>(numbers, doubleTransformFn)

const transformBugToNames = (bug : Bug) : string => bug.name
const bugsList : BugsList = [];
const bugNames = map<Bug, string>(bugsList, transformBugToNames); 


//Write the typesafe implementation of 'reduce' function

function reduce<T, TResult>(list : T[], reducerFn : (TResult, T) => TResult, initialResult : TResult) : TResult{
    let result : TResult = initialResult;
    for(let item of list)
        result = reducerFn(result, item)
    return result;
}
