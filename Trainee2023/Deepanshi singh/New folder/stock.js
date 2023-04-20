var stockid=0;
var partdetails = [];
var arr;
var currentStockIndex;
var notes = document.getElementById("notes").value;

function logout() {
  window.location.replace("livetask.html");
}
var d1 = JSON.parse(localStorage.getItem("user1"));
$("#p1").html(d1.name1);
console.log(d1.name1);

function add(){


  $("#exampleModal").modal('show');
  $("#stockModalTitle").html("<b>Add Stock</b>");
$("#updatedata").hide();
$("#savestock").show();
document.getElementById("stockname").value=" ";
document.getElementById("etadate").value=" ";
$("#tbody tr").remove();
}

function addmodaltable() {
  var partnumber = document.getElementById("partnumber").value;
  console.log(partnumber);
  var ordered = document.getElementById("ordered").value;
  var notes = document.getElementById("notes").value;
  var tableBody = document.getElementById("tbody");
  var newHtml = '';
  newHtml = "<tr><td>" + partnumber + '</td><td>' + 150001 + "</td><td>" + ordered + "</td><td>" + notes + "<td></tr>";
  tableBody.innerHTML += newHtml;
  stockid++;
  partdetails.push({
    partnumber: partnumber,
    ordered: ordered,
    notes: notes,
    partid: stockid,
    action:'<button type="button" class="btn-close" aria-label="Close"></button></tr></td>',

  });

  $("#exampleModal2").modal('hide');

}
// data-bs-toggle="modal" data-bs-target="#exampleModal2"

function addNewParts(){
  $("#exampleModal2").modal('show');
}

// function stockdetails(){

// }

// insertdatatable
function format(d) {
  console.log("currentRowData", d);
  console.log(d.stockid);
  // `d` is the original data object for the row
  var html = " ";
  html += '<table cellpadding="2" cellspacing="0" border="0" style="padding-left:100px" class=w-100> ';
  html += '<tr style="border-collapse:collapse;border-radius:10px;overf;low:hidden"><th>#</th><th>partnumber</th><th>Ordered</th><th>Assigned</th><th>action</th></tr>';



  d.partdetails.forEach((element) => {
    html += '<tr data-stockid="'+ d.stockid+'" data-partid="'+element.partid+'"><td>' +
      element.partid +
      '</td><td>' + element.partnumber + '</td><td>' + element.ordered + '</td><td>' + "5" + '</td><td><button type="button" class="part-delete btn-close" aria-label="Close"></button></tr></td>';
    // html += '</table>';
  });
  return html;

}

var stockname = document.getElementById("stockname").value;
var etadate = document.getElementById("etadate").value;
var stock = JSON.parse(localStorage.getItem("arr"));
var uname = JSON.parse(localStorage.getItem("loggedInUser"));
var username = JSON.parse(uname);
var createdby = username.name1;

//   var btnradio = document.getElementsByName("btnradio").value;
//  var btnradio2=document.getElementById("btnradio2").value;
//  var btnradio3=document.getElementById("btnradio3").value;

var data = [];
var table = null;

