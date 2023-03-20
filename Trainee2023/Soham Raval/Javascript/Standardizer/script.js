
var getvalueofcsv = [];
var getvalueofmasterdata = [];
let mostlikelysDroppedNumbers = [];

$(document).ready(function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var destinationData = csvJSON(this.responseText);
            var parsedData = JSON.parse(destinationData);
            getvalueofcsv = parsedData;
        }
    };
    xhttp.open("GET", "Standard CofA.csv", false);
    xhttp.send();
    function csvJSON(csv) {
        var lines = csv.split("\n");
        var result = [];
        var headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        result.forEach((columndata) => {
            if (columndata.Number != "") {
                $("#Balancesheet_list").append("<li id='number_" + columndata.Number + "' class='list-group-item'>" + columndata.Number + "  " + columndata.Name + "<i class='material-icons float-end'>done_all history</i></li>");
                $("#mostlikelys").append("<li id='mostlikely_" + columndata.Number + "' class='list-group-item mostlike  mostlikedrag'>");
                $("#likelys").append("<li id='likely_" + columndata.Number + "' class='list-group-item mostlike likelydrag'>");
                $("#possible").append("<li id='possible_" + columndata.Number + "' class='list-group-item mostlike possibledrag'>");
            }
        }); 
        // $('.mostlikedrag').each(function () {
      
        //     new Sortable(this, {
        //         group: 'shared',
        //         animation: 150,
        //     })
        // })
          
        $('.mostlikedrag').each(function () {
            new Sortable(this, {
                group: 'shared',
                animation: 150,
                onAdd: function (evt) {
                    console.log("evt",evt)
                    debugger
                    // check if the item was dropped into the mostlikelys list
                    // if (evt.to.id === 'mostlikelys') {
                    //     let itemNumber = evt.item.id.split('_')[1];
                    //     // check if the item has already been dropped into the mostlikelys list
                    //     if (mostlikelysDroppedNumbers.includes(itemNumber)) {
                    //         console.log("mostlikelysDroppedNumbers",mostlikelysDroppedNumbers)
                    //         // remove the item from the mostlikelys list and add it to the likelys list
                    //         evt.from.insertBefore(evt.item, evt.from.children[evt.oldIndex]);
                    //         $('#likelys').append(evt.item);
                    //     } else {
                    //         mostlikelysDroppedNumbers.push(itemNumber);
                    //     }
                    // }
                }
            })
        });
        $('.likelydrag').each(function () {
                       new Sortable(this, {
                group: 'shared',
                animation: 150,
            })
        })
        $('.possibledrag').each(function () {
            new Sortable(this, {
                group: 'shared',
                animation: 150,
            })
        })
 
        let str = $("#mostlikelys").find("li").attr("id");
        let mostlikelyValue = str.substring(str.indexOf("mostlikely_")); 
        console.log(mostlikelyValue);

        debugger
        $(".source_btn").click(function () {
            var type = $(this).data("value");
            var mostlikelys = $("#mostlikelys");
            var likelys = $("#likelys");
            var possible = $("#possible");
            // var type = $(this).data("value");
            
            $("#Balancesheet_list li").hide();
            mostlikelys.find("li").hide();
            likelys.find("li").hide();
            possible.find("li").hide();
            result.forEach((columndata) => {
                if (columndata.Type == type) {
                    if (columndata.Number != "") {
                        $("#number_" + columndata.Number).show();
                        $("#mostlikely_" + columndata.Number).show();
                        $("#likely_" + columndata.Number).show();
                        $("#possible_" + columndata.Number).show();
                    }
                }
            });
            $('.btndrag').each(function () {
                debugger
                new Sortable(this, {
                    group: 'shared',
                    animation: 150,
                })
            })

            const MasterDataMap = {
                "Assets": "ASSETS",
                "Liabilities": "LIABILITIES",
                "Equity": "EQUITY/CAPITAL",
                "Revenue": "Professional Services Revenue",
                "COGS": "Product Revenue",
                "Expense": '"Outside (or ""1099"") Professional Services Costs"',
                "Other Rev & Exp": "Product Costs"
            };
            datamatchedofmaster = MasterDataMap[type];

            $("#mastersheet_list").html('');
            getvalueofmasterdata.forEach((columndata) => {

                if (columndata.AccountTypeName == datamatchedofmaster) {

                    console.log(columndata.AccountName);
                    if (columndata.Number != "") {
                        $("#mastersheet_list").append("<li class='list-group-item'>" + "⠿" + columndata.AccountCode + "  " + columndata.AccountName + "</li>");
                    }
                }
            })

        });
        return JSON.stringify(result);
    }
    var balancesheetxhttp = new XMLHttpRequest();
    balancesheetxhttp.open("GET", "MasterChartOfAcounts - Sheet1.csv", false);
    balancesheetxhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            csvtojsonmasterdata(this.responseText);
            console.log("getvalueofmasterdata", getvalueofmasterdata);
        }
    };
    balancesheetxhttp.send();
    function csvtojsonmasterdata(csv) {
        const lines = csv.split("\n");
        const headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            getvalueofmasterdata.push(obj);
        }
    }
    var html = '';
    getvalueofmasterdata.forEach((columndata) => {
        if (columndata.Number != "") {
            // $("#mastersheet_list").append("<li class='list-group-item'>" + columndata.AccountCode + "  " + columndata.AccountName + "</li>");
            html += "<li class='list-group-item' data-value='" + columndata.AccountCode + "'>" + "⠿" + columndata.AccountCode + "  " + columndata.AccountName + "</li>";
        }
        $("#mastersheet_list").html(html)
    });
    $('.menu-item').click(function () {
        var navbarvalue = $(this).data("value");
        const MasternavbarMap = {
            "Assets": "ASSETS",
            "Liabilities": "LIABILITIES",
            "Equity": "EQUITY/CAPITAL",
            "Revenue": "Professional Services Revenue",
            "COGS": "Product Revenue",
            "Expense": '"Outside (or ""1099"") Professional Services Costs"',
            "Other Rev & Exp": "Product Costs"
        };
        datamatchedofnavbar = MasternavbarMap[navbarvalue];
        $("#mastersheet_list").html('');

        getvalueofmasterdata.forEach((columndata) => {
            if (columndata.AccountTypeName == datamatchedofnavbar) {
                console.log(columndata.AccountName);
                if (columndata.Number != "") {

                    $("#mastersheet_list").append("<li class='list-group-item'>" + "⠿" + columndata.AccountCode + "  " + columndata.AccountName + "</li>");
                }
            }
        });
        $('#all_data').click(function () {
            getvalueofmasterdata.forEach((columndata) => {
                console.log(columndata.AccountName);
                if (columndata.Number != "") {
                    $("#mastersheet_list").append("<li class='list-group-item'>" + "⠿" + columndata.AccountCode + "  " + columndata.AccountName + "</li>");
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
$(document).ready(function () {
    $('#btn-nav-previous').click(function () {
        $(".menu-inner-box").animate({ scrollLeft: "-=100px" });
    });
    $('#btn-nav-next').click(function () {
        $(".menu-inner-box").animate({ scrollLeft: "+=100px" });
    });
    $(".search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".destination_account_structure ul li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $('.search').on('search', function () {
        if ($(this).val() === '') {
            $('#mastersheet_list li').show();
        }
    });

    $('.menu-item.navbar_btn').click(function () {
        // remove the active class from all links
        $('.menu-item.navbar_btn').removeClass('active');
        // add the active class to the clicked link
        $(this).addClass('active');
    });
});
// new Sortable(document.getElementById('mostlikelys'), {
//     group: 'shared',
//     animation: 150,
// });
// new Sortable(document.getElementById('likelys'), {
//     group: 'shared',
//     animation: 150,
// });
// new Sortable(document.getElementById('possible'), {
//     group: 'shared',
//     animation: 150,
// });
// new Sortable(document.getElementById('mastersheet_list'), {
//        group: {
//         name: 'shared',
//         pull: 'clone',
//         put: false 
//     },
//     animation: 150,
// });

new Sortable(mastersheet_list, {
    group: {
        name: 'shared',
        pull: 'clone',
        put: false
    },
    animation: 150,
    // sort: false 
});


// new Sortable(document.getElementsByClassName('mostlikelys_list'), {
//     group: 'shared',
//     animation: 150,
// });
// new Sortable(document.getElementsByClassName('likelys_list'), {
//     group: 'shared',
//     animation: 150,
// });
// new Sortable(document.getElementsByClassName('possible_list'), {
//     group: 'shared',
//     animation: 150,
// });
// new Sortable(document.getElementsByClassName('destination_account'), {
//     group: {
//         name: 'shared',
//         pull: 'clone',
//     }, 
//        animation: 150,
// });


// create a new li element with desired data
// var newItem = document.createElement('li');
// newItem.innerHTML = '';
// document.getElementById('mastersheet_list').appendChild(newItem);
// initialize new Sortable instance on mastersheet_list
const buttons = document.querySelectorAll('.source_btn');
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const value = event.target.getAttribute('data-value');
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((menuItem) => {
            if (menuItem.getAttribute('data-value') === value) {
                menuItem.classList.add('active');
                menuItem.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            } else {
                menuItem.classList.remove('active');
            }
        });
    });
});
function submit() {
    var currentDateTime = new Date();
    var formattedDateTime = currentDateTime.toLocaleString();
    document.getElementById("date_and_time_show").innerHTML = "Last updated on " + formattedDateTime;
  }