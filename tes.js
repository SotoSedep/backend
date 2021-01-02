// let x = new Date('2020-12-30');
// // x.setMonth(x.getMonth() - 1);
// // x. setDate(x. getDate() + 1);

// let a = x.getDate()
// let b = x.getMonth()
// let c = x.getFullYear()
// var n = `${c}-${b}-${a}`;
// console.log(n)

const moment = require('moment')

const a = moment('2016-12-30'); 
const b = a.add(1, 'd'); 
const c = b.format('YYYY-MM-DD')

console.log(c)