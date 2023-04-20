var assignmentid=0;
var assignmentdetails;
var data = [];
var table = null;
$(document).ready(function () {
    $('.part-select').select2();
    var Customers = [
        {
            "Name": "John",
            "Id": 1
        },
        {
            "Name": "John2",
            "Id": 2
        },
        {
            "Name": "John3",
            "Id": 3
        },
        {
            "Name": "John4",
            "Id": 4
        },
    ];

    var Invoices = [
        {
            "Id": 1,
            "InvoiceNo": 15001,
            "CustomerId": 1
        },
        {
            "Id": 2,
            "InvoiceNo": 15002,
            "CustomerId": 2
        },
        {
            "Id": 3,
            "InvoiceNo": 15003,
            "CustomerId": 3
        },
        {
            "Id": 4,
            "InvoiceNo": 15004,
            "CustomerId": 4
        },
    ];
// var parts=[
//     {
//         "Id":1,
//         "partno":BW-01-S-M,
//         "stockid":1,
//     }
// ]

    $.each(Customers, function (key, value) {
        $('.customer-select')
            .append($("<option></option>")
                .attr("value", value.Id)
                .text(value.Name));
    });


    $(".customer-select").change(function () {

        var CustomerId = $(this).val();
        $('.invoice-select').html('');
        $.each(Invoices, function (key, value) {
            if (value.CustomerId == CustomerId) {
                $('.invoice-select')
                    .append($("<option></option>")
                        .attr("value", value.Id)
                        .text(value.InvoiceNo));
            }

        });

    });

    var stock = JSON.parse(localStorage.getItem("arr"));
    console.log((stock));
    $.each(stock, function (key, value) {
        $('.stock-select')
            .append($("<option></option>")
                .attr("value", value.stockid)
                .text(value.stockname));
    });

    $(".stock-select").change(function(){        
        var StockId= $(this).val();
        var stockids = JSON.parse(localStorage.getItem("arr"));
        $('#partselect').html('');
        $.each(stockids, function (key, value) {
            if(value.stockid== parseInt(StockId)){
                    $.each(value.partdetails,function(i,part)
                    {
                       var newOption = new Option(part.partnumber, part.partnumber, false, false);
                        $('#partselect').append(newOption).trigger('change');
                    });

             console.log(value.partdetails);
            }            
        });
        
        //var StockPart = stockids[parent(StockId)];
    });    // $(".part-select").change(function () {

    //     var stockid = JSON.parse(localStorage.getItem("arr"));
    //     $('.part-select').html('');
    //     $.each(parts, function (key, value) {
    //         if (value.CustomerId == CustomerId) {
    //             $('.invoice-select')
    //                 .append($("<option></option>")
    //                     .attr("value", value.Id)
    //                     .text(value.InvoiceNo));
    //         }

    //     });

    // });
   

    $(".js-select2").select2({
        closeOnSelect: false,
        placeholder: "Placeholder",
        allowHtml: true,
        allowClear: true,
        tags: true // создает новые опции на лету
    });
    

    // $(".btn-close").click(function(){
    //     debugger
    //     var index = $(this).parents('tr').index();
    //     console.log(index);
    //     assignmentable.splice(index,1);
    //     document.getElementById("assignmentable").deleteRow(index+1);    
    //    });

       $(document).on("click",".btn-close",function(){
        $(this).parents('tr').remove();
        assignmentid = assignmentid-1;
        //alert("okay");
       });
});

function format(d) {
    // `d` is the original data object for the row
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr class="text-center">' +
        '<td>Full name:</td>' +
        '<td>' +
        d.name +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extension number:</td>' +
        '<td>' +
        d.position +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extra info:</td>' +
        '<td>And any further details here (images etc)...</td>' +
        '</tr>' +
        '</table>'
    );
    // var html = " ";
    // html += '<table cellpadding="2" cellspacing="0" border="0" style="padding-left:100px" class=w-100> ';
    // html += '<tr style="border-collapse:collapse;border-radius:10px;overf;low:hidden"><th>#</th><th>partnumber</th><th>Stock Location</th><th>action</th></tr>';
    // html += '<tr><td>1</td><td>BW-XS-05</td><td>Warehouse</td><td><i class="fa-solid fa-xmark"></i></td></tr>'
    // html += '<tr><td>2</td><td>AT-01-BLK</td><td>In Water</td><td><i class="fa-solid fa-xmark"></i></td></tr>'
    // html += '<tr><td>3</td><td>BW-03-XLG</td><td>On production</td><td><i class="fa-solid fa-xmark"></i></td></tr>'
    // return html;


}