$(document).ready(function () {

  $(document).on("click", ".part-delete", function(){
   
    var row=$(this).closest("tr");
  var stockid=row.data("stockid");
  var partid=row.data("partid");
  //console.log(rowid);
  var detail =arr[ parseInt(stockid)-1];
debugger
detail.partdetails.splice(parseInt(partid),1);
arr[parseInt(stockid)-1] = detail;
  $(this).closest('tr').remove();
  //detail.partdetails
var getstock=JSON.parse(localStorage.getItem("arr"));


  
  })
 
  arr = JSON.parse(localStorage.getItem('arr'))
  console.log(arr)

  table = $('#stock').DataTable({
    data: arr,
    // binfo:true,
    // bfilter:true,
    // dom: '<"toolbar">frtip',
    // fnInitComplete: function () {
    //   $('div.toolbar').html('<b><h3>&nbsp;Stock</h3></b>');},

    columns: [
      {
        className: 'dt-control',
        orderable: false,
        data: null,
        defaultContent: '',
      },
      { data: 'stockname' },
      { data: 'etadate' },
      { data: 'sstatus' },
      { data: 'createdby' },
      { data: 'cdate' },
      { data: "note" },

      {
        data: null,
        defaultContent: '<div class="action-buttons">' +
          '<span class="edit"><i class="fa fa-pencil"></i></span> ' +
          '<span class="remove"><i class="fa fa-clock openhistory"></i></span> ' +
          '<span class="cancel"></span>' +
          '</div>',
        className: 'row-edit dt-center',
        orderable: false
      }


      // {data:''},

      //   render: function (data) {
      //     return (
      //        '<button type="button" class="fa fa-pencil edit-row" style="border: none; color:grey"></button>' +
      //        '<button type="button" class="fa fa-history" style="border: none; color:grey;"></button>'
      //     );
      //  },


      // { data: '<button onclick="deleteData()" class="btn btn-danger">delete</button><button onclick="updateDdata()" class="btn btn-warning mt-2">edit</button>' },
    ],
    order: [[1, 'asc']],
    language: {
      info: "Items 1 to 15 of 30 total",
      paginate: {
        previous: "<",
        next: ">",
      }
    },
  });
  $(".openhistory").click(function(){
  $("#auditModal").modal("show");
  });

  // stockshow
  $('#stock').on('click', '.fa-pencil' ,  function () {
    

    partdetails = [];
    // console.log('hello')
    $("#exampleModal").modal('show');
    $("#savestock").hide();
    $("#updatedata").show()
    // var currentStockIndex = $(this).closest('tr').index();
    currentStockIndex = table.row($(this).parents('tr')).index();
    console.log(currentStockIndex);
    var currentStockData = arr[currentStockIndex];
    console.log(currentStockData);
    $("#stockModalTitle").html("<b>Edit Stock</b>");
    $("#stockname").val(currentStockData.stockname);
    // alert(currentStockData.etadate)
    $("#etadate").val(currentStockData.etadate);
    // getting part table

    console.log(arr[currentStockIndex].partdetails)
   
     partdetails=arr[currentStockIndex].partdetails;
     console.log("partdetails", partdetails)
    var tableBody = document.getElementById("tbody");
   var html=" ";
  partdetails.forEach((element) => {
    html += '<tr><td>' +
      element.partid +
      '</td><td>' + element.partnumber + '</td><td>' + element.ordered + '</td><td>' + element.notes  +    '</td><td><button type="button" class="btn-close" aria-label="Close"></button></td></tr>';
    
  });
  tableBody.innerHTML = html;
   console.log(html);
    
   
   $(".btn-close").click(function(){
    var index = $(this).parents('tr').index();
    console.log(index);
    partdetails.splice(index,1);
    document.getElementById("part").deleteRow(index+1);

   })
   
   
  });


  // Add event listener for opening and closing details
  $('#stock tbody').on('click', 'td.dt-control', function () {
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
});


// crud


function showdata() {
  // var name = document.getElementById("name").value;
  // var position = document.getElementById("position").value;
  // var office = document.getElementById("office").value;
  // var salary = document.getElementById("salary").value;
  // debugger
  // var arr;

  if (localStorage.getItem("arr") == null || localStorage.getItem("arr") == undefined) {
    arr = [];
  }
  else {
    arr= JSON.parse(localStorage.getItem("arr"));
  }



}

document.onload = showdata();

function adddata() {
  $("#exampleModal").modal({backdrop: false});
  $("#exampleModal").modal('toggle');
  console.log("stockname");
  var stockname = document.getElementById("stockname").value;
  console.log("stockname", stockname);
  var etadate = document.getElementById("etadate").value;
  var cdate = new Date(Date.now()).toLocaleString().split(',')[0];

  // var notes=document.getElementById
  // var btnradio = document.getElementByName("btnradio").value;
  //  var createddate=Date.now();
  var sstatus = " ";
  var production = document.getElementById("btnradio1").checked;
  var water = document.getElementById("btnradio2").checked;
  var warehouse = document.getElementById("btnradio3").checked;

  if (production == true) {
    sstatus = "on production";
  }
  else if (water == true) {
    sstatus = "on Water";
  }
  else if (warehouse == true) {
    sstatus = "In Warewhouse";
  }
  localStorage.setItem("partdetails", partdetails[2]);
  console.log(sstatus);
  // var arr;

  if (localStorage.getItem("arr") == null) {
    arr = [];
  }
  else {
    arr= JSON.parse(localStorage.getItem("arr"));
  }
  var note=partdetails[0].notes;

  // stockid++;
  var newRow = {
    stockname: stockname,
    etadate: etadate,
    sstatus: sstatus,
    createdby: createdby,
    cdate: cdate,
    note: note,
    partdetails: partdetails,
    stockid: stockid,
  }

  arr.push(newRow);

  localStorage.setItem("arr", JSON.stringify(arr));

  
  table.row.add(newRow).draw();
 
  document.getElementById("stockname").value = "";
  document.getElementById("etadate").value = "";
  // $("#exampleModal").modal("hide");
 
  // $("#exampleModal").modal('hide');
  // document.getElementByName("btnradio").value = "";
  // document.getElementById("salary").value = "";

}
function updatestockdetails(){

  $("#exampleModal").modal({backdrop: false});
  $("#exampleModal").modal('toggle');
  console.log("stockname");
  var stockname = document.getElementById("stockname").value;
  console.log("stockname", stockname);
  var etadate = document.getElementById("etadate").value;
  var cdate = new Date(Date.now()).toLocaleString().split(',')[0];

  // var notes=document.getElementById
  // var btnradio = document.getElementByName("btnradio").value;
  //  var createddate=Date.now();
  var sstatus = " ";
  var production = document.getElementById("btnradio1").checked;
  var water = document.getElementById("btnradio2").checked;
  var warehouse = document.getElementById("btnradio3").checked;

  if (production == true) {
    sstatus = "on production";
  }
  else if (water == true) {
    sstatus = "on Water";
  }
  else if (warehouse == true) {
    sstatus = "In Warewhouse";
  }
  localStorage.setItem("partdetails", partdetails[2]);
  console.log(sstatus);
  // var arr;

  if (localStorage.getItem("arr") == null) {
    arr = [];
  }
  else {
    arr = JSON.parse(localStorage.getItem("arr"));
  }
  
  if(partdetails.length){
  var note=partdetails[0].notes;
  }else{
    var note = "";
  }

  // stockid++;
  var newRow = {
    stockname: stockname,
    etadate: etadate,
    sstatus: sstatus,
    createdby: createdby,
    cdate: cdate,
    note: note,
    partdetails: partdetails,
    stockid: stockid,
    // note:note,
    //   btnradio: btnradio,
  }

  // arr.push(newRow);
  arr[currentStockIndex]=newRow;

  localStorage.setItem("arr", JSON.stringify(arr));

  
  table.row(currentStockIndex).data(newRow).draw();
 
  document.getElementById("stockname").value = "";
  document.getElementById("etadate").value = "";
  // $("#exampleModal").modal("hide");
 
  // $("#exampleModal").modal('hide');
  // document.getElementByName("btnradio").value = "";
  // document.getElementById("salary").value = "";
  // var currentStockIndex = $(this).closest('tr').index();
  

}