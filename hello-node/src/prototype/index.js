const Fc = require('./model');

let obj1 = new Fc({ a: 'aa' });
// obj1.fc1();
// obj1.constructor.fc3();
console.log(obj1);
obj1.setA();
console.log(new Fc({ a: 'a1' }))
console.log(obj1);