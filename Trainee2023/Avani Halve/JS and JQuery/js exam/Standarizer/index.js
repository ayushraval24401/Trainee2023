//Create Destination Account Onload
var data = [];
var DestinationData = new XMLHttpRequest();
DestinationData.open("GET", "./ExcelSheets/MasterChartOfAcounts.csv", true);
DestinationData.responseType = "text";
DestinationData.onload = function () {
   if (DestinationData.status === 200) {
      var lines = DestinationData.response.split("\n");
      var headers = lines.shift().split(",");
      data = lines.map(function (line) {
         var values = line.split(",");
         var object = {};
         for (var i = 0; i < headers.length; i++) {
            object[headers[i]] = values[i];
         }
         return object;
      });
      var ul = document.getElementById("DestinationAccount");
      for (var i = 0; i < data.length; i++) {
         var li = document.createElement("li");
         li.className = "list-group-item p-2 border masteraccouts";
         li.innerHTML = " ⠿ " + data[i]["AccountCode"] + " -- " + data[i]["AccountName"];
         ul.appendChild(li);
      }
   }
};
DestinationData.send();

//Create Source Account onload
var SourceAccountData = new XMLHttpRequest();
SourceAccountData.open("GET", "./ExcelSheets/StandardCofA.csv", true);
SourceAccountData.responseType = "text";
SourceAccountData.onload = function () {
   if (SourceAccountData.status === 200) {
      var lines = SourceAccountData.response.split("\n");
      var headers = lines.shift().split(",");
      data = lines.map(function (line) {
         var values = line.split(",");
         var object = {};
         for (var i = 0; i < headers.length; i++) {
            object[headers[i]] = values[i];
         }
         return object;
      });

      // create Multiple Drop Box
      var sourceAccValue = document.getElementById("SourceAccount");
      var mostlikly = document.getElementById("MostLikelyDrop");
      var likly = document.getElementById("LikelyDrop");
      var possiblely = document.getElementById("PossibleDrop");

      for (var i = 0; i < data.length; i++) {
         if (data[i]["Number"] != "") {
            var Dropli = document.createElement("li");
            var idValue = "source_" + data[i]["Number"]; // create dynamic id value
            Dropli.id = idValue; // set the dynamic id to the li element
            Dropli.className = "list-group-item p-2 border sourcAccounts";
            Dropli.attributes = "SourceId";
            Dropli.innerHTML =
               data[i]["Number"] +
               " -- " +
               data[i]["Name"] +
               '<i class="bi bi-clock-history float-end iconColor"></i><i class="bi bi-check-all float-end iconColor"></i>';

            sourceAccValue.appendChild(Dropli);
         }
      }
      for (var i = 0; i < data.length; i++) {
         var data1 = data[i];
         if (data1.Number !== "") {
            var mostLiklyDropli = document.createElement("li");
            mostLiklyDropli.setAttribute("id", "mostLikly_" + data1.Number);
            mostLiklyDropli.classList.add("mostlike");
            mostlikly.append(mostLiklyDropli);

            var likelyDropli = document.createElement("li");
            likelyDropli.setAttribute("id", "likely_" + data1.Number);
            likelyDropli.innerHTML = "";
            likelyDropli.classList.add("like");
            likly.append(likelyDropli);

            var possibleDropli = document.createElement("li");
            possibleDropli.setAttribute("id", "possible_" + data1.Number);
            possibleDropli.innerHTML = "";
            possibleDropli.classList.add("possible");
            possiblely.append(possibleDropli);
         }
      }

      // Initialize Sortable on dropbox elements
      $(".mostlike").each(function () {
         new Sortable(this, {
            group: "shared",
            animation: 150,
            onAdd: function (evt) {
               var toList = evt.to;
               if (evt.from === toList) {
                  return;
               }
               debugger;
               evt.item.classList = "dropboxItem";

               var parentDrop = evt.item.parentNode;
               var drop = parentDrop.getAttribute("id").substring(parentDrop.getAttribute("id").indexOf("_"));
               var possibleContainer = document.getElementById("possible" + drop);
               var likeContainer = document.getElementById("likely" + drop);

               if (likeContainer.children.length == 1 || possibleContainer.children.length == 1) {
                  if (likeContainer.children[0].innerText == parentDrop.children[0].innerText) {
                     {
                        swal("Duplicate value", "not allowed!", "error");
                        parentDrop.removeChild(evt.item);
                     }
                  } else if (possibleContainer.children[0].innerText == parentDrop.children[0].innerText) {
                     {
                        swal("Duplicate value", "not allowed!", "error");
                        parentDrop.removeChild(evt.item);
                     }
                  }
               } else if (parentDrop.children.length > 1) {
                  if (
                     parentDrop.children[0].innerText == parentDrop.children[1].innerText ||
                     (likeContainer.children.length == 1 && likeContainer.children[0].innerText == parentDrop.children[0].innerText) ||
                     (possibleContainer.children.length == 1 && possibleContainer.children[0].innerText == parentDrop.children[0].innerText)
                  ) {
                     swal("Duplicate value", "not allowed!", "error");
                     parentDrop.removeChild(evt.item);
                  } else {
                     for (var i = 0; i < mostlikly.childElementCount; i++) {
                        var mostLikelyList = mostlikly.children[i];
                        var likelyList = likly.children[i];
                        var possiblelyList = possiblely.children[i];

                        if (mostLikelyList.children.length > 1) {
                           likelyList.appendChild(mostLikelyList.lastChild);
                        }
                        if (likelyList.children.length > 1) {
                           possiblelyList.appendChild(likelyList.firstChild);
                        }
                        if (possiblelyList.children.length > 1) {
                           possiblelyList.removeChild(possiblelyList.firstChild);
                        }
                     }
                  }
               }
            },
         });
      });
      $(".like").each(function () {
         new Sortable(this, {
            group: "shared",
            animation: 150,
            onAdd: function (evt) {
               var toList = evt.to;
               if (evt.from === toList) {
                  return;
               }
               debugger;
               evt.item.classList = "dropboxItem";

               var parentDrop = evt.item.parentNode;
               var drop = parentDrop.getAttribute("id").substring(parentDrop.getAttribute("id").indexOf("_"));
               var possibleContainer = document.getElementById("possible" + drop);
               var MostlikeContainer = document.getElementById("mostLikly" + drop);

               if (MostlikeContainer.children.length == 1 || possibleContainer.children.length == 1) {
                  if (MostlikeContainer.children[0].innerText == parentDrop.children[0].innerText) {
                     {
                        swal("Duplicate value", "not allowed!", "error");
                        parentDrop.removeChild(evt.item);
                     }
                  } else if (possibleContainer.children[0].innerText == parentDrop.children[0].innerText) {
                     {
                        swal("Duplicate value", "not allowed!", "error");
                        parentDrop.removeChild(evt.item);
                     }
                  }
               } else if (parentDrop.children.length > 1) {
                  if (
                     parentDrop.children[0].innerText == parentDrop.children[1].innerText ||
                     (MostlikeContainer.children.length == 1 && MostlikeContainer.children[0].innerText == parentDrop.children[0].innerText) ||
                     (possibleContainer.children.length == 1 && possibleContainer.children[0].innerText == parentDrop.children[0].innerText)
                  ) {
                     swal("Duplicate value", "not allowed!", "error");
                     parentDrop.removeChild(evt.item);
                  } else {
                     for (var i = 0; i < mostlikly.childElementCount; i++) {
                        var mostLikelyList = mostlikly.children[i];
                        var likelyList = likly.children[i];
                        var possiblelyList = possiblely.children[i];

                        if (mostLikelyList.children.length > 1) {
                           likelyList.appendChild(mostLikelyList.lastChild);
                        }
                        if (likelyList.children.length > 1) {
                           possiblelyList.appendChild(likelyList.firstChild);
                        }
                        if (possiblelyList.children.length > 1) {
                           possiblelyList.removeChild(possiblelyList.firstChild);
                        }
                     }
                  }
               }
            },
         });
      });

      $(".possible").each(function () {
         new Sortable(this, {
            group: "shared",
            animation: 150,
            onAdd: function (evt) {
               var toList = evt.to;
               if (evt.from === toList) {
                  return;
               }
               debugger;
               evt.item.classList = "dropboxItem";

               var parentDrop = evt.item.parentNode;
               var drop = parentDrop.getAttribute("id").substring(parentDrop.getAttribute("id").indexOf("_"));
               var MostlikeContainer = document.getElementById("mostLikly" + drop);
               var likeContainer = document.getElementById("likely" + drop);

               if (likeContainer.children.length == 1 || MostlikeContainer.children.length == 1) {
                  if (likeContainer.children[0].innerText == parentDrop.children[0].innerText) {
                     {
                        swal("Duplicate value", "not allowed!", "error");
                        parentDrop.removeChild(evt.item);
                     }
                  } else if (MostlikeContainer.children[0].innerText == parentDrop.children[0].innerText) {
                     {
                        swal("Duplicate value", "not allowed!", "error");
                        parentDrop.removeChild(evt.item);
                     }
                  }
               } else if (parentDrop.children.length > 1) {
                  if (
                     parentDrop.children[0].innerText == parentDrop.children[1].innerText ||
                     (likeContainer.children.length == 1 && likeContainer.children[0].innerText == parentDrop.children[0].innerText) ||
                     (MostlikeContainer.children.length == 1 && MostlikeContainer.children[0].innerText == parentDrop.children[0].innerText)
                  ) {
                     swal("Duplicate value", "not allowed!", "error");
                     parentDrop.removeChild(evt.item);
                  } else {
                     for (var i = 0; i < mostlikly.childElementCount; i++) {
                        var mostLikelyList = mostlikly.children[i];
                        var likelyList = likly.children[i];
                        var possiblelyList = possiblely.children[i];

                        if (mostLikelyList.children.length > 1) {
                           likelyList.appendChild(mostLikelyList.lastChild);
                        }
                        if (likelyList.children.length > 1) {
                           possiblelyList.appendChild(likelyList.firstChild);
                        }
                        if (possiblelyList.children.length > 1) {
                           possiblelyList.removeChild(possiblelyList.firstChild);
                        }
                     }
                  }
               }
            },
         });
      });
   }

   var RequiredStandaardData = data;

   //get Value form local
   if (localStorage.getItem("StoreDataDetail")) {
      var standarizerStorage = JSON.parse(localStorage.getItem("StoreDataDetail"));
      for (var i = 0; i < standarizerStorage.length; i++) {
         var data = standarizerStorage[i];
         $(".updateText").html(data.Updatedate);
         var mostlike = document.getElementById("mostLikly_" + data.dataNumber);
         var like = document.getElementById("likely_" + data.dataNumber);
         var possible = document.getElementById("possible_" + data.dataNumber);

         if (!mostlike.children[0] && data.mostliklyData !== "") {
            var mostlikeChild = document.createElement("li");
            mostlikeChild.setAttribute("draggable", "false");
            mostlikeChild.classList.add("mostlikeItem");
            mostlike.appendChild(mostlikeChild);
            mostlike.children[0].innerHTML = data.mostliklyData;
         }

         if (!like.children[0] && data.liklyData !== "") {
            var likeChild = document.createElement("li");
            likeChild.setAttribute("draggable", "false");
            likeChild.classList.add("likeItem");
            like.appendChild(likeChild);
            like.children[0].innerHTML = data.liklyData;
         }

         if (!possible.children[0] && data.possiblyData !== "") {
            var possibleChild = document.createElement("li");
            possibleChild.setAttribute("draggable", "false");
            possibleChild.classList.add("possibleItem");
            possible.appendChild(possibleChild);
            possible.children[0].innerHTML = data.possiblyData;
         }
      }
   }

   $(".submitBtn").click(function () {
      //last update date
      var date = new Date();
      var Updatedate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " at " + dateTOAMORPM(new Date());
      $(".updateText").html(Updatedate);
      function dateTOAMORPM(currentDateTime) {
         var hrs = currentDateTime.getHours();
         var mnts = currentDateTime.getMinutes();
         var AMPM = hrs >= 12 ? "PM" : "AM";
         hrs = hrs % 12;
         hrs = hrs ? hrs : 12;
         mnts = mnts < 10 ? "0" + mnts : mnts;
         var result = hrs + ":" + mnts + " " + AMPM;
         return result;
      }
      swal("Data Submitted", "Successfully", "success");
      //localStorage
      var SourceArray = [];
      for (var i = 0; i < RequiredStandaardData.length; i++) {
         var data = RequiredStandaardData[i];
         if (data.Number !== "") {
            var mostliklyEle = document.getElementById("mostLikly_" + data.Number).children[0];
            var mostliklyData = "";
            if (mostliklyEle && mostliklyEle.hasChildNodes()) {
               mostliklyData = mostliklyEle.innerText;
            }

            var liklyEle = document.getElementById("likely_" + data.Number).children[0];
            var liklyData = "";
            if (liklyEle && liklyEle.hasChildNodes()) {
               var liklyData = liklyEle.innerText;
            }

            var possiblyEle = document.getElementById("possible_" + data.Number).children[0];
            var possiblyData = "";
            if (possiblyEle && possiblyEle.hasChildNodes()) {
               possiblyData = possiblyEle.innerText;
            }

            var ObjData = {
               Updatedate: Updatedate,
               dataNumber: data.Number,
               mostliklyData: mostliklyData,
               liklyData: liklyData,
               possiblyData: possiblyData,
            };

            SourceArray.push(ObjData);
         }
      }
      localStorage.setItem("StoreDataDetail", JSON.stringify(SourceArray));
   });
};

