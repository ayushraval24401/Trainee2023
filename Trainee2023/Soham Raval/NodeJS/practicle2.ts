let z: number = 6;
let str: string = "";
for (let i:number = 1; i <= z; i++) {
  for (let j:number = z; j >= i; j--) {
    str += "*";
  }
  str += "\n";
}
console.log(str);