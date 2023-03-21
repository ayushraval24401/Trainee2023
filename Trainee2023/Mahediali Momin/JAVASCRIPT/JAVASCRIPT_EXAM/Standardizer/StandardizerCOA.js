// Destination 
const destinationdata = new XMLHttpRequest();
destinationdata.open("GET", "MasterChartOfAcounts - Sheet1.csv", false);

var masterChartAccountDataString;
var masterChartAccountObject;
var masterChartAccountData = [];
destinationdata.onreadystatechange = function () {
    if (destinationdata.readyState === XMLHttpRequest.DONE && destinationdata.status === 200) {
        const csv = destinationdata.responseText;

        const rows = csv.split("\n");
        const headers = rows[0].split(",");

        masterChartAccountData = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(",");
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = row[j];
            }
            masterChartAccountData.push(obj);
        }
        console.log(masterChartAccountData)

        masterChartAccountDataString = JSON.stringify(masterChartAccountData);
        masterChartAccountObject = JSON.parse(masterChartAccountDataString);
    }
};
destinationdata.send();

var destinationData = JSON.parse(masterChartAccountDataString);
const parentElement = document.getElementById('DestinationAccount');

destinationData.forEach((item) => {
    var liElement = document.createElement('li');
    liElement.textContent = `⠿ ${item.AccountCode} ${'--'} ${item.AccountName}`;
    liElement.classList.add('list-group-item')
    parentElement.appendChild(liElement);


});







const buttons = document.querySelectorAll('.header-button');
const links = document.querySelectorAll('.menu-inner-box a');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        button.classList.add('active');

        const btnType = button.getAttribute('data-link-value');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-link-value') === btnType) {
                link.classList.add('active');
                link.scrollIntoView({ behavior: "smooth", block: "nearest" });
                if (link.classList.contains('active')) {
                    link.click();
                }
            }
        });
    });
});


$('.menu-inner-box a').click(function () {
    var button = $(this).data("link-value");
    console.log(button);
    document.getElementById('DestinationAccount').innerHTML = ""
    destinationData.forEach((item) => {
        if (item.AccountTypeName == button) {
            var liElement = document.createElement('li');
            liElement.textContent = `⠿ ${item.AccountCode} ${'--'} ${item.AccountName}`;
            liElement.classList.add('list-group-item')
            parentElement.appendChild(liElement);
        }
    });
});


$('#all').click(function () {
    destinationData.forEach((item) => {
        // if(item.AccountTypeName==button){
        var liElement = document.createElement('li');
        liElement.textContent = `⠿ ${item.AccountCode} ${'--'} ${item.AccountName}`;
        liElement.classList.add('list-group-item')
        parentElement.appendChild(liElement);
        // } 
    });
});





// document.querySelector('.submit').addEventListener('click', function() {
//     const liElements = document.querySelectorAll('.destinations');
//     const data = [];

//     liElements.forEach(function(li) {
//     const customValue = li.getAttribute('data-custom-attribute');
//     const textContent = li.textContent;
//     data.push({
//         customValue: customValue,
//         textContent: textContent
//     });
//     });

//     // Save the data to local storage
//     localStorage.setItem('draggedLiData', JSON.stringify(data));
// });


// $('.destinations').each(function () {
//     new Sortable(this, {
//         group: 'shared',
//         animation: 150,
//         dragClass: 'dragged-item', // add a class to the dragged item
//         onEnd: function (evt) {
//             // remove the class when dragging ends
//             evt.item.classList.remove('list-group-item');
//         },
//         accept: function (el) {
//             // only allow dropping onto elements with the class "target"
//             return el.classList.contains('target');
//         }
//     })
// })

// var dest = document.getElementById("DestinationAccount");
// new Sortable(dest, {
//     group: {
//         name: 'shared',
//         pull: 'clone',
//         put: false // Do not allow items to be put into this list
//     },
//     animation: 150,
//     sort: false // To disable sorting: set sort to false
// });





