class Test {
    constructor(public success: boolean = false, public code: number = 200) {}
}

const t1 = new Test(null);
const t2 = new Test(null, null);
console.log(t1);
console.log(t2);