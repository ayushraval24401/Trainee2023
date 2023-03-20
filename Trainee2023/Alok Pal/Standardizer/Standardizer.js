// For Destination Account Struture
// Make an XMLHttpRequest to fetch the CSV file
const xhr = new XMLHttpRequest();
xhr.open("GET", "ChartAccount.csv", false);

var masterChartAccountDataString;
var masterChartAccountObject;
var masterChartAccountData = [];
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    const csv = xhr.responseText;

    // Parse the CSV file using the split() method
    const rows = csv.split("\n");

    // Separate the first row of the CSV file, which contains the column headers
    const headers = rows[0].split(",");

    // Iterate over the remaining rows of the CSV file and create an object for each row
    masterChartAccountData = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = row[j];
      }
      masterChartAccountData.push(obj);
    }

    // Convert the array to a JSON string
    masterChartAccountDataString = JSON.stringify(masterChartAccountData);

    // Convert the JSON string to a JSON object
    masterChartAccountObject = JSON.parse(masterChartAccountDataString);

  }
};
xhr.send();

var destinationData = JSON.parse(masterChartAccountDataString);
console.log("Alok", destinationData);

//---------------------------------------------------------------------------------------------------------

// LI For DestinationAccount

// Global element
var htmlD = "";
$(document).ready(function () {
  // btn color
  $(".btnActive").click(function () {
    // remove "active" class from all buttons
    $(".btnActive").removeClass("btn-active");

    // add "active" class to clicked button
    $(this).addClass("btn-active");
  });

  // Target Active class for the scroll nav
  $(".scrollmenu a").click(function () {
    $(".scrollmenu a").removeClass("active1");
    $(this).addClass("active1");
  });
});
// --------------------------------------------------------------------------------------------------------

// For Source Account structure

// // Make an XMLHttpRequest to fetch the CSV file
const xhrs = new XMLHttpRequest();
xhrs.open("GET", "Standard CofA.csv", false);
var StandardChartofAccountData = [];
var StandardChartofAccountDataString;
var StandardChartofAccountObject;

xhrs.onreadystatechange = function () {
  if (xhrs.readyState === XMLHttpRequest.DONE && xhrs.status === 200) {
    const csv = xhrs.responseText;

    // Parse the CSV file using the split() method
    const rows = csv.split("\n");

    // Separate the first row of the CSV file, which contains the column headers
    const headers = rows[0].split(",");

    // Iterate over the remaining rows of the CSV file and create an object for each row
    StandardChartofAccountData = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = row[j];
      }
      StandardChartofAccountData.push(obj);
    }

    // Convert the array to a JSON string
    StandardChartofAccountDataString = JSON.stringify(
      StandardChartofAccountData
    );

    // Convert the JSON string to a JSON object .. It is used to only check the response
    StandardChartofAccountObject = JSON.parse(StandardChartofAccountDataString);

    console.log(StandardChartofAccountObject); // Log the JSON object to the console
  }
};
xhrs.send();

// -------------------------------------------------------------------------------------------------------

// LI for  Source Account structure
var SourceData = JSON.parse(StandardChartofAccountDataString);
// console.log("Alok1", SourceData);