var data = [];
   

var table = $('#assignment').DataTable({
    data: assignmentdetails,
    // dom: '<"toolbar">frtip',
    // fnInitComplete: function () {
    //   $('div.toolbar').html('<b><h3>&nbsp;status</h3></b>');},
    columns: [
        {
            className: 'dt-control',
            orderable: false,
            data: null,
            defaultContent: '',
        },
        { data: 'InvoiceNo' },
        { data: 'CustomerName' },
        { data: 'createdby' },

        {
            data: 'createddate'
            //     render: function(data, type, row, meta) {
            //   return data + ' <button type="button" class="alert alert-primary p-1"><i class="fa fa-check">Paid</i></button>';

        },
        { data: 'action' },
        // { data: 'deliveryphone' },
        // { data: 'called',render: function(data,  row, meta) {
        //   return '<input type="checkbox" style="text-size:10">';
        // } },
        // { data: 'tracking' },
    ],

    language: {
        info: "Items 1 to 15 of 30 total",
        paginate: {
            previous: "<",
            next: ">",
        }
    },
    order: [[1, 'asc']],
});


// Add event listener for opening and closing details
$('#status tbody').on('click', 'td.dt-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row(tr);

    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
    } else {
        // Open this row
        row.child(format(row.data())).show();
        tr.addClass('shown');
    }
});


var d1 = JSON.parse(localStorage.getItem("user1"));
$("#p1").html(d1.name1);
console.log(d1.name1);


function logout() {
    window.location.replace("livetask.html");
}
function addassignmentdetails(){
    
var part=document.getElementById("partselect").value;
var stock=document.getElementById("stockselect").value;
var stock=JSON.parse(localStorage.getItem("arr"));
var html=" ";
// html+='<table>'
// html+='<tr><th>#</th><tr><th>Stock</th><th>part</th><th>Action</th>';
// html+='</table>'
assignmentid++;
stock.forEach((element) => {
   var stockname=element.stockname;
   console.log(stockname);
   html+='<tr><td>'+ assignmentid + '</td><td>' + element.stockname + '</td><td>' + part + '</td><td><button type="button" class="part-delete btn-close" aria-label="Close"></button></tr></td>';
    
  });
  assignmentable.innerHTML+=html;

}
function addassignment(){    
  //var customers=document.getElementById("customerselect").value;
  //$("#customerselect").text();
  debugger
  var CustomerName = $(".customer-select option:selected").text();
  var InvoiceNo = $(".invoice-select option:selected").text();
  var StockName = $(".stock-select option:selected").text();
  var part=document.getElementById("partselect").value;
  var x = localStorage.getItem("assignmentdetails");
 var uname = JSON.parse(localStorage.getItem("loggedInUser"));
 var username = JSON.parse(uname);
 var createdby = username.name1; 
 var createddate = new Date(Date.now()).toLocaleString().split(',')[0];
  if (localStorage.getItem("assignmentdetails") == null || localStorage.getItem("assignmentdetails") == "undefined") {
    assignmentdetails = [];
  }
  else {
    assignmentdetails = JSON.parse(localStorage.getItem("assignmentdetails"));
  }
//   alert(part);
 var assignmentrow={
    InvoiceNo:InvoiceNo,
    CustomerName:CustomerName,
    createdby:createdby,
    createddate:createddate,
    action: '<div class="action-buttons">' +
    '<span class="edit"><i class="fa fa-pencil"></i></span> ' +
    '<span class="remove"><i class="fa fa-trash"></i></span> ' +
    '<span class="cancel"></span>' +
    '</div>',
    
 };
 assignmentdetails.push(assignmentrow);
 localStorage.setItem("assignmentdetails", JSON.stringify(assignmentdetails));

//  localStorage.setItem("assignmentdetails", JSON.stringify(assignmentdetails));

 
 table.row.add(assignmentrow).draw();
 document.getElementById("customerselect")=" ";
 document.getElementById("stockselect")=" ";
 document.getElementById("invoiceselect")=" ";
}