SourceAccountData.send();

//Button filters
$(".accountbtnValue").click(function () {
   $(".accountbtnValue").removeClass("active");
   $(this).addClass("active");

   var checkbtnValue = $(this).val();
   var linkValue = checkbtnValue.toLowerCase();

   var DestinationAccountData = new XMLHttpRequest();
   DestinationAccountData.open("GET", "./ExcelSheets/MasterChartOfAcounts.csv", true);
   DestinationAccountData.responseType = "text";
   DestinationAccountData.onload = function () {
      if (DestinationAccountData.status === 200) {
         var lines = DestinationAccountData.response.split("\n");
         var headers = lines.shift().split(",");
         data = lines.map(function (line) {
            var values = line.split(",");
            var object = {};
            for (var i = 0; i < headers.length; i++) {
               object[headers[i]] = values[i];
            }
            return object;
         });
         var ul = document.getElementById("DestinationAccount");
         ul.innerHTML = "";
         for (var i = 0; i < data.length; i++) {
            if (data[i].AccountTypeName.toLowerCase().includes(linkValue)) {
               var li = document.createElement("li");
               li.className = "list-group-item p-2 border";
               li.innerHTML = " ⠿ " + data[i].AccountCode + " -- " + data[i].AccountName;
               ul.appendChild(li);
            }
         }
      }
   };
   DestinationAccountData.send();

   var SourceAccountData = new XMLHttpRequest();
   // var sourceAccValue = document.getElementById("SourceAccount");
   var mostlikly = document.getElementById("MostLikelyDrop");
   var likly = document.getElementById("LikelyDrop");
   var possiblely = document.getElementById("PossibleDrop");

   SourceAccountData.open("GET", "./ExcelSheets/StandardCofA.csv", true);
   SourceAccountData.responseType = "text";
   SourceAccountData.onload = function () {
      if (SourceAccountData.status === 200) {
         var lines = SourceAccountData.response.split("\n");
         var headers = lines.shift().split(",");
         data = lines.map(function (line) {
            var values = line.split(",");
            var object = {};
            for (var i = 0; i < headers.length; i++) {
               object[headers[i]] = values[i];
            }
            return object;
         });

         var ul = document.getElementById("SourceAccount");
         ul.innerHTML = "";

         for (var i = 0; i < data.length; i++) {
            if (data[i].Type.includes(checkbtnValue)) {
               var li = document.createElement("li");
               li.className = "list-group-item p-2 border sourcAccounts";
               var idValue = "source_" + data[i]["Number"];
               li.id = idValue;
               var sourceLength = (li.innerHTML =
                  data[i].Number +
                  " -- " +
                  data[i].Name +
                  '<i class="bi bi-clock-history float-end iconColor"></i><i class="bi bi-check-all float-end iconColor"></i>');
               ul.appendChild(li);
            }
         }

         for (var i = 0; i < sourceLength.length; i++) {
            var mostliklyDropli = document.createElement("li");
            mostliklyDropli.innerHTML = "";
            mostliklyDropli.classList.add("dropbox");
            mostlikly.append(mostliklyDropli);

            var likelyDropli = document.createElement("li");
            likelyDropli.innerHTML = "";
            likelyDropli.classList.add("dropbox");
            likly.append(likelyDropli);

            var possibleDropli = document.createElement("li");
            possibleDropli.innerHTML = "";
            possibleDropli.classList.add("dropbox");
            possiblely.append(possibleDropli);
         }
      }
   };
   SourceAccountData.send();
});

//Destination Navbar filter
$(".scrollmenu a").click(function () {
   $(".scrollmenu a").removeClass("active");
   $(this).addClass("active");
   var linkValue = $(this).attr("value").toLowerCase();
   var request = new XMLHttpRequest();
   request.open("GET", "./ExcelSheets/MasterChartOfAcounts.csv", true);
   request.responseType = "text";
   request.onload = function () {
      if (request.status === 200) {
         var lines = request.response.split("\n");
         var headers = lines.shift().split(",");
         data = lines.map(function (line) {
            var values = line.split(",");
            var object = {};
            for (var i = 0; i < headers.length; i++) {
               object[headers[i]] = values[i];
            }
            return object;
         });
         var ul = document.getElementById("DestinationAccount");
         ul.innerHTML = "";
         for (var i = 0; i < data.length; i++) {
            if (data[i].AccountTypeName.toLowerCase().includes(linkValue)) {
               var li = document.createElement("li");
               li.className = "list-group-item p-2 border";
               li.innerHTML = " ⠿ " + data[i].AccountCode + " -- " + data[i].AccountName;
               ul.appendChild(li);
            }
         }
      }
   };
   request.send();
});

$(document).ready(function () {
   $(".AccountbtnValue").on("click", function () {
      $(".AccountbtnValue").removeClass("active");
      $(this).addClass("active");
   });
   $("#search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#DestinationAccount li").filter(function () {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
   });
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

//Scroll for DestinationAccount
document.querySelectorAll(".scrollmenu a").forEach(function (link) {
   link.addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelectorAll(".scrollmenu a").forEach(function (link) {
         link.classList.remove("active");
      });
      this.classList.add("active");
   });
});
