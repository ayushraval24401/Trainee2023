

let s, t, u = 6;
let rows="";

for (s = 1; s <= u; s++) {
    for(t=u;t>=u-s;t--)
    {
        rows += " ";
    }
    for (t = u; t >= s; t--) {
        rows += " *";
      }
      rows += "\n";
}

console.log(rows);

