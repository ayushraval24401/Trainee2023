function csvJSON(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");
  for(var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    for(var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    } 
    result.push(obj);
  }
  return result;
}

$(document).ready(function() { 

// Load the CSV data
$.get('./Files/Standard CofA (1).csv', function(csvData) {
  // Convert to JSON
  var SourceData = csvJSON(csvData);
  
  
  // Get the scrollable div element for the data
  var SourceDiv = $("#SourceAccountStructure");
  
  // Loop through the data array
  for (var i = 0; i < SourceData.length; i++) {
    var data = SourceData[i];
    
    // Check if the 'Number' and 'Name' fields exist and are not empty
    if (data.hasOwnProperty('Number') && data.Number !== '' && 
        data.hasOwnProperty('Name') && data.Name !== '') {
      
      // create a new <div> element with the desired text and icons
      var text = data.Number + "  " + data.Name;
      var iconTick = $("<i>").addClass("material-icons").text("done_all").css("margin-left","2px");
      var iconhistory = $("<i>").addClass("material-icons").text("history").css("margin-left","2px");
      var iconsContainer = $("<div>").append(iconTick).append(iconhistory);
      var Sourcelist = $("<div>").addClass("Masterclass").css("display", "flex").css("justify-content", "space-between");
      var textContainer = $("<div>").text(text);
      Sourcelist.append(textContainer).append(iconsContainer);
      
      // Append the new <div> element to the scrollable div
      SourceDiv.append(Sourcelist);
    }
  }
  
 
});

  
  // Load the CSV data
  $.get('./Files/MasterChartOfAcounts - Sheet1.csv', function(csvData) {
    // Convert to JSON
    var MasterData = csvJSON(csvData);

    // Get the scrollable div element
    var MasterDiv = $("#DestinationAccountStructure");
  
    // Loop through the masterdata array
    for (var i = 0; i < MasterData.length; i++) {
      // Get the current object
      var data = MasterData[i];
  
      // Check if Number and Name properties exist and are not empty
      if (data.hasOwnProperty('AccountCode')
      && data.AccountCode !== '' 
      && data.hasOwnProperty('AccountName') 
      && data.AccountName !== '') {
        // <div> element with the desired text
        var text = "⠿" + " " + data.AccountCode + "--" + data.AccountName;
        var Masterlist = $("<div>").text(text).addClass("Masterclass");
  
        // Make the Masterlist draggable
        Masterlist.draggable();
  
        // Append the new <p> element to the scrollable div
        MasterDiv.append(Masterlist);
      }
    }
    $('#MasterlistSearch').on('input', function() {
      var value = $(this).val().toLowerCase();
      MasterDiv.children('.Masterclass').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    
  });


  $('.toggle').click(function(){
    $('.nav').toggleClass("justify-content-end");
    $('.toggle').toggleClass("text-light");
});
  

});





























// $.get('./Files/Standard CofA (1).csv', function(csvData) {
//   // Convert to JSON
//   var SourceData = csvJSON(csvData);
//   // Get the scrollable div element
//   var scrollableDiv = $("#SourceAccountStructure");
  
//   // Initialize variables
//   var currentGroup = null;
//   var groupData = {};

//   // Loop through the masterdata array
//   for (var i = 0; i < SourceData.length; i++) {
//     // Get the current object
//     var data = SourceData[i];

//     // Check if group has changed
//     if (data.Group !== currentGroup) {
//       // Create a new div for the previous group and append it to the scrollable div
//       if (currentGroup !== null) {
//         var groupDiv = $("<div>").addClass("group");
//         groupDiv.append($("<p>").text(currentGroup));
//         var groupDataDiv = $("<div>").addClass("group-data");
//         // Loop through the group data and create divs for each item in the format " " + " " + Name + "--" + Number
//         for (var key in groupData) {
//           var itemDiv = $("<div>").addClass("item");
//           itemDiv.append($("<div>").addClass("name").text(" " + " " + groupData[key].Name + "--" + groupData[key].Number));
//           groupDataDiv.append(itemDiv);
//         }
//         groupDiv.append(groupDataDiv);
//         scrollableDiv.append(groupDiv);
//       }

//       // Create a new group object for the current group
//       currentGroup = data.Group;
//       groupData = {};
//     }

//     // Add the object's Name and Number properties to the group object
//     groupData[data.Name] = { Name: data.Name, Number: data.Number };
//   }

//   // Create a new div for the last group and append it to the scrollable div
//   if (currentGroup !== null) {
//     var groupDiv = $("<div>").addClass("group");
//     groupDiv.append($("<p>").text(currentGroup));
//     var groupDataDiv = $("<div>").addClass("group-data");
//     // Loop through the group data and create divs for each item in the format " " + " " + Name + "--" + Number
//     for (var key in groupData) {
//       var itemDiv = $("<div>").addClass("item");
//       itemDiv.append($("<div>").addClass("name").text(" " + " " + groupData[key].Name + "--" + groupData[key].Number));
//       groupDataDiv.append(itemDiv);
//     }
//     groupDiv.append(groupDataDiv);
//     scrollableDiv.append(groupDiv);
//   }
// });