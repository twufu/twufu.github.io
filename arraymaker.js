import "break_infinity.js";
var array = {}
var array2 = {}
var basePrice = new Decimal(10)
var expo = new Decimal(1.25)
var currentOwned = new Decimal(0)
var money = 25

for (let i = 0; i < 100; i++) {
    array[i] = Decimal.sumGeometricSeries(i*25,basePrice, expo, currentOwned)
}

console.log(array)