// var SourceAccParentElement = document.getElementById("SourceAccount");
var html = "";
var divhtml = "";
var likelyHtml = "";
var possible = "";
// debugger;
SourceData.forEach((Element, index) => {
  // Create a new li element

  if (Element.Number != "") {
    // ("I will use it if it is req");
    html +=
      "<div class='list-group-item mt-2 border p-1 DynamicFontSize SourceAcc ps-2' id='" +
      Element.Number +
      "' data-atr= '" +
      Element.Type +
      "'>" +
      Element.Number +
      " " +
      Element.Name +
      "<i class='fa-sharp fa-solid fa-clock-rotate-left float-end'></i> <i class='bi bi-check2-all text-end float-end ps-2'></i></div>";
    divhtml +=
      "<div class='SourceAccDivs mt-2 p-1 DynamicFontSize SourceDivHeight MostLikely ps-2' id='" +
      Element.Number +
      "ML'></div>";
    likelyHtml +=
      "<div class='SourceAccDivs mt-2 p-1 DynamicFontSize SourceDivHeight likely ps-2' id='" +
      Element.Number +
      "L'></div>";
    possible +=
      "<div class='SourceAccDivs mt-2 p-1 DynamicFontSize SourceDivHeight possible ps-2' id='" +
      Element.Number +
      "P'></div>";
  }
});
$("#SourceAccount").html(html);
$("#MostLikely").html(divhtml);
$("#Likely").html(likelyHtml);
$("#Possible").html(possible);

// --------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------

// Navbar Scrollbar
const scrollbar = document.getElementById("scrollbar");
const scrollLeftBtn = document.getElementById("scroll-Left-btn");
const scrollrightBtn = document.getElementById("scroll-right-btn");

// Set up button click handlers
scrollLeftBtn.addEventListener("click", right);
scrollrightBtn.addEventListener("click", left);

function right() {
  // Scroll up by 50 pixels
  scrollbar.scrollLeft += 70;
}

function left() {
  // Scroll down by 50 pixels
  scrollbar.scrollLeft -= 70;
}

// --------------------------------------------------------------------------------------------------------

// Json data of the Destination account source data

var destinationAcc = document.getElementById("DestinationAccount");
var DestinationData = JSON.parse(masterChartAccountDataString);
// console.log("Alok2", DestinationData);
var html1;
// For All
function getAllData() {
  html1 = "";
  DestinationData.forEach((element, index) => {
    html1 +=
      "<div class='list-group-item mt-2 border p-1 DestinationDynamicFontSize destinatonDrag ps-2' data-atr='" +
      element.AccountCode +
      "'>" +
      "⠿ " +
      element.AccountCode +
      "--" +
      element.AccountName +
      "</div>";
  });
  $("#DestinationAccount").html(html1);
}

// For Asset
function getAssetData() {
  html = "";
  DestinationData.forEach((element, index) => {
    if (element.AccountTypeName == "ASSETS") {
      html +=
        "<div class='list-group-item mt-2 border p-1 DestinationDynamicFontSize destinatonDrag ps-2' data-atr='" +
        element.AccountCode +
        "'>" +
        "⠿ " +
        element.AccountCode +
        "--" +
        element.AccountName +
        "</div>";
    }
  });
  $("#DestinationAccount").html(html);
}

// For Liability
function getliabilityData() {
  html = "";
  DestinationData.forEach((element, index) => {
    if (element.AccountTypeName == "LIABILITIES") {
      html +=
        "<div class='list-group-item mt-2 border p-1 DestinationDynamicFontSize destinatonDrag ps-2' data-atr='" +
        element.AccountCode +
        "'>" +
        "⠿ " +
        element.AccountCode +
        "--" +
        element.AccountName +
        "</div>";
    }
  });
  $("#DestinationAccount").html(html);
}

// For Equity And Capital
function getEquityData() {
  html = "";
  DestinationData.forEach((element, index) => {
    if (element.AccountTypeName == "EQUITY/CAPITAL") {
      html +=
        "<div class='list-group-item mt-2 border p-1 DestinationDynamicFontSize destinatonDrag ps-2' data-atr='" +
        element.AccountCode +
        "'>" +
        "⠿ " +
        element.AccountCode +
        "--" +
        element.AccountName +
        "</div>";
    }
  });
  $("#DestinationAccount").html(html);
}

// For Revenue
function getRevenueData() {
  html = "";
  DestinationData.forEach((element, index) => {
    if (element.AccountTypeName == "Professional Services Revenue") {
      html +=
        "<div class='list-group-item mt-2 border p-1 DestinationDynamicFontSize destinatonDrag ps-2' data-atr='" +
        element.AccountCode +
        "'>" +
        "⠿ " +
        element.AccountCode +
        "--" +
        element.AccountName +
        "</div>";
    }
  });
  $("#DestinationAccount").html(html);
}

