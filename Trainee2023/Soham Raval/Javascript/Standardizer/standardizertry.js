var COA = [];
var mastercaccount=[];
$(document).ready(function() {
$("#search").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $(".masterdata").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var destinationData = csvJSON(this.responseText);
    var parsedData = JSON.parse(destinationData);
    COA = parsedData;
  }
};
xhttp.open("GET", "Standard CofA.csv", false);
xhttp.send();

function csvJSON(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");
  for(var i = 1; i < lines.length; i++){
      var obj = {};
      var currentline = lines[i].split(",");
      for(var j = 0; j < headers.length; j++){
          obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    result.forEach((element) => {
          if(element.Number!=""){
              $("#standardcofadata").append("<div class='standardcofadata'>"+element.Number +"  "+element.Name + "</div>");
          }        
    
       });
       debugger
  //console.log(result);
  $(".btn").click(function(){
  
    var type = $(this).data("type");
    $("#standardcofadata").html('');
  result.forEach((element) => {
    // var name=element.Name;
    // console.log(name);    
    if(element.Type==type){
        
        console.log(element.Name);
        if(element.Number!=""){
            $("#standardcofadata").append("<div class='standardcofadata'>"+element.Number +"  "+element.Name + "</div>");
        }        
    }    
     });

     var masterdataType="";
     
     $("#masterdata").html('');
     mastercaccount.forEach((element) => {      // var name=element.Name;
      
      if(element.AccountTypeName== masterdataType){
          
          console.log(element.AccountName);
          if(element.Number!=""){
              $("#masterdata").append("<div class='masterdata'>"+element.AccountCode +"  "+element.AccountName + "</div>");
          }        
      }
       });
    
  }); 

  return JSON.stringify(result); 
 


}
new Sortable(mostlikely1,{
  group: {
      name: 'shared',
      pull: 'clone' // To clone: set pull to 'clone'
  },
  animation: 150
});

new Sortable(masterdata, {
  group: {
      name: 'shared',
      pull: 'clone'
  },
  animation: 150
});


// likely
new Sortable(likely1,{
  group: {
      name: 'shared',
      pull: 'clone' // To clone: set pull to 'clone'
  },
  animation: 150
});

new Sortable(masterdata, {
  group: {
      name: 'shared',
      pull: 'clone'
  },
  animation: 150
});
// possible
new Sortable(possible1,{
  group: {
      name: 'shared',
      pull: 'clone' // To clone: set pull to 'clone'
  },
  animation: 150
});

new Sortable(masterdata, {
  group: {
      name: 'shared',
      pull: 'clone'
  },
  animation: 150
});
// mastercsv to json
var sxhttp = new XMLHttpRequest();
sxhttp.open("GET", "MasterChartOfAcounts - Sheet1.csv", false);

sxhttp.onload = function() {  
  if (this.readyState == 4 && this.status == 200) {    
    // console.log(this.responseText);
     mastercsvtojson(this.responseText);   
   // var jsondata = JSON.parse(ddata);
    //mastercaccount = jsondata;    
    console.log("masteraccount",mastercaccount);
  }
};
sxhttp.send();

// conversion csv to json
function mastercsvtojson(csv) {
  
  const lines = csv.split("\n");
 // const result = [];
  const headers = lines[0].split(",");
  for(var i = 1; i < lines.length; i++){
      var obj = {};
      var currentline = lines[i].split(",");
      for(var j = 0; j < headers.length; j++){
          obj[headers[j]] = currentline[j];
      }
      mastercaccount.push(obj);
      // console.log("result",result);
    }
  }
  mastercaccount.forEach((element) => {
    // var mastername=element.AccountName;
    // console.log(mastername);
   
    if(element.Number!=""){
    $("#masterdata").append("<div class='masterdata'>"+element.AccountCode +"  "+element.AccountName + "</div>");
    }
});
  $('.horizontalDesBtn').click(function(){
    // alert("123");
    var masternavbarmatch;
    var navbarvalue= $(this).data("value");
   
   
    $("#masterdata").html('');
    mastercaccount.forEach((element) => {      // var name=element.Name;
     if(element.AccountTypeName== masternavbarmatch){
         
         console.log(element.AccountName);
         if(element.Number!=""){
             $("#masterdata").append("<div class='masterdata'>"+element.AccountCode +"  "+element.AccountName + "</div>");
         }        
     }
      });
      $('#horizontalAll').click(function(){

        mastercaccount.forEach((element) => {      // var name=element.Name;
              
              console.log(element.AccountName);
              if(element.Number!=""){
                  $("#masterdata").append("<div class='masterdata'>"+element.AccountCode +"  "+element.AccountName + "</div>");
              }        
  
           });

      });
  })

  const buttons = document.querySelectorAll('.source_btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

    
 

});