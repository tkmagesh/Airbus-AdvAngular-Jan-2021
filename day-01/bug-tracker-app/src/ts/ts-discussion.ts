
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

/* zip(letters, numbers)
    => [
        ['a', 3],
        ['b', 1],
        ['c', 5],
        ....
    ] */

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

*/

//Compose Types
    //Union of Types
    //Intersection of Types


//Union of Types
interface Foo{
    foo : string,
    xyz : string
}

interface Bar{
    bar : string,
    xyz : string
}

//Union
const sayHello = (obj : Foo | Bar) : any => {/* 
 */}

 sayHello({ foo : 'foo', xyz : 'something'})
 sayHello({ bar : 'bar', xyz : 'something'})

 //intersection
 const sayHello2 = (obj : Foo & Bar) : any => {
     /*  */
 }

 sayHello2({ foo : 'foo', xyz : 'something', bar : 'bar'})

//Discriminated Union Types

/* 
interface Customer {
    name : string;
    email? : string;
    phone? : string;
} 
*/

/* 
interface Customer {
    name : string,
    contact : string | number;
} 
*/

interface EmailContact{
    kind : 'email';
    email : string;
}

interface PhoneContact{
    kind : 'phone';
    phone : string;
}

type Contact = 
    | EmailContact 
    | PhoneContact ;

interface Customer{
    name : string,
    contact : Contact
}

function displayCustomerContact(customer : Customer){
    const { contact } = customer;
    if (contact.kind === 'email'){
        console.log(contact.email)
    } else {
        console.log(contact.phone);
    }
}

/* Iterator Return Type */

interface IteratorYieldResult<TResult>{
    done : false;
    value : TResult
}

interface IteratorReturnResult<TResult{
    done : true;
    value : TResult;
}

type IteratorResult<T, TResult> = 
    | IteratorYieldResult<TResult> 
    | IteratorReturnResult<TResult>

/* 
    Domain:
        Users place orders for products. User have contact information, email or postal address and at least one is required. Orders should include name, quantity, payment date, paid amount, sending date, delivery date

    Models : User, Product, Contact, Order etc

    Info for different states
        OrderPaid (paymentDate, amount)
        OrderSent (sentDate)
        OrderDelivered (deliveryDate)
*/

type ContactInfo = 
    | { kind : 'email'; email : string}
    | { kind : 'postal'; address : string}
    | { kind : 'emailAndPostal'; email : string, postal : string}

type CustomerType = {
    name : string;
    constact : ContactInfo
}

type PaidOrderData = { paymentDate : Date, amount : number };
type SentOrderData = { sentDate : Date };
type DeliveredOrderData = { deliveryDate : Date }

type OrderState = 
    | { kind : 'new' }
    | { kind : 'paid'; paidData : PaidOrderData }
    | { kind : 'sent'; paidData : PaidOrderData; sentData : SentOrderData }
    | { 
        kind : 'delivered', 
        paidData : PaidOrderData; 
        sentData : SentOrderData, 
        deliveryData : DeliveredOrderData
        };

type Order = {
    id : number;
    customer : CustomerType;
    productName : string;
    quantity : number;
    price : number;
    orderState : OrderState;
}

function processOrder(order : Order, orderAction : OrderState){
    if (orderAction.kind === 'new'){
        /*  */
    } else if (orderAction.kind === 'paid'){

    }
}

//Conditional Types
//Type creation based on a condition

type IsString<T> = T extends string ? true : false;

type A = IsString<string>
type B = IsString<number>

/*  */

//type Not<T> = never; /* to be implemented */
type Not<T> = T extends false ? true : false;
//type Or<T> = never; /* to be implemented */
type Or<T> = 
    T extends [true, true] ? true
    : T extends [true, false] ? true
    : T extends [false, true] ? true
    : T extends [false, false] ? false
    : never;

/*
const foo : Not<true> = false;
const foo : Not<false> = true;
*/

const bar1 : Or<[true, false]> = true;
const bar2 : Or<[true, true]> = true;
const bar3 : Or<[false, true]> = true;
const bar4 : Or<[false, false]> = false;

//Builtin conditional types

//Exclude

type X = Exclude<'A' | 'B' | 1 | 2, 1 | 2>

interface Product{
    id : number;
    name : string;
    cost : number;
}

var p = { id : 100, name : 'Pen', cost : 10 }

//runtime check
/* 
function safeSet(obj, attrName, value){
    if (attrName === 'id') return;
    obj[attrName] = value;
}


safeSet(p, 'id', 200); 
*/

type MyExclude<T, U> = T extends U ? never : T;

function safeSet<T, TKey extends Exclude<keyof T, 'id'>>(obj : T, key : TKey, value : T[TKey]){
    obj[key] = value;
}

//safeSet(p, 'id', 200);

//Extract
type MyExtract<T, U> = T extends U ? T : never;

type X1 = MyExtract<'A'|'B'|'C', 'C'>

interface MyObj {
    foo : string,
    bar : number,
    1 : number,
    42 : number
}

function setStringAttr<T, TKey extends MyExtract<keyof T, string>>(obj : T, key : TKey, value : T[TKey]){
    obj[key] = value
}

var myObj : MyObj = { 
    foo : 'foo',
    bar : 123,
    1 : 100,
    42 : 42
} 

setStringAttr(myObj, 'foo', 'something') // OK
//setStringAttr(myObj, 1, 100) // NOT OK

//Omit
 interface Person{
     id : number;
     name : string;
     age : number;
 }

 //type AnonPerson = Omit<Person, 'id'>
 type AnonPerson = Pick<Person, 'name' | 'age'>

 //var anon : AnonPerson = { id : 100} //NOT OK


 //infer 
 //Use the type as a variable in the type definitions

 type MyParameters<T extends (...args : any) => any> = T extends (...args: infer P) => any ? P : never;

 const sayHelloNew = (name : string, age : number) => `Hello ${name}, your age is ${age}`;

 type SayHelloNewParams = MyParameters<typeof sayHelloNew>

 type MyReturnType<T extends (...args : any ) => any> = T extends (...args : any ) => infer R ? R : never;

 const add = (x : number, y : number ) : number => x + y;

 type AddResult = MyReturnType<typeof add>

 //Decorators


