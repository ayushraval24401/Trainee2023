console.log("Hey alok how are you");
console.log(" ")
// 1.
// *  
// * *  
// * * *  
// * * * *  

console.log("1.")
console.log(" ")

var n = 5;
for (var i = 0; i < n; i++) {

    for (var j = 0; j <= i; j++) {
        process.stdout.write("* ");
    }
    console.log(" ")
}


//2

// * * * * *
// * * * *
// * * *
// * *
// *

console.log(" ")
console.log("2.")
console.log(" ")
var a = 5;

for (var i = 0; i < n; i++) {

    for (var j = n; j > i; j--) {
        process.stdout.write("* ");
    }
    console.log(" ")
}


console.log(" ")
console.log("3.")
console.log(" ")
//3 
//         *
//        * *
//       * * *
//      * * * *
//     * * * * *

var b = 6;

for (var i = 0; i < n; i++) {

    for (var j = 0; j <= (n - 2 - i); j++) {
        process.stdout.write(" ");
    }
    for (var k = (n - i); k <= n; k++) {
        process.stdout.write("* ");
    }
    console.log(" ")
}


console.log(" ")

console.log("4.")
console.log(" ")


//     *
//    ***
//   *****
//  *******
// *********
//  *******
//   *****
//    ***
//     *


var b = 6;

for (var i = 0; i < n; i++) {

    for (var j = 0; j <= (n - 2 - i); j++) {
        process.stdout.write(" ");
    }
    for (var k = (n - i); k <= n; k++) {
        process.stdout.write("* ");
    }
    console.log(" ")
}
for (var i = 0; i < n; i++) {

    for (var j = 0; j < (n - 5 + i); j++) {
        process.stdout.write(" ");
    }
    for (var k = (n - i - 1); k >= 0; k--) {
        process.stdout.write("* ");
    }

    console.log(" ")
}


console.log(" ")
console.log("5. ")

console.log(" ")
const rows = 5;
let pattern = '';

for (let i = rows; i >= 1; i--) {
    for (let j = 1; j <= i; j++) {
        pattern += '* ';
    }

    pattern += '\n';
}

console.log(pattern);


//7

console.log(" ")
console.log("6. ")
console.log(" ")

const rows1 = 5;
let pattern1 = '';
for (let i = 0; i < rows1; i++) {
    let number = 1;
    for (let j = 0; j < rows1 - i; j++) {
        pattern1 += '  ';
    }

    for (let k = 0; k <= i; k++) {
        pattern1 += '  ' + number;
        number = number * (i - k) / (k + 1);
    }

    pattern1 += '\n';
}

console.log(pattern1);


let ourTuple: [number, boolean, string];
ourTuple = [5, false, 'Coding God was here'];

console.log(ourTuple)
// const names: string[] = [];
// names.push("Dylan");


// const names: string[] = [];

// names.push("Dylan"); // no error
// names.push("Alok");

//names.push(3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// console.log(names);


// const names: string[] = ["Dylan", "Alok"];
// console.log(names);

const names: string[] = [];
names.push("Dylan");
names.push("Alok");
console.log(names);

let firstName: string = "Dylan";
console.log(firstName);

//Ts objects
const car: { type: string, Age: number, name: string } =
    { type: "Volvo", Age: 22, name: "Alok" };

console.log(car)

// Inference

const cars = {
    type: "Ford",
    years: 22
};

cars.type = 'Alok'

console.log(cars)


// use of   object literal

const carss: { type: string, millage?: number } = {
    type: 'Ford'
}
carss.millage = 22;

console.log(carss)


// in ference ex

const number = [1, 1, 22, 1, 1]
number.push(22);
console.log(number)


const string = [' Alok', 'amit', 'aaa']
string.push('aa')
console.log(string)

//tuple

let tupleEx: [string, boolean, number];
tupleEx = ["Alok", true, 122];

console.log(tupleEx)

// readonly

let tup: readonly [string, boolean] = ['alok', false];
// tup.push('alok'); error

// graph

let asaa: [a: number, b: number, c: string] = [22.2, 222.2, 'alok']
console.log(asaa)

let cat: { type: string, age: number } = {
    type: 'Mufasa',
    age: 22
}
console.log(cat)


///  object literal operator
let mouse: { type: string, name?: string } = {
    type: 'stuart'
}
mouse.name = 'little';


// signature indexes  --> here they are also taking the type of the key.

let song: { [index: string]: number } = {
    'Name': 1234
}

console.log(song)



enum Name {
    Alok = 1,
    Amit = 2,
    arjun = 3
}
console.log(Name)


enum yes {
    haha, aaa, a, aa, asada, wew
}
console.log(yes.haha)


enum sdsd {
    alaok = 'Alok', asas = '2323', fewf = 1232
}
console.log(sdsd)


// INTERFACE

interface rect {
    height: number,
    width: number
}

interface colRect extends rect {
    colHeight: string
}

let result: colRect = {
    height: 22,
    width: 30,
    colHeight: '20 foot'
}

console.log(result)


// union

function height(code: string | number) {
    console.log(`The height is ${code}`)
}

height(90);
height(' 180 cm')


// function with return type

function animal(): string {
    return `Dog is the loyal animal`;
}
console.log(animal())

function hello(): void {
    console.log("hello world")
}
hello()

function welcome(x: string): string {
    return `Welcome to the ${x}`
}

console.log(welcome("India"))

// Optional parameter

function welcome1(x: number, y: string, z?: number): void {
    console.log(`${x} mens are welcome to ${y} and ${z} are left out`)
}
welcome1(22, 'zoo', 13);
welcome1(22, 'zoo');


// DEfault operatoor
function power(x: number, y: number = 10) {
    console.log(x ** y)
}
power(22)

// Rest operator

function useRest(x: number, y: number, ...rest: number[]): number {
    return x + y + rest.reduce((p, c) => p + c, 0);
}

console.log(useRest(22, 22, 2, 2, 2, 2, 2, 2));

// Casting as

let x: unknown = 'hello';
console.log((x as string).length);

// force casting

let c: unknown = 'Hello'
console.log(((x as unknown) as number))


/// class

// class Animal{
//   public  asas : string
// }
// class Person {
//     name: string;
//   }


/// ERROR
//   class Person {
//     name: string;
//   }

//   const person = new Person();
//   person.name = "Jane";

class Person {
    name: string = "";

    constructor(name: string) {
        this.name = name;
    }
    public getName ():string{
        return this.name
    }
}

let person = new Person("Alok")
console.log(person.getName())
