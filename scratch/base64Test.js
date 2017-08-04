var base64js = require('base64-js')
const uuidv4 = require('uuid/v4');

const arr = new Array(16);
uuidv4(null, arr, 0);

let result = base64js.fromByteArray(arr);

console.log(arr);
console.log(result);

const hexArr = arr.map(v => ("00" + v.toString(16)).substr(-2)).join('');
console.log(arr);
console.log(hexArr);
