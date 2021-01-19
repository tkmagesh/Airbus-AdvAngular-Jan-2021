import { zip } from "rxjs";

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

function reduce<T, TResult>(list : T[], reducerFn : (x : TResult, y : T) => TResult, initialResult : TResult) : TResult{
    let result : TResult = initialResult;
    for(let item of list)
        result = reducerFn(result, item)
    return result;
}

var letters = ['a', 'b', 'c', 'd', 'e'];
//var numbers = [ 3,1,5,2,4];

zip(letters, numbers)
    => [
        ['a', 3],
        ['b', 1],
        ['c', 5],
        ....
    ]

//write the typesafe implementation of the zip function

function zip<T1, T2>(list1 : T1[], list2 : T2[]) : ([T1, T2])[] {
    const length = Math.min(list1.length, list2.length);
    const result : ([T1, T2])[] = [];
    for(let index = 0; index < length; index++){
        result.push([list1[index], list2[index]])
    }
    return result;
}

// Type Constraints

interface FormField<T extends number | string | boolean>{
    value? : T,
    defaultValue : T,
    isValid : boolean
}

function getFieldValue<T extends number | string | boolean>(field : FormField<T>) : T {
    return field.value ?? field.defaultValue;
}

//index query operator

type BugKeys = keyof Bug;
//BugKeys = "id" | "name" | "isClosed" | "createdAt"
//attributes of the Bug type



function getAttribute<T, TKey extends keyof T>(bug : T, attrName : TKey) : T[TKey] {
    return bug[attrName];
} 


const bug : Bug = {
    id : 100,
    name : 'Server communication failure', 
    isClosed : false, 
    createdAt : new Date()
}

const dummy = getAttribute(bug, "id");

//convert the follwing into a typesafe function

const bugs : Bug[] = [ /*  bugs with ids 100, 101, 102, 103 */];

const bugIds = pluck(bugs, "id") 
/* bugIds = [100, 101, 102, 103 ] */

function pluck<T, TKey extends keyof T>(list : T[], attrName : TKey) : T[TKey][]{
    let result : T[TKey][] = [];
    for(let item of list)
        result.push(item[attrName])
    return result;
}


//Type Constructors
//Partial Type



/* interface Bug {
  id : number;
  name : string;
  isClosed : boolean;
  createdAt : Date
} */

/* interface PartialBug {
    id? : number,
    name? : string,
    isClosed? : boolean,
    createdAt? : Date
} */

/* type PartialBug = {
    [Key in keyof Bug]? : Bug[Key]
} */

type Partial<T> = {
    [Key in keyof T] ? : T[Key]
}

type ReadOnly<T> = {
    readonly [Key in keyof T] : T[Key]
}

const partialBug : Partial<Bug> = {
    isClosed : true
};

interface BugApi{
    getAll() : Bug[],
    post(bug : Bug) : Bug,
    put(id : number, bug : Bug) : Bug,
    remove(id : number) : void | Promise<any>,
    patch(id : number, bug : Partial<Bug>) : Bug
}

/*
serverBug = { id : 100, name : 'Server Bug', isClosed : false, createdAt : new Date() };

operation -> patch(100, {isClosed : true})

serverBug updated to 
    { id : 100, name : 'Server Bug', isClosed : true, createdAt : new Date() };