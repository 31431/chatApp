const moment = require('moment');

// var date = new Date();
// console.log(date.getTime());

// var date = moment();
// date.subtract(1,'y');
// console.log(date.format('Do MMM YYYY')); 

var createdAt = 123434;
console.log(new Date().getTime());
console.log(moment().valueOf());
var date = moment(createdAt);
console.log(date.format('h:mm a'));