// For Cogs
function CogsData() {
  html = "";
  DestinationData.forEach((element, index) => {
    if (element.AccountTypeName == "Professional Services Costs") {
      html +=
        "<div class='list-group-item mt-2 border p-1 DestinationDynamicFontSize destinatonDrag ps-2' data-atr='" +
        element.AccountCode +
        "'>" +
        "⠿ " +
        element.AccountCode +
        "--" +
        element.AccountName +
        "</div>";
    }
  });
  $("#DestinationAccount").html(html);
}

// For Expenses
function ExpensesData() {
  html = "";
  DestinationData.forEach((element, index) => {
    if (element.AccountTypeName == "Labor Expense") {
      html +=
        "<div class='list-group-item mt-2 border p-1 DestinationDynamicFontSize destinatonDrag ps-2' data-atr='" +
        element.AccountCode +
        "'>" +
        "⠿ " +
        element.AccountCode +
        "--" +
        element.AccountName +
        "</div>";
    }
  });
  $("#DestinationAccount").html(html);
}

// Other Revenue & Expenses
function OtherRevenueData() {
  html = "";
  DestinationData.forEach((element, index) => {
    if (element.AccountTypeName == "Product Revenue") {
      html +=
        "<div class='list-group-item mt-2 border p-1 DestinationDynamicFontSize destinatonDrag ps-2' data-atr='" +
        element.AccountCode +
        "'>" +
        "⠿ " +
        element.AccountCode +
        "--" +
        element.AccountName +
        "</div>";
    }
  });
  $("#DestinationAccount").html(html);
}
// --------------------------------------------------------------------------------------------------------

// Source

var SourceBtnData = JSON.parse(StandardChartofAccountDataString);

// for button click

function getBtnAssetData() {
  $(".SourceAcc").each(function (index) {
    // console.log(this.id);
    var id = this.id;
    $(`#${id}`).hide();
    $(`#${id}ML`).hide();
    $(`#${id}L`).hide();
    $(`#${id}P`).hide();

    var dataAttribute = $(this).attr("data-atr");
    if (dataAttribute.trim() == "Assets") {
      var id = this.id;
      $(`#${id}`).show();
      $(`#${id}ML`).show();
      $(`#${id}L`).show();
      $(`#${id}P`).show();
    }
  });
}

function getBtnLiabilityData() {
  debugger;
  $(".SourceAcc").each(function (index) {
    // console.log(this.id);
    var id = this.id;
    $(`#${id}`).hide();
    $(`#${id}ML`).hide();
    $(`#${id}L`).hide();
    $(`#${id}P`).hide();
    var dataAttribute = $(this).attr("data-atr");
    if (dataAttribute.trim() == "Liabilities") {
      var id = this.id;
      $(`#${id}`).show();
      $(`#${id}ML`).show();
      $(`#${id}L`).show();
      $(`#${id}P`).show();
    }
  });
}

function getBtnEquityData() {
  $(".SourceAcc").each(function (index) {
    // console.log(this.id);
    var id = this.id;
    $(`#${id}`).hide();
    $(`#${id}ML`).hide();
    $(`#${id}L`).hide();
    $(`#${id}P`).hide();

    var dataAttribute = $(this).attr("data-atr");
    if (dataAttribute.trim() == "Equity") {
      var id = this.id;
      $(`#${id}`).show();
      $(`#${id}ML`).show();
      $(`#${id}L`).show();
      $(`#${id}P`).show();
    }
  });
}

