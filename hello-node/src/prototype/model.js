function Fc(obj) {
    this.a = obj.a;
}

Fc.prototype.fc1 = function() {
    console.log('fc1()');
}

Fc.fc2 = function() {
    console.log('fc2()');
}

Fc.fc3 = function() {
    this.fc2();
    console.log('fc3()');
}

Fc.prototype.setA = function() {
    this.a = 'aaa';
}

module.exports = Fc;