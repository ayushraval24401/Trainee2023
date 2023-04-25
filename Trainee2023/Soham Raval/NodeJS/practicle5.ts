

let f = 6;
let number = "";
for (let i = 1; i <= f; i++) {
  for (let j = 1; j <= i; j++) {
    number += j;
  }
  number += "\n";
}
console.log(number);