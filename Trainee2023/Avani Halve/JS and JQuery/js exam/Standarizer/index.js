// For Destination Account Struture
// Make an XMLHttpRequest to fetch the CSV file

function convertcsv(csv) {
   var csvFile = csv.split("\n");
   var csvarray = [];
   var headers = csvFile[0].split(",");
   for (var i = 1; i < csvFile.length; i++) {
      var csvobject = {};
      var currentline = csvFile[i].split(",");
      for (var j = 0; j < headers.length; j++) {
         csvobject[headers[j]] = currentline[j];
      }
      csvarray.push(csvobject);
   }
   return csvarray;
}

$(".btnActive").click(function () {
   // remove "active" class from all buttons
   $(".btnActive").removeClass("btn-active");

   // add "active" class to clicked button
   $(this).addClass("btn-active");
});

$(".getAccountBtnValue").click(function () {
   $("#SourceAccount").html("");
   $("#MostLikelyDrop").html("");
   $("#LikelyDrop").html("");
   $("#PossibleDrop").html("");
   var menuvalue = $(this).attr("value");
   var masterNavbar = menuvalue.toLowerCase();

   $.get("./ExcelSheets/MasterChartOfAcounts.csv", function (data) {
      $("#DestinationAccount").html("");
      var jsonData = convertcsv(data);
      var html = "";
      jsonData.forEach(function getvalues(tableValues) {
         html += '<div class="rounded draggable">';

         if (masterNavbar == "all" && tableValues) {
            html +=
               '<p class="p-2 mb-2 dynamicDiv rounded"> ⠿' +
               tableValues.AccountCode +
               '<span class="">--' +
               tableValues.AccountName +
               "</span>" +
               "</p>";
         } else if (tableValues.AccountTypeName.toLowerCase().includes(masterNavbar)) {
            html +=
               '<p class="p-2 mb-2 dynamicDiv rounded"> ⠿' +
               tableValues.AccountCode +
               '<span class="">--' +
               tableValues.AccountName +
               "</span>" +
               "</p>";
         }
         html += "</div>";
      });
      $("#DestinationAccount").append(html);
   });
   var menubtn = $(this).val();
   $.get("./ExcelSheets/StandardCofA.csv", function (data) {
      var jsonData = convertcsv(data);
      var html = "";
      var mostLikelyTable = "";
      var LikelyTable = "";
      var PossibleTable = "";

      jsonData.forEach(function getvalues(tableValues) {
         html += '<div class="rounded">';
         mostLikelyTable += '<div class="rounded droppable" >';
         LikelyTable += '<div class="rounded droppable">';
         PossibleTable += '<div class="rounded droppable">';

         if (menubtn == tableValues.Type && (!tableValues.Number == "" || tableValues.Name == "")) {
            html +=
               '<p class="p-2 mb-2 dynamicDiv rounded"  id="' +
               tableValues.Number +
               '">' +
               tableValues.Number +
               '<span class="px-2">' +
               tableValues.Name +
               "<span class='bi-check-all icons' ></span><span class='bi-clock-history icons' ></span></span>" +
               "</p>";
            mostLikelyTable += '<p class="p-2 mb-2 dynamicDiv rounded" id="mostLikely_' + tableValues.Number + '"><span class="px-2"></span></p>';
            LikelyTable += '<p class="p-2 mb-2 dynamicDiv rounded"  id="likely_' + tableValues.Number + '"><span class="px-2"></span></p>';
            PossibleTable += '<p class="p-2 mb-2 dynamicDiv rounded"  id="possible_' + tableValues.Number + '"><span class="px-2"></span></p>';
         }
         html += "</div>";
         mostLikelyTable += "</div>";
         LikelyTable += "</div>";
         PossibleTable += "</div>";
      });

      $("#SourceAccount").append(html);
      $("#MostLikelyDrop").append(mostLikelyTable);
      $("#LikelyDrop").append(LikelyTable);
      $("#PossibleDrop").append(PossibleTable);

      $("#MostLikelyDrop").each(function () {
         new Sortable(this, {
            group: "shared",
            animation: 250,
         });
      });

      $("#LikelyDrop").each(function () {
         new Sortable(this, {
            group: "shared",
            animation: 250,
         });
      });

      $("#PossibleDrop").each(function () {
         new Sortable(this, {
            group: "shared",
            animation: 250,
         });
      });
   });

   $(this).attr("value") == menubtn;
});
const DestinationAccount1 = document.getElementById("DestinationAccount");
new Sortable(DestinationAccount1, {
   group: {
      name: "shared",
      pull: "clone",
      put: false,
   },
   animation: 250,
   sort: false,
});

$(".masterMenu").click(function () {
   var menuvalue = $(this).attr("value");
   var masterNavbar = menuvalue.toLowerCase();

   $.get("./ExcelSheets/MasterChartOfAcounts.csv", function (data) {
      $("#DestinationAccount").html("");
      var jsonData = convertcsv(data);
      var html = "";
      jsonData.forEach(function getvalues(tableValues) {
         html += '<div class="rounded draggable">';

         if (masterNavbar == "all" && tableValues) {
            html +=
               '<p class="p-2 mb-2 dynamicDiv rounded"> ⠿' +
               tableValues.AccountCode +
               '<span class="">--' +
               tableValues.AccountName +
               "</span>" +
               "</p>";
         } else if (tableValues.AccountTypeName.toLowerCase().includes(masterNavbar)) {
            html +=
               '<p class="p-2 mb-2 dynamicDiv rounded"> ⠿' +
               tableValues.AccountCode +
               '<span class="">--' +
               tableValues.AccountName +
               "</span>" +
               "</p>";
         }
         html += "</div>";
      });
      $("#DestinationAccount").append(html);
   });

   //Search
   $("#search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#DestinationAccount div").filter(function () {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
   });

   $(".submitBtn").click(function () {});
});

const masterNavBar = document.getElementById("masterNavBar");
const scrollLeftBtn = document.getElementById("scroll-Left-btn");
const scrollrightBtn = document.getElementById("scroll-right-btn");

// Set up button click handlers
scrollLeftBtn.addEventListener("click", scrollUp);
scrollrightBtn.addEventListener("click", scrollDown);

function scrollUp() {
   masterNavBar.scrollLeft += 70;
}

function scrollDown() {
   masterNavBar.scrollLeft -= 70;
}

// var destinationAcc = document.getElementById("DestinationAccount");
// var DestinationData = JSON.parse(masterDataString);

// var SourceBtnData = JSON.parse(StandardDataString);