function getBtnRevenueData() {
  $(".SourceAcc").each(function (index) {
    // console.log(this.id);
    var id = this.id;
    $(`#${id}`).hide();
    $(`#${id}ML`).hide();
    $(`#${id}L`).hide();
    $(`#${id}P`).hide();

    var dataAttribute = $(this).attr("data-atr");
    if (dataAttribute.trim() == "Revenue") {
      var id = this.id;
      $(`#${id}`).show();
      $(`#${id}ML`).show();
      $(`#${id}L`).show();
      $(`#${id}P`).show();
    }
  });
}
function getBtnCogsData() {
  $(".SourceAcc").each(function (index) {
    // console.log(this.id);
    var id = this.id;
    $(`#${id}`).hide();
    $(`#${id}ML`).hide();
    $(`#${id}L`).hide();
    $(`#${id}P`).hide();

    var dataAttribute = $(this).attr("data-atr");
    if (dataAttribute.trim() == "COGS") {
      var id = this.id;
      $(`#${id}`).show();
      $(`#${id}ML`).show();
      $(`#${id}L`).show();
      $(`#${id}P`).show();
    }
  });
}
function getBtnExpenseData() {
  $(".SourceAcc").each(function (index) {
    // console.log(this.id);
    var id = this.id;
    $(`#${id}`).hide();
    $(`#${id}ML`).hide();
    $(`#${id}L`).hide();
    $(`#${id}P`).hide();

    var dataAttribute = $(this).attr("data-atr");
    if (dataAttribute.trim() == "Expense") {
      var id = this.id;
      $(`#${id}`).show();
      $(`#${id}ML`).show();
      $(`#${id}L`).show();
      $(`#${id}P`).show();
    }
  });
}
function getBtnOtherExpenseData() {
  $(".SourceAcc").each(function (index) {
    // console.log(this.id);
    var id = this.id;
    $(`#${id}`).hide();
    $(`#${id}ML`).hide();
    $(`#${id}L`).hide();
    $(`#${id}P`).hide();

    var dataAttribute = $(this).attr("data-atr");
    if (dataAttribute.trim() == "Other Rev & Exp") {
      var id = this.id;
      $(`#${id}`).show();
      $(`#${id}ML`).show();
      $(`#${id}L`).show();
      $(`#${id}P`).show();
    }
  });
}

// --------------------------------------------------------------------------------------------------------

// Button click

var dataBtn = document.querySelectorAll(".btnActive");
var Scrollitems = document.querySelectorAll(".scrollItems");

dataBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    var linkSelector = btn.dataset.link;

    Scrollitems.forEach((link) => {
      if (link.matches(linkSelector)) {
        link.click();
        link.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
});

// -----------------------------------------------------------------------------------------------------------

// Search
var searchInput = document.getElementById("searchinput");
var destinationAccountDiv = document.getElementById("DestinationAccount");
var destinationAccountDivs = destinationAccountDiv.getElementsByTagName("div");

searchInput.addEventListener("keyup", function () {
  var value = this.value.toLowerCase();
  for (var i = 0; i < destinationAccountDivs.length; i++) {
    var text = destinationAccountDivs[i].textContent.toLowerCase();
    if (text.indexOf(value) > -1) {
      destinationAccountDivs[i].style.display = "";
    } else {
      destinationAccountDivs[i].style.display = "none";
    }
  }
});

// --------------------------------------------------------------------------------------------------------

// on Window onload the Asset btn willl be clicked

window.addEventListener("load", function () {
  var assetBtn = this.document.getElementById("assetBtn");
  assetBtn.click();
});

// --------------------------------------------------------------------------------------------------------

var destinationAccount = document.getElementById("DestinationAccount");
// Sortable JS
new Sortable(destinationAccount, {
  group: {
    name: "shared",
    pull: "clone",
    put: false, // Do not allow items to be put into this list
  },

  sort: false,
  animation: 150,
});

$(".MostLikely").each(function () {
  new Sortable(this, {
    group: "shared",
    animation: 150,

    onAdd: function (evt) {
      debugger
      var Mostid = this.el.id;

      var Likely = Mostid.replace("ML", "L");
      var PossibledivID = Mostid.replace("ML", "P");

      var mostLikelyAttr1;
      var mostLikelyAttr2;

      // to get dropped class 
      var droppingDataClass = $(evt.from).attr("class").split(" ")
      var Classfound = droppingDataClass.find(element => element === "likely" || element === "possible" || element === "destinationScroll");
      console.log("ee", Classfound)

      var droppingDataIdDiv = document.getElementById($(evt.from)[0].id)
      console.log("ee", droppingDataIdDiv)

      var LikelyDIV = document.getElementById(Likely);
      console.log("likely", LikelyDIV)

      var PossibleDIV = document.getElementById(PossibledivID);
      // when nothing is there
      var emptyLikely = document.getElementById(Likely).children[0]
      emptyLikely = $(emptyLikely).attr("data-atr")

      var emptyPossible = document.getElementById(PossibledivID).children[0]
      emptyPossible = $(emptyPossible).attr("data-atr")

      var emptyMostlikely = $(evt.item).attr("data-atr")

      if (Classfound != "destinationScroll") {
        debugger
        if (Classfound == "likely" || Classfound == "possible") {
          if (evt.to.children.length > 1) {
            var oldMostLikelyitem = evt.to.children[1];
            droppingDataIdDiv.appendChild(oldMostLikelyitem);
            Swal.fire('This is not allowed')
          }
          else {
            var oldMostLikelyitem = evt.to.children[0];
            droppingDataIdDiv.appendChild(oldMostLikelyitem);
            Swal.fire('This is not allowed')
          }
        }

      }
      if (emptyLikely == emptyMostlikely || emptyMostlikely == emptyPossible) {
        Swal.fire('Duplicate Data is Found')
        evt.to.removeChild(evt.item)
      }
      else {
        if (evt.to.children.length > 1) {
          console.log("P", evt.to.children.length)
          console.log("P", evt.to.children[0])
          console.log("P", evt.to.children[1])


          mostLikelyAttr1 = evt.to.children[0].getAttribute("data-atr");
          mostLikelyAttr2 = evt.to.children[1].getAttribute("data-atr");

          console.log("P", mostLikelyAttr1)
          console.log("P", mostLikelyAttr2)

          if (mostLikelyAttr1 == mostLikelyAttr2) {
            Swal.fire('Duplicate Data is Found')
            evt.to.removeChild(evt.to.children[1]);
          }
          else {
            LikelyDIV.appendChild(evt.to.children[1]);
          }
        }

      }

      if (LikelyDIV.children.length > 1) {
        var oldLikelyitem = LikelyDIV.children[0];
        PossibleDIV.appendChild(oldLikelyitem);
      }
      if (PossibleDIV.children.length > 1) {
        PossibleDIV.removeChild(PossibleDIV.children[0]);
      }


    },
    ghostClass: "ghost",
  });
});

var likelyAtr1, likelyAtr2;

$(".likely").each(function () {
  new Sortable(this, {
    group: "shared",
    animation: 150,
    onAdd: function (evt) {
      var LikelyItem = evt.to.children[0];

      var Likeid = this.el.id;
      var MLikelyid = Likeid.replace("L", "ML");
      var PossibledivID = Likeid.replace("L", "P");

      var likelyAtr1;
      var likelyAtr2;

      // to get dropped class 
      var droppingDataClass = $(evt.from).attr("class").split(" ")
      var Classfound = droppingDataClass.find(element => element === "MostLikely" || element === "possible" || element === "destinationScroll");
      console.log("ee", Classfound)

      var droppingDataIdDiv = document.getElementById($(evt.from)[0].id)
      console.log("ee", droppingDataIdDiv)

      if (Classfound != "destinationScroll") {
        if (Classfound == "MostLikely" || Classfound == "possible") {
          if (evt.to.children.length > 1) {
            debugger
            var oldMostLikelyitem = evt.to.children[1];
            droppingDataIdDiv.appendChild(oldMostLikelyitem);
            Swal.fire('This is not allowed')
          }
          else {
            var oldMostLikelyitem = evt.to.children[0];
            droppingDataIdDiv.appendChild(oldMostLikelyitem);
            Swal.fire('This is not allowed')
          }
        }

      }
      // else {
      // when nothing is there
      var emptyMLikely = document.getElementById(MLikelyid).children[0]
      emptyMLikely = $(emptyMLikely).attr("data-atr")

      var EmptyPossible = document.getElementById(PossibledivID).children[0]
      EmptyPossible = $(EmptyPossible).attr("data-atr")

      var emptylikely = $(evt.item).attr("data-atr")

      if (emptyMLikely == emptylikely || emptylikely == EmptyPossible) {
        Swal.fire('Duplicate Data is Found')

        evt.to.removeChild(evt.item)
      } else {
        if (evt.to.children.length > 1) {
          likelyAtr1 = evt.to.children[0].getAttribute("data-atr");
          likelyAtr2 = evt.to.children[1].getAttribute("data-atr");
          if (likelyAtr1 == likelyAtr2) {
            Swal.fire('Duplicate Data is Found')

            evt.to.removeChild(evt.to.children[1]);
          }
        }
      }

      var PossibledivID = Likeid.replace("L", "P");

      var PossibleDIV = document.getElementById(PossibledivID);
      if (evt.to.children.length > 1) {
        var olditem = evt.to.children[1];
        PossibleDIV.appendChild(olditem);
      }
      if (PossibleDIV.children.length > 1) {
        PossibleDIV.removeChild(PossibleDIV.children[0]);
      }
      // }

    },
    ghostClass: "ghost",
  });
});

$(".possible").each(function () {
  new Sortable(this, {
    group: "shared",
    animation: 150,

    onAdd: function (evt) {

      var Possibleid = this.el.id;
      var MostLikelyid = Possibleid.replace("P", "ML");
      var LikelyID = Possibleid.replace("P", "L");

      var PossibleAtr1;
      var PossibleAtr2;

      // to get dropped class 
      var droppingDataClass = $(evt.from).attr("class").split(" ")
      var Classfound = droppingDataClass.find(element => element === "MostLikely" || element === "likely" || element === "destinationScroll");
      console.log("ee", Classfound)

      var droppingDataIdDiv = document.getElementById($(evt.from)[0].id)
      console.log("ee", droppingDataIdDiv)

      if (Classfound != "destinationScroll") {
        if (Classfound == "MostLikely" || Classfound == "likely") {
          if (evt.to.children.length > 1) {
            debugger
            var oldMostLikelyitem = evt.to.children[1];
            droppingDataIdDiv.appendChild(oldMostLikelyitem);
            Swal.fire('This is not allowed')
          }
          else {
            var oldMostLikelyitem = evt.to.children[0];
            droppingDataIdDiv.appendChild(oldMostLikelyitem);
            Swal.fire('This is not allowed')
          }
        }

      }

      // when nothing is there
      var EmptyMLikely = document.getElementById(MostLikelyid).children[0]
      EmptyMLikely = $(EmptyMLikely).attr("data-atr")

      var EmptyLikely = document.getElementById(LikelyID).children[0]
      EmptyLikely = $(EmptyLikely).attr("data-atr")

      var emptyPoss = $(evt.item).attr("data-atr")

      if (EmptyMLikely == emptyPoss || emptyPoss == EmptyLikely) {
        Swal.fire('Duplicate Data is Found')

        evt.to.removeChild(evt.item)
      } else {
        if (evt.to.children.length > 1) {
          debugger
          PossibleAtr1 = evt.to.children[0].getAttribute("data-atr");
          PossibleAtr2 = evt.to.children[1].getAttribute("data-atr");

          if (PossibleAtr1 == PossibleAtr2) {
            Swal.fire('Duplicate Data is Found')

            evt.to.removeChild(evt.to.children[1]);
          } else {
            debugger
            evt.to.removeChild(evt.to.children[1]);

          }

        }
      }

      // }

    },
    ghostClass: "ghost",
  });
});

// -------------------------------------------------------------------------------------------------------
// locastorage
window.addEventListener("load", function () {
  var SourceJson = JSON.parse(localStorage.getItem("SourceAccount"));
  if (SourceJson != null || SourceJson != undefined) {
    document.onload = getLocalStorageData();
  }
});

function AddDataLocalStorage() {
  var SourceAccount = new Array();
  const mainDiv = document.getElementById("SourceAccount");
  const divs = mainDiv.querySelectorAll("div");
  var SourceID;
  divs.forEach(function (div) {
    SourceID = div.id;
    if (localStorage.getItem("SourceAccount") == null) {
      SourceAccount = [];
      var sourceAccountObj = {
        LastUpdated: Time,
        SourceId: SourceID,
        MostLikely: $("#" + SourceID + "ML").html(),
        Likely: $("#" + SourceID + "L").html(),
        Possible: $("#" + SourceID + "P").html(),
      };
      SourceAccount.push(sourceAccountObj);

    } else {
      var sourceAccountObj = {
        LastUpdated: Time,
        SourceId: SourceID,
        MostLikely: $("#" + SourceID + "ML").html(),
        Likely: $("#" + SourceID + "L").html(),
        Possible: $("#" + SourceID + "P").html(),
      };
    }

    SourceAccount.push(sourceAccountObj);

    // localStorage.setItem("SourceAccount", JSON.stringify(SourceAccount));
  });
  localStorage.setItem("SourceAccount", JSON.stringify(SourceAccount));
}

// local storage variable
var SourceDataJson
function getLocalStorageData() {
  SourceDataJson = JSON.parse(localStorage.getItem("SourceAccount"));
  console.log("Json", SourceDataJson);

  const mainDiv = document.getElementById("SourceAccount");
  const divs = mainDiv.querySelectorAll("div");
  var getSourceid;
  divs.forEach(function (div, index) {
    getSourceid = div.id;
    $("#" + getSourceid + "ML").html(SourceDataJson[index].MostLikely);
    $("#" + getSourceid + "L").html(SourceDataJson[index].Likely);
    $("#" + getSourceid + "P").html(SourceDataJson[index].Possible);
  });
}

// --------------------------------------------------------------------------------------------------------

// Time
function formatDate(dateVal) {
  var newDate = new Date(dateVal);

  var sMonth = padValue(newDate.getMonth() + 1);
  var sDay = padValue(newDate.getDate());
  var sYear = newDate.getFullYear();
  var sHour = newDate.getHours();
  var sMinute = padValue(newDate.getMinutes());
  var sAMPM = "AM";

  var iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
    sAMPM = "PM";
    sHour = iHourCheck - 12;
  } else if (iHourCheck === 0) {
    sHour = "12";
  }
  sHour = padValue(sHour);
  return (
    sMonth +
    "/" +
    sDay +
    "/" +
    sYear +
    " " +
    "at" +
    " " +
    +sHour +
    ":" +
    sMinute +
    " " +
    sAMPM
  );
}

function padValue(value) {
  return value < 10 ? "0" + value : value;
}

var Time = formatDate(new Date());

var Lastupdate = document.getElementById("Submit");
Lastupdate.addEventListener("click", function () {
  Swal.fire({
    // position: 'top-end',
    icon: 'success',
    title: 'Data is submitted',
    showConfirmButton: false,
    timer: 1500
  })
  
  SourceDataJson = JSON.parse(localStorage.getItem("SourceAccount"));
  document.getElementById("LastSubmited").innerHTML = "Last Updated On " + SourceDataJson[0].LastUpdated;
});

// --------------------------------------------------------------------------------------------------------