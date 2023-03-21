
var getvalueofcsv = [];
var getvalueofmasterdata = [];
let mostlikelysDroppedNumbers = [];
var result = [];

$(document).ready(function () {
    // showdata();
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
                    console.log("evt", evt)
                    debugger
                    var mostlikelycontent = evt.item.parentNode;
                    console.log(mostlikelycontent)
                    // var firstChild = mostlikelycontent.children[0];
                    // console.log(firstChild)
                    // console.log(mostlikelycontent)
                    if (mostlikelycontent.children.length > 1) {
                        var firstChild = mostlikelycontent.children[0];
                        var likely_shift = mostlikelycontent.children[1];
                        console.log(firstChild.textContent.trim());
                        console.log(mostlikelycontent.firstChild.textContent.trim())
                        if (firstChild.textContent.trim() == likely_shift.textContent.trim()) {
                            swal("same value does not exist!");
                            // firstChild.children[0].remove();

                        }
                        // if (firstChild.textContent.trim() === likely_shift.textContent.trim()) 
                        // {
                        //     swal("same value does not exist!");                    
                        // }
                        else {
                            var compareandget_id = mostlikelycontent.getAttribute('id').substring(mostlikelycontent.getAttribute('id').indexOf('_'));
                            var possible = document.getElementById('possible' + compareandget_id);
                            var likely = document.getElementById('likely' + compareandget_id);

                            if (likely.children.length == 0) {
                                likely.appendChild(likely_shift);
                            }
                            else if (likely.children.length == 1) {

                                likely.appendChild(likely_shift);
                                if (possible.children.length == 0) {
                                    var secondlikelychild = likely.children[0];
                                    possible.appendChild(secondlikelychild)
                                }
                                else if (possible.children.length == 1) {
                                    possible.children[0].remove();
                                    var secondlikelychild = likely.children[0];
                                    possible.appendChild(secondlikelychild)
                                }



                            }
                        }

                    }

                }
            })
        });
        $('.likelydrag').each(function () {
            new Sortable(this, {
                group: 'shared',
                animation: 150,
                onAdd: function (evt) {

                    var likelycontent = evt.item.parentNode;
                    if (likelycontent.children.length > 1) {
                        var firstChild = likelycontent.children[0];
                        var possible_shift = likelycontent.children[1];
                        if (firstChild.textContent.trim() == possible_shift.textContent.trim()) {
                            swal("same value does not exist!");
                        }
                        else {
                            var compareandget_id = likelycontent.getAttribute('id').substring(likelycontent.getAttribute('id').indexOf('_'));
                            var possible = document.getElementById('possible' + compareandget_id);
                            if (possible.children.length == 0) {
                                possible.appendChild(possible_shift);
                            }
                            else if (possible.children.length == 1) {
                                possible.appendChild(possible_shift);
                                var possiblechild = possible.children[0];
                                possiblechild.remove();
                            }
                        }
                    }
                }
            })
        })
        $('.possibledrag').each(function () {
            new Sortable(this, {
                group: 'shared',
                animation: 150,
                onAdd: function (evt) {
                    var possiblecontent = evt.item.parentNode;
                    if (possiblecontent.children.length > 1) {
                        possiblecontent.children[1].remove();
                    }
                }
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
            // $('.btndrag').each(function () {
            //     debugger
            //     new Sortable(this, {
            //         group: 'shared',
            //         animation: 150,
            //     })
            // })

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
    showdata();
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
    var dataget = getvalueofmasterdata;  //Done
    var storedData = localStorage.getItem("Data");
    let storearray = JSON.parse(storedData);  
    console.log("LIKELY Data",storearray);
    console.log("Destination data",dataget);;
    console.log(dataget.AccountCode)
    

    dataget.forEach((list) => {

    //   console.log(list.AccountCode)
    })
    storearray.forEach(() =>{
        // console.log(list.ID)
        var dataValuesmostlikely = $('#mostlikely li.list-group-item').map(function() {
            return $(this).data('value');
          }).get();
          console.log(dataValuesmostlikely)


    });

      
    // if()



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
    sort: false
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
    debugger
    var array = new Array;
   

    result.forEach((li) => {

        //let Data = li.AccountCode
        //   console.log(Data)
        let datatostore = {
            ID: li.Number,
            mostlikelys: $(`#mostlikely_${li.Number}`).html(),
            likelys: $(`#likely_${li.Number}`).html(),
            possible: $(`#possible_${li.Number}`).html(),
            //Data_store: Data
        };
        array.push(datatostore);
        localStorage.setItem("Data", JSON.stringify(array));

    })
    // showdata();

}
function showdata() {
    debugger
    var storedData = localStorage.getItem("Data");
    let storearray = JSON.parse(storedData);
    console.log(storearray)
    if (storearray) {
        storearray.forEach(li => {
            // var id = li.ID;
            // var mostlike = li.mostlikelys;
            // var likelys = li.likelys;
            // var possible = li.possible;  
            // console.log("ytryutyu",mostlike)

            $(`#mostlikely_${li.ID}`).html(li.mostlikelys);
                $(`#likely_${li.ID}`).html(li.likelys);
                $(`#possible_${li.ID}`).html(li.possible);


        })
    }

}
var currentDateTime = new Date();
var formattedDateTime = currentDateTime.toLocaleString();
document.getElementById("date_and_time_show").innerHTML = "Last updated on " + formattedDateTime;
// window.addEventListener("load", (event) => {
//     console.log("page is fully loaded");
//     // Retrieve the data from localStorage
// let storedData = JSON.parse(localStorage.getItem("Data"));

// // Use the data as needed
// $("#mostlikelys").html(storedData.mostlikelys);
// $("#likelys").html(storedData.likelys);
// $("#possible").html(storedData.possible);
// let getvalueofmasterdata = storedData.getvalueofmasterdata;

//   });