//for searchbar
$(document).ready(function () {
    debugger
    //Source data
    var sourcedata = new XMLHttpRequest();
    sourcedata.open("GET", "Standard CofA.csv", false);
    debugger

    var standardcofstring;
    var standardcofobject;
    var standardcofData = [];
    sourcedata.onreadystatechange = function () {
        if (sourcedata.readyState === XMLHttpRequest.DONE && sourcedata.status === 200) {
            const csv = sourcedata.responseText;

            const rows = csv.split("\n");
            const headers = rows[0].split(",");

            standardcofData = [];
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i].split(",");
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = row[j];
                }
                standardcofData.push(obj);
            }
            standardcofstring = JSON.stringify(standardcofData);
            standardcofobject = JSON.parse(standardcofstring);


        }

    };
    sourcedata.send();


    var sourcedata = JSON.parse(standardcofstring);
    const parent = document.getElementById('SourceAccount');


    sourcedata.forEach((item) => {
        if (item.Number != "") {
            // var liElement = document.createElement('li');
            $("#SourceAccount").append("<li id='num" + item.Number + "' class='list-group-item'>" + item.Number + " -- " + item.Name + "<i class='material-icons float-end'>done_all history</i>");
            // liElement.classList.add('list-group-item')
            // parent.appendChild(liElement);

            $("#mostlikely").append("<li id='Most_likely" + item.Number + "' <li class='list-group-item destinations MostLikelyList'></li>")
                .attr("data-custom-attribute", "custom-value");
            $("#likely").append("<li id='Likely_" + item.Number + "' <li class='list-group-item destinations LikelyList'></li>")
                .attr("data-custom-attribute", "custom-value");
            $("#possible").append("<li id='Possible_" + item.Number + "' <li class='list-group-item destinations PossibleList'></li>")
                .attr("data-custom-attribute", "custom-value");
        }

    });

  

    


    ///Filtering with buttons

    $('.header-button').click(function () {
        debugger
        var button = $(this).data("btn-type");
        var mostlikely = $("#mostlikely");
        var likely = $("#likely");
        var possible = $("#possible");

        $("#SourceAccount li").hide();
        mostlikely.find("li").hide();
        likely.find("li").hide();
        possible.find("li").hide();

        debugger
        sourcedata.forEach((item) => {
            if (item.Type == button) {
                if (item.Number != "") {
                    // var liElement = document.createElement('li');
                    // liElement.innerHTML = `${item.Number} ${'--'} ${item.Name} ` + `<i class='material-icons float-end'>done_all history</i>`;
                    // liElement.classList.add('list-group-item')
                    // parent.appendChild(liElement);

                    // $("#mostlikely").append("<li class='list-group-item destinations'></li>");
                    // $("#likely").append("<li class='list-group-item destinations'></li>");
                    // $("#possible").append("<li class='list-group-item destinations'></li>");

                    $("#num" + item.Number).show();
                    $("#Most_likely" + item.Number).show();
                    $("#Likely_" + item.Number).show();
                    $("#Possible_" + item.Number).show();

                }
                
            }
            
        });
        

        var Destination = "";
        if (button == "Assets") {
            Destination = "ASSETS"
        }
        if (button == "Liabilities") {
            Destination = "LIABILITIES"
        }
        if (button == "Equity") {
            Destination = "EQUITY/CAPITAL"
        }
        if (button == "Revenue") {
            Destination = "Revenue"
        }
        if (button == "Other Rev & Exp") {
            Destination = "Labor Expense"
        }


        destinationData.forEach((item) => {
            if (item.AccountTypeName == Destination) {
                var liElement = document.createElement('li');
                liElement.textContent = `⠿ ${item.AccountCode} ${'--'} ${item.AccountName}`;
                liElement.classList.add('list-group-item')
                parentElement.appendChild(liElement);
            }
        });
    });



   

    $('.search').on('keyup search', function () {
        var query = $(this).val().toLowerCase();
        $('#DestinationAccount li').each(function () {
            var text = $(this).text().toLowerCase();
            if (text.indexOf(query) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
    $('.header-button').on('click', function () {
        $('.header-button').removeClass('active');
        $(this).addClass('active');
    });
    $('.submit').on('click', function () {
        $('.submit').removeClass('active');
        $(this).addClass('active');
    });
    $('#btn-nav-previous').click(function () {
        $(".menu-inner-box").animate({ scrollLeft: "-=100px" });
    });

    $('#btn-nav-next').click(function () {
        $(".menu-inner-box").animate({ scrollLeft: "+=100px" });
    });
});

$(document).ready(function (){
 $('.destinations').each(function () {
        new Sortable(this, {
            group: 'shared',
            animation: 150,
            dragClass: 'dragged-item', // add a class to the dragged item
            onEnd: function (evt) {
                // remove the class when dragging ends
                evt.item.classList.remove('list-group-item');
            },
            accept: function (el) {
                // only allow dropping onto elements with the class "target"
                return el.classList.contains('target');
            }
        })
    })

    var dest = document.getElementById("DestinationAccount");
    new Sortable(dest, {
        group: {
            name: 'shared',
            pull: 'clone',
            put: false // Do not allow items to be put into this list
        },
        animation: 150,
        sort: false // To disable sorting: set sort to false
    });
})


// // header buttons
// $(document).ready(function () {
//     $('.header-button').on('click', function () {
//         $('.header-button').removeClass('active');
//         $(this).addClass('active');
//     });
//     $('.submit').on('click', function () {
//         $('.submit').removeClass('active');
//         $(this).addClass('active');
//     });
// });


document.querySelectorAll('.menu-inner-box a').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelectorAll('.menu-inner-box a').forEach(function (link) {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});


// $(document).ready(function () {
//     $('#btn-nav-previous').click(function () {
//         $(".menu-inner-box").animate({ scrollLeft: "-=100px" });
//     });

//     $('#btn-nav-next').click(function () {
//         $(".menu-inner-box").animate({ scrollLeft: "+=100px" });
//     });
// });

//date and time
function showDateTime() {
    var now = new Date();
    var dateTime = "Last updated on " + now.toLocaleDateString() + " at " + now.toLocaleTimeString();
    document.getElementById("updatetxt").innerHTML = dateTime;
}



// $(".MostLikelyList").each(function () {
//     new Sortable(this, {
//         group: "shared",
//         animation: 150,
//         onAdd: function (evt) {
//             evt.item.classList = "sort";
//             var parentContainer = evt.item.parentNode;
//             if (parentContainer = parentContainer.children > 1) {
//                 var secondItem = parentContainer.children[1];
//                 var destination = parentContainer.getAttribute('id').substring(parentContainer.getAttribute('id').indexOf('_'));
//                 var possible = document.getElementById('possible' + destination);
//                 var likely = document.getElementById('likely' + destination);


//                 if (likely.children.length == 0) {
//                     likely.appendChild(secondItem);
//                 }
//                 else if (likely.children.length == 1) {
//                     likely.appendChild(secondItem);

//                     if (possible.children.length == 0) {
//                         var secondlikelychild = likely.children[0];
//                         possible.appendChild(secondlikelychild)
//                     }
//                     else if (possible.children.length == 1) {
//                         possible.children[0].remove();
//                         var secondlikelychild = likely.children[0];
//                         possible.appendChild(secondlikelychild)
//                     }
//                 }
//             }
//         }
//     })
// });
$(".LikelyList").each(function () {
    new Sortable(this, {
        group: "shared",
        animation: 150,
        onAdd: function (evt) {
            evt.item.classList = "sort";
            var parentContainer = evt.item.parentNode;
            if (parentContainer.children.length > 1) {
                var secondItem = parentContainer.children[1];
                var destination = parentContainer.getAttribute('id').substring(parentContainer.getAttribute('id').indexOf('_'))
                var possible = document.getElementById('possible' + destination);

                if (possible.children.length == 0) {
                    possible.appendChild(secondItem);
                }
                else if (possible.children.length == 1) {
                    possible.appendChild(secondItem);
                    var possibleschild = possible.children[0];
                    possibleschild.remove();
                }
            }
        }
    });
});

$(".PossibleList").each(function () {
    new Sortable(this, {
        group: "shared",
        animation: 150,
        onAdd: function (evt) {
            evt.item.classList = "sort";
            var parentContainer = evt.item.parentNode;
            if (parentContainer = parentContainer.children > 1) {
                parentContainer.children[1].remove();
            }
        }
    });
});






