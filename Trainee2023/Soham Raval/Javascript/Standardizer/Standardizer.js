var obj = {};
var getvalueofcsv = [];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  debugger
  if (this.readyState == 4 && this.status == 200) {
    console.log("karan  : " + this.responseText)
    var destinationData = csvJSON(this.responseText);
    getvalueofcsv = destinationData;
    var parsedData = JSON.parse(destinationData);
    console.log(parsedData);
    var list = document.getElementById("list");
    for (var i = 0; i < parsedData.length; i++) {
      // console.log(item.AccountTypeName)
      var item = parsedData[i];
      var listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = item.AccountCode + " - " + item.AccountName;
      console.log(item.AccountTypeName)
      list.appendChild(listItem);
    }
  }
};
xhttp.open("GET", "MasterChartOfAcounts - Sheet1.csv", false);
xhttp.send();
function csvJSON(csv) {
  debugger
  console.log(csv)
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");
  var nameIndex = headers.indexOf("AccountName");
  var numberIndex = headers.indexOf("AccountCode");
  var AccountTypeIndex = headers.indexOf("AccountTypeName")
  for(var i = 1; i < lines.length; i++){
       obj = {};
       console.log(this.responseText)

      var currentline = lines[i].split(",");
      obj["AccountName"] = currentline[nameIndex];
      obj["AccountCode"] = currentline[numberIndex];
      obj["AccountType"] = currentline[AccountTypeIndex];
      result.push(obj);
      // console.log(obj["AccountType"])
  } 
  // $(".ASSETS").click(function(csv){
  //   debugger

  //   alert("The paragraph was clicked.");
  //   document.getElementById("list").innerHTML=""
  //   for(var i = 1; i < lines.length; i++){
  //     obj = {};
  //    var currentline = lines[i].split(",");
  //    obj["AccountName"] = currentline[nameIndex];
  //    obj["AccountCode"] = currentline[numberIndex];
  //    obj["AccountType"] = currentline[AccountTypeIndex];
  //    result.push(obj);
  //    console.log(obj["AccountType"]);
  //    console.log("try : " + getvalueofcsv);
  //     var destinationData = csvJSON(getvalueofcsv);
  //     var parsedData = JSON.parse(destinationData);
  //     console.log(parsedData);
  //     var list = document.getElementById("list");
  //     for (var i = 0; i < parsedData.length; i++) {
  //     if(obj["AccountType"]=="ASSETS"){
  //       var item = parsedData[i];
  //       var listItem = document.createElement("li");
  //       listItem.classList.add("list-item");
  //       listItem.innerHTML = item.AccountCode + " - " + item.AccountName;
  //       console.log(item.AccountTypeName)
  //       list.appendChild(listItem);
  //     }
  //   }
  // } 
  // });


  var nameAndNumberData = result.map(function(item) {
    return {
      AccountName: item.AccountName,
      AccountCode: item.AccountCode,
      // AccountTypeName:item.AccountTypeName
    };
  });
  console.log("prince : " + JSON.stringify(nameAndNumberData));
  return JSON.stringify(nameAndNumberData);
}

// var button = document.querySelector(".source_btn");
// button.addEventListener("click", function() {
//   var buttonValue = button.value;
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       var destinationData = csvJSON(this.responseText, buttonValue);
//       var parsedData = JSON.parse(destinationData);
//       console.log(parsedData);
//       var list = document.getElementById("list");
//       list.innerHTML = "";
//       for (var i = 0; i < parsedData.length; i++) {
//         var item = parsedData[i];
//         var listItem = document.createElement("li");
//         listItem.classList.add("list-item");
//         listItem.innerHTML = item.AccountName + " - " + item.AccountCode;
//         list.appendChild(listItem);
//       }
//     }
//   };
//   xhttp.open("GET", "MasterChartOfAcounts - Sheet1.csv", false);
//   xhttp.send();
// });
// function csvJSON(csv, buttonValue) {
//   var lines = csv.split("\n");
//   var result = [];
//   var headers = lines[0].split(",");
//   var nameIndex = headers.indexOf("AccountName");
//   var typeIndex = headers.indexOf("AccountTypeName");
//   var numAssetsIndex = headers.indexOf("AccountCode");
//   for(var i = 1; i < lines.length; i++){
//       var obj = {};
//       var currentline = lines[i].split(",");
//       if (currentline[typeIndex] === buttonValue) {
//         obj["AccountName"] = currentline[nameIndex];
//         obj["AccountCode"] = currentline[numAssetsIndex];
//         result.push(obj);
//       }
//   }
//   return JSON.stringify(result);
// }


var balancesheetxhttp = new XMLHttpRequest();
balancesheetxhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var balancesheetdestinationdata = csvJSON2(this.responseText);
    var balancesheetparsedata = JSON.parse(balancesheetdestinationdata);
    console.log(balancesheetparsedata);
    var list = document.getElementById("Balancesheet_list");
    for (var i = 0; i < balancesheetparsedata.length; i++) {
      var item = balancesheetparsedata[i];
      var listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = item.Number + " - " + item.Name;
      list.appendChild(listItem);
    }
  }
};
balancesheetxhttp.open("GET", "Standard CofA.csv", false);
balancesheetxhttp.send();

function csvJSON2(csv) {
  var line = csv.split("\n");
  var results = [];
  var header = line[0].split(",");
  var NumberIndex = header.indexOf("Number");
  var NameIndex = header.indexOf("Name");
  for(var i = 1; i < line.length; i++){
      var objects = {};
      var currentlines = line[i].split(",");
      objects["Number"] = currentlines[NumberIndex];
      objects["Name"] = currentlines[NameIndex];
      results.push(objects);
  }
  var NameAndNumberData = results.map(function(item) {
    return {
      Number: item.Number,
      Name: item.Name
    };
  });
  return JSON.stringify(NameAndNumberData);
}

$(document).ready(function(){
  $('#btn-nav-previous').click(function(){
      $(".menu-inner-box").animate({scrollLeft: "-=100px"});
  });
  
  $('#btn-nav-next').click(function(){
      $(".menu-inner-box").animate({scrollLeft: "+=100px"});
  });


  $(".search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".destination_account_structure ul li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
$('.search').on('search', function() {
  if ($(this).val() === '') {
      $('#list li').show();
  }
});

// 
$(".source_btn").click(function(){
  var attribute= $(this).data("value");
  $("#list").html('');
  console.log(attribute)
result.forEach((element) => {
  debugger
  console.log("s",element.Name)
  if(element.Type==attribute){
      console.log(element.Name);
      if(element.Number!=""){
          $("#list").append("<div class='standardcofadata'>"+element.Number +"  "+element.Name + "</div>");
      }        
  }    
   });
  });
});

// var standardizer_btn = document.getElementById("standardizer_btn");

// standardizer_btn.onclick = function() {
//   standardizer_btn.style.background = "green";  
// }
const buttons = document.querySelectorAll('.source_btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var destinationData = csvJSON(this.responseText);
//     var parsedData = JSON.parse(destinationData);
//     console.log(parsedData);
//     var list = document.getElementById("list");
//     for (var i = 0; i < parsedData.length; i++) {
//       var item = parsedData[i];
//       var listItem = document.createElement("li");
//       listItem.classList.add("list-item");
//       listItem.innerHTML = item.AccountName + " - " + item.AccountCode;
//       list.appendChild(listItem);
//     }
//   }
// };
// xhttp.open("GET", "MasterChartOfAcounts - Sheet1.csv", false);
// xhttp.send();

// function csvJSON(csv) {
//   var lines = csv.split("\n");
//   var result = [];
//   var headers = lines[0].split(",");
//   var nameIndex = headers.indexOf("AccountName");
//   var numberIndex = headers.indexOf("AccountCode");
//   for(var i = 1; i < lines.length; i++){
//       var obj = {};
//       var currentline = lines[i].split(",");
//       obj["AccountName"] = currentline[nameIndex];
//       obj["AccountCode"] = currentline[numberIndex];
//       result.push(obj);
//   }
//   var nameAndNumberData = result.map(function(item) {
//     return {
//       AccountName: item.AccountName,
//       AccountCode: item.AccountCode
//     };
//   });
//   return JSON.stringify(nameAndNumberData);
// }




// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var destinationData = csvJSON(this.responseText);
//     var parsedData = JSON.parse(destinationData);
//     console.log(parsedData);
//     var list = document.getElementById("list");
//     for (var i = 0; i < parsedData.length; i++) {
//       var item = parsedData[i];
//       var listItem = document.createElement("li");
//       listItem.classList.add("list-item");
//       listItem.innerHTML = item.AccountName + " - " + item.AccountCode;
//       list.appendChild(listItem);
//     }
//   }
// };
// xhttp.open("GET", "MasterChartOfAcounts - Sheet1.csv", false);
// xhttp.send();

// function csvJSON(csv) {
//   var lines = csv.split("\n");
//   var result = [];
//   var headers = lines[0].split(",");
//   var nameIndex = headers.indexOf("AccountName");
//   var numberIndex = headers.indexOf("AccountCode");
//   for(var i = 1; i < lines.length; i++){
//       var obj = {};
//       var currentline = lines[i].split(",");
//       obj["AccountName"] = currentline[nameIndex];
//       obj["AccountCode"] = currentline[numberIndex];
//       result.push(obj);
//   }
//   var nameAndNumberData = result.map(function(item) {
//     return {
//       AccountName: item.AccountName,
//       AccountCode: item.AccountCode
//     };
//   });
//   return JSON.stringify(nameAndNumberData);
// }

// var balancesheetxhttp = new XMLHttpRequest();
// balancesheetxhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var balancesheetdestinationdata = csvJSON2(this.responseText);
//     var balancesheetparsedata = JSON.parse(balancesheetdestinationdata);
//     console.log(balancesheetparsedata);
//     var list = document.getElementById("Balancesheet_list");
//     for (var i = 0; i < balancesheetparsedata.length; i++) {
//       var item = balancesheetparsedata[i];
//       var listItem = document.createElement("li");
//       listItem.classList.add("list-item");
//       listItem.innerHTML = item.Number + " - " + item.Name;
//       list.appendChild(listItem);
//     }
//   }
// };
// balancesheetxhttp.open("GET", "Standard CofA.csv", false);
// balancesheetxhttp.send();

// function csvJSON2(csv) {
//   var line = csv.split("\n");
//   var results = [];
//   var header = line[0].split(",");
//   var NumberIndex = header.indexOf("Number");
//   var NameIndex = header.indexOf("Name");
//   for(var i = 1; i < line.length; i++){
//       var objects = {};
//       var currentlines = line[i].split(",");
//       objects["Number"] = currentlines[NumberIndex];
//       objects["Name"] = currentlines[NameIndex];
//       results.push(objects);
//   }
//   var NameAndNumberData = results.map(function(item) {
//     return {
//       Number: item.Number,
//       Name: item.Name
//     };
//   });
//   return JSON.stringify(NameAndNumberData);
// }



// $(document).ready(function(){
//   $('#btn-nav-previous').click(function(){
//       $(".menu-inner-box").animate({scrollLeft: "-=100px"});
//   });
  
//   $('#btn-nav-next').click(function(){
//       $(".menu-inner-box").animate({scrollLeft: "+=100px"});
//   });
// });
