const randStr = require('randomstring');

const rand = randStr.generate({
  length: 40,
  charset: 'alphanumeric'
});

console.log(rand);
