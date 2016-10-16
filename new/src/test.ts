class Test {
    constructor(number: number){
        console.log(number);
    }
    constructor(name: string, age:number){
        console.log(`My name is ${name}.`);
    }
}

const t1 = new Test(10);