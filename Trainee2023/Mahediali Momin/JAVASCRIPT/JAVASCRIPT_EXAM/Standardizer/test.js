// $(document).ready(function () {

//     $('.header-button').click(function () {
//         var btnValue = $(this).val();
//         alert(btnValue);
//         $('#section1').html('');
//         $.get('Standard CofA.csv', function (data) {

//             var lines = data.split('\n');

//             // remove the first line (header) of the file
//             var headers = lines.shift().split(',');

//             // map the remaining lines into an array of objects
            // var data = lines.map(function (line) {
//                 var values = line.split(',');
//                 var obj = {};

//                 // loop through all the columns in the row
//                 for (var i = 0; i < headers.length; i++) {
//                     // set the key-value pair in the object
//                     obj[headers[i]] = values[i];
//                 }
//                 return obj;
//             });

//             // do something with the data
//             console.log(data);
//             var ul = document.getElementById("section1");
//             // parse lines
//             data.forEach(function getvalues(sourceAccountData) {
//                 debugger
//                 if (btnValue == sourceAccountData.Type) {
//                     var li = document.createElement("li");
//                     li.className = "list-group-item border";
//                     li.innerHTML = sourceAccountData.Number + " -- " + sourceAccountData.Name;
//                     ul.appendChild(li);
//                 }
//             });
//         });
//     });


//     $('.header-button').click(function () {
//         var btnValue = $(this).attr('value');
//         alert(btnValue);
//         $('#section2').html('');
//         $.get('MasterChartOfAcounts - Sheet1.csv', function (data) {

//             var lines = data.split('\n');

//             // remove the first line (header) of the file
//             var headers = lines.shift().split(',');

//             // map the remaining lines into an array of objects
//             var data = lines.map(function (line) {
//                 var values = line.split(',');
//                 var obj = {};

//                 // loop through all the columns in the row
//                 for (var i = 0; i < headers.length; i++) {
//                     // set the key-value pair in the object
//                     obj[headers[i]] = values[i];
//                 }
//                 return obj;
//             });

//             // do something with the data
//             console.log(data);
//             var ul = document.getElementById("section2");
//             // parse lines
//             data.forEach(function getvalues(sourceAccountData) {
//                 debugger
//                 if (btnValue == sourceAccountData.AccountTypeName) {
//                     var li = document.createElement("li");
//                     li.className = "list-group-item border";
//                     li.innerHTML = sourceAccountData.AccountCode + " -- " + sourceAccountData.AccountName;
//                     ul.appendChild(li);
//                 }
//             });
//         });
//     });
// });






// $(document).ready(function () {

//     $('.header-button').click(function () {
//         var btnValue = $(this).data('btn-type');
//         $('#section1').html('');
//         $.get('Standard CofA.csv', function (data) {

//             var lines = data.split('\n');

//             // remove the first line (header) of the file
//             var headers = lines.shift().split(',');

//             // map the remaining lines into an array of objects
//             var data = lines.map(function (line) {
//                 var values = line.split(',');
//                 var obj = {};

//                 // loop through all the columns in the row
//                 for (var i = 0; i < headers.length; i++) {
//                     // set the key-value pair in the object
//                     obj[headers[i]] = values[i];
//                 }
//                 return obj;
//             });

//             // do something with the data
//             console.log(data);
//             var ul = document.getElementById("section1");
//             // parse lines
//             data.forEach(function getvalues(sourceAccountData) {
//                 if (btnValue == sourceAccountData.Type) {
//                     var li = document.createElement("li");
//                     li.className = "list-group-item border";
//                     li.innerHTML = sourceAccountData.Number + " -- " + sourceAccountData.Name;
//                     ul.appendChild(li);
//                 }
//             });
//         });

//         $('#section2').html('');
//         $.get('MasterChartOfAcounts - Sheet1.csv', function (data) {

//             var lines = data.split('\n');

//             // remove the first line (header) of the file
//             var headers = lines.shift().split(',');

//             // map the remaining lines into an array of objects
//             var data = lines.map(function (line) {
//                 var values = line.split(',');
//                 var obj = {};

//                 // loop through all the columns in the row
//                 for (var i = 0; i < headers.length; i++) {
//                     // set the key-value pair in the object
//                     obj[headers[i]] = values[i];
//                 }
//                 return obj;
//             });

//             console.log(data);
//             var ul = document.getElementById("section2");
//             // parse lines
//             data.forEach(function getvalues(sourceAccountData) {
//                 if (btnValue == sourceAccountData.AccountDataType) {
//                     var li = document.createElement("li");
//                     li.className = "list-group-item border";
//                     li.innerHTML = sourceAccountData.AccountCode + " -- " + sourceAccountData.AccountName;
//                     ul.appendChild(li);
//                 }
//             });
//         });

//     });


// });

















// // Add click event listener to all buttons with class 'header-button'
// // const buttons = document.querySelectorAll('.header-button');
// // buttons.forEach(button => {
// //     button.addEventListener('click', () => {
// //         const btnType = button.dataset.btnType; // Get the data attribute value of the clicked button
// //         const csvFilePath = `Standard CofA.csv`; // Construct the path of the CSV file based on the button type
// //         fetch(csvFilePath)
// //             .then(response => response.text())
// //             .then(data => {
// //                 const lines = data.split('\n');
// //                 const ulElement = document.getElementById('section1');
// //                 ulElement.innerHTML = ''; // Clear the list before adding new items
// //                 lines.forEach(line => {
// //                     const values = line.split(',');
// //                     const number = values[3];
// //                     const name = values[4];
// //                     const liElement = document.createElement('li');
// //                     liElement.classList.add('list-group-item');
// //                     liElement.textContent = `${number} - ${name}`; // Display the number and name
// //                     ulElement.appendChild(liElement);
// //                 });
// //             })
// //             .catch(error => console.error(`Failed to load data from ${csvFilePath}: ${error}`));
// //     });
// // });




$(".all").click(function(){debugger

    document.getElementById('section2').innerHTML =""
    document.getElementById('section1').innerHTML =""
    
    destinationData.forEach((item) => {
      var liElement = document.createElement('li');
      liElement.textContent = `${item.AccountCode} ${'--'} ${item.AccountName} `;
      liElement.classList.add('list-group-item')
      parentElement.appendChild(liElement);
      
    });
    sourcedata.forEach((item) => {
  
      var liElement = document.createElement('li');
      liElement.textContent = `${item.Number} ${'--'} ${item.Name} `;
      liElement.classList.add('list-group-item')
      parent.appendChild(liElement);
      
    });
  
  });
    
  $(".Assets").click(function(){debugger
  
    document.getElementById('section2').innerHTML =""
    document.getElementById('section1').innerHTML =""
    
    destinationData.forEach((item) => {
      if(item.AccountTypeName=="ASSETS"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.AccountCode} ${'--'} ${item.AccountName} `;
      liElement.classList.add('list-group-item')
      parentElement.appendChild(liElement);
      } 
    });
    sourcedata.forEach((item) => {
  
      if(item.Type=="Assets"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.Number} ${'--'} ${item.Name} `;
      liElement.classList.add('list-group-item')
      parent.appendChild(liElement);
      }
    });
  
  });
  $(".Liability").click(function(){
  
    document.getElementById('section2').innerHTML =""  
    document.getElementById('section1').innerHTML =""
  
    destinationData.forEach((item) => {
  
      if(item.AccountTypeName=="LIABILITIES"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.AccountCode} ${'--'} ${item.AccountName} `;
      liElement.classList.add('list-group-item')
      parentElement.appendChild(liElement);
      } 
    });
  
    sourcedata.forEach((item) => {
  
      if(item.Type=="Liabilities"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.Number} ${'--'} ${item.Name} `;
      liElement.classList.add('list-group-item')
      parent.appendChild(liElement);
      }
    });
  
  });
  
  $(".EquityCapital").click(function(){
  
    document.getElementById('section2').innerHTML =""  
    document.getElementById('section1').innerHTML =""
  
    destinationData.forEach((item) => {
      if(item.AccountTypeName=="EQUITY/CAPITAL"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.AccountCode} ${'--'} ${item.AccountName} `;
      liElement.classList.add('list-group-item')
      parentElement.appendChild(liElement);
      } 
    });
    sourcedata.forEach((item) => {
      if(item.Type=="Equity"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.Number} ${'--'} ${item.Name} `;
      liElement.classList.add('list-group-item')
      parent.appendChild(liElement);
      }
    });
  });
  
  $(".Revenue").click(function(){
  
    document.getElementById('section2').innerHTML =""  
    document.getElementById('section1').innerHTML =""
  
    destinationData.forEach((item) => {
      if(item.AccountTypeName=="Professional Services Revenue"||item.AccountTypeName=="Product Revenue"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.AccountCode} ${'--'} ${item.AccountName} `;
      liElement.classList.add('list-group-item')
      parentElement.appendChild(liElement);
      } 
    });
    sourcedata.forEach((item) => {
      if(item.Type=="Revenue"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.Number} ${'--'} ${item.Name} `;
      liElement.classList.add('list-group-item')
      parent.appendChild(liElement);
      }
    });
  });
  
  $(".CoGS").click(function(){
  
    document.getElementById('section2').innerHTML =""  
    document.getElementById('section1').innerHTML =""
  
    sourcedata.forEach((item) => {
      if(item.Type=="COGS"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.Number} ${'--'} ${item.Name} `;
      liElement.classList.add('list-group-item')
      parent.appendChild(liElement);
      }
    });
  });
  
  $(".GAExpenses").click(function(){
  
    document.getElementById('section2').innerHTML =""  
    document.getElementById('section1').innerHTML =""
  
    sourcedata.forEach((item) => {
      if(item.Type=="Expense"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.Number} ${'--'} ${item.Name} `;
      liElement.classList.add('list-group-item')
      parent.appendChild(liElement);
      }
    });
  });
  
  $(".OtherRE").click(function(){
  
    document.getElementById('section2').innerHTML =""  
    document.getElementById('section1').innerHTML =""
  
    destinationData.forEach((item) => {
      if(item.AccountTypeName=="Labor Expense"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.AccountCode} ${'--'} ${item.AccountName} `;
      liElement.classList.add('list-group-item')
      parentElement.appendChild(liElement);
      } 
    });
    sourcedata.forEach((item) => {
      if(item.Type=="Other Rev & Exp"){
      var liElement = document.createElement('li');
      liElement.textContent = `${item.Number} ${'--'} ${item.Name} `;
      liElement.classList.add('list-group-item')
      parent.appendChild(liElement);
      }
    });
  });