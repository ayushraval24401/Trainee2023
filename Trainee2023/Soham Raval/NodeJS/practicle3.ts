

let o, p, q = 6;
let row = "";

for (o = 1; o <= q; o++) {
  for (p = 0; p <= q - o; p++) {
    row += " ";
  }
  for (let p = 0; p < o; p++) {
    row += "* ";
  }
  row += "\n";
}

console.log(row);


