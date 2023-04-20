function generatePyrami123() {
    var totalNumberofRows = 5;
    var output = '';
    for (var i = 1; i <= totalNumberofRows; i++) {
        for (var j = 1; j <= i; j++) {
            output += j + '  ';//output=output+j
        }
        console.log(output);
        output = '';
    }
}
generatePyrami123();

// function generatePyrami() {
//     var totalNumberofRows = 6;
//     var output = '';
//     for (var i = 1; i <= totalNumberofRows; i++) {
//         for (var j = 1; j <= i; j++) {
//             output = output + '*' + ' '
//         }
//         console.log(output);
//         output = '';
//     }
// }
// generatePyrami();

// function generatePyrami() {
//     var totalNumberofRows = 6;
//     var output = '';
//     for (var i = 1; i <= totalNumberofRows; i++) {
//         for (var j = 6; j >= i; j--) {
//             output = output + '*' + ' '
//         }
//         console.log(output);
//         output = '';
//     }
// }
// generatePyrami();

// function generatePyrami() {
//     for (let i = 1; i <= 6; i++) {
//         let row = "";
        
//         for (let j = 1; j <= 6 - i; j++) {
//           row += " ";
//         }
        
//         for (let k = 1; k <= i; k++) {
//           row += "* ";
//         }
//         console.log(row);
//       }
      
// }
// generatePyrami();

// function generatePyrami() {
//     for (let i = 6; i >= 1; i--) {
//         let row = "";
        
//         for (let j = 1; j <= 6 - i; j++) {
//           row += " ";
//         }
        
//         for (let k = 1; k <= i; k++) {
//           row += "* ";
//         }
//         console.log(row);
//       }
      
// }
// generatePyrami();
