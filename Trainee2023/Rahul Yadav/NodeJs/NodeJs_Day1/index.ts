// let firstName: string = 'Rahul';
// console.log(typeof firstName);
// console.log(firstName);

console.log("---- Pattern 1 ---- \n");
for (let i: number = 0; i < 6; i++) {
  for (let j: number = 0; j <= i; j++) {
    process.stdout.write("* ");
  }
  console.log();
}

console.log("---- Pattern 2 ----\n");
for (let i: number = 6; i > 0; i--) {
  for (let j: number = 0; j < i; j++) {
    process.stdout.write("* ");
  }
  console.log();
}

console.log("---- Pattern 3 ----\n");
for (let i: number = 1; i <= 6; i++) {
  process.stdout.write('');
  for (let j: number = 1; j <= 6 - i; j++) {
    process.stdout.write(' ');
  }
  for (let k: number = 1; k <= i; k++) {
    process.stdout.write('* ');
  }
  console.log();
}

console.log("---- Pattern 4 ----\n");
for (let i: number = 6; i >= 1; i--) {
  process.stdout.write('');
  for (let j: number = 1; j <= 6 - i; j++) {
    process.stdout.write(' ');
  }
  for (let k: number = 1; k <= i; k++) {
    process.stdout.write('* ');
  }
  console.log();
}

console.log("---- Pattern 5 ----\n");
for (let i: number = 1; i < 6; i++) {
  for (let j: number = 1; j <= i; j++) {
    process.stdout.write(`${j} `);
  }
  console.log();
}
