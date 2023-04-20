var COA = [];
var mastercaccount=[];

$(document).ready(function() {
    
//     fetch('Standard CofA - Standard CofA.csv')
//    .then( function(res)
//     // alert("ok");
//     // console.log(res)
//     let data = JSC.csv2Json("Date,Actual,Goal\n1/1/2018,4535,5000");
//     console.log(data);
//     //response => console.log(response)
//    })
   //.then(data => console.log(data))
//    .catch(err => console.log(err))
// read file csv
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
    // console.log(COA);
  }
};
xhttp.open("GET", "standardcofa.csv", false);
xhttp.send();




// conversion csv to json
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
      // var name=element.Name;
      // console.log(name);    
      
          
          // console.log(element.Name);
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
     if(type=="Assets")
     {
      masterdataType="ASSETS";
     }
     if(type=="Liabilities")
     {
      masterdataType="LIABILITIES";
     }
     if(type=="Equity")
     {
      masterdataType="EQUITY/CAPITAL";
     }
     if(type=="Revenue")
     {
      masterdataType="Professional Services Revenue";
     }
     if(type=="COGS")
     {
      masterdataType="Product Revenue";
     }
     if(type=="Expense")
     {
      masterdataType='"Outside (or ""1099"") Professional Services Costs"';
     }
     if(type=="Other Rev & Exp")
     {
      masterdataType="Product Costs";
     }
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
sxhttp.open("GET", "masterchartofaccounts.csv", false);

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
   
    if(navbarvalue=="Assets")
     {
      masternavbarmatch="ASSETS";
     }
     if(navbarvalue=="Liabilities")
     {
      masternavbarmatch="LIABILITIES";
     }
     if(navbarvalue=="Liabilities")
     {
      masternavbarmatch="LIABILITIES";
     }
     if(navbarvalue=="Equity/Capital")
     {
      masternavbarmatch="EQUITY/CAPITAL";
     }
     if(navbarvalue=="Revenue")
     {
      masternavbarmatch="Professional Services Revenue";
     }
     if(navbarvalue=="CoGS")
     {
      masternavbarmatch="Product Revenue";
     }
     if(navbarvalue=="Expense")
     {
      masternavbarmatch='"Outside (or ""1099"") Professional Services Costs"';
     }
     if(navbarvalue=="other")
     {
      masternavbarmatch="Product Costs";
     }
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

    $('.btn').click(function() {
        $(".btn").removeClass("active");
            $(this).addClass("active");
        // var value = $(this).attr('class');
        // // alert(value);
        // if (value == "btn") {
            
        // }
       
    });
    // $('button').on('click',function(){
    //     $('button').removeClass("horizontalDesBtn");
    //     $(this).addClass("horizontalDesBtn");
    // }); 
    
    $("#forwordbtn").click(function(){
        document.getElementById('Desbuttonslist').scrollLeft -= 100;
      })
      $("#backwordbtn").click(function(){
        document.getElementById('Desbuttonslist').scrollLeft += 100;
      })

});
