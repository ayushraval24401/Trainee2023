$(document).ready(function () {


  // checking user
  const checkuser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (checkuser == null) {
    location.replace("./index.html");
  }
  //setting username 
  var activeuser = JSON.parse(localStorage.getItem("loggedInUser"));
  $("#activeuser").html(activeuser.username);

  // Validations

  $.validator.addMethod("StockNameFormat", function (value, element) {
    return this.optional(element) || /^[a-zA-Z]\-\d{3}$/.test(value);
  }, "Please enter a value in the format of a single alphabet, followed by a dash, followed by three numbers.");

  $('#StockForm').validate({
    rules: {
      StockName: {
        required: true,
        StockNameFormat: true,
      },
      btnradio: {
        required: true
      },
      ETAdate: {
        required: true
      }
    },
    messages: {
      StockName: {
        required: "Please Provide Stock Name",
        StockNameFormat: "Check Stock Name Format",
      },
      btnradio: {
        required: "Please select an option"
      },
      ETAdate: {
        required: "Choose Date"
      }

    }
  })


  $('#PartNumberForm').validate({
    rules: {
      part_num:
        { required: true },
      ordered:
        { required: true }
    },
    messages: {
      part_num:
        { required: "Enter Part Number" },
      ordered:
        { required: "Enter no. of Orders" }
    }

  })





  // ----------------------------------------------------------------------------------------------------------------------------------
  // Add New Stock Button
  var AddNewStock = document.getElementById("AddNewStock");

  // Showing Modals
  $("#AddNewStock").click(function () {
    // Clear form fields
    $("#StockName").val("");
    $("#ETAdate").val("");
    $('input[name="btnradio"]').prop('checked', false);
    $("#table2body").html("");
    // Show AddStockModal
    $('#AddStockModal').modal('show');
  })

  $('#AddPart').click(function () {
    $('#AddPartModal').modal('show');
  });
  // ----------------------------------------------------------------------------------------------------------------------------------
  $(function () {
    $('input[name="ETAdate"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format('YYYY'), 10)
    },

      function (start, end, label) {
        var years = moment().diff(start, 'years');
      });
    $('input[name="ETAdate"]').val('');
    $('input[name="ETAdate"]').attr("placeholder", "MM/DD/YYYY");
  });
  // ----------------------------------------------------------------------------------------------------------------------------------
  // Initialize variables
  var part_num = "";
  var invoice_num = "";
  var ordered = "";
  var notes = "";

  // Handle click on Add Part Number button
  $("#AddPart").click(function () {
    // Clear previous form data
    $("#part_num").val("");
    $("#ordered").val("");
    $("#notes").val("");
    // Show AddPartModal
    $("#AddPartModal").modal("show");
  });
  var partdata = [];

  // Handle click on Save Part Number button
  $("#save_part").click(function () {
    if ($("#PartNumberForm").valid() == true) {
      // Get form data
      part_num = $("#part_num").val();
      invoice_num = 1500012;
      ordered = $("#ordered").val();
      notes = $("#notes").val();
      var obj = {
        part_num: part_num,
        ordered: ordered,
        notes: notes
      };
      // Push object into array
      partdata.push(obj);
      // Append data to table
      $("#table2body").append("<tr><td>" + part_num + "</td><td>"
        + invoice_num + "</td><td>" + ordered + "</td><td>"
        + notes + "</td><td><button type='button' class='btn btn-sm btn-danger delete-row'>Delete</button></td></tr>");
      $("#AddPartModal").modal("hide");

      // Delete Function
      $(document).on("click", ".delete-row", function () {
        var partindex = $(this).closest("tr").index();
        partdata.splice(partindex, 1);
        $(this).closest("tr").remove();
      });
    }


  });

  $(document).on("click", ".closemodal", function () {
    $("#StockName").val("");
    $("#ETAdate").val("");
    $('input[name="btnradio"]').prop('checked', false);
    $("#table2body").html("");
    partdata = [];
  });

  $("#save_changes").click(function () {
    if ($("#StockForm").valid() == true) {

      if (partdata.length > 0 || partdata.notes == "") {
        var StockNotes = partdata[partdata.length - 1].notes;
      }
      // Get form data
      var stockName = $("#StockName").val();
      var etaDate = $("#ETAdate").val();
      var selectedStockstatus = $('input[name="btnradio"]:checked').val();
      var createdby = "Kenneth";
      var createddate = "10/08/2000";
      var StockNotes = StockNotes;
      var action = "";

      // Check if the stock name already exists
      var StockData = JSON.parse(localStorage.getItem("StockData")) || [];
      for (var i = 0; i < StockData.length; i++) {
        if (StockData[i].stockName.toLowerCase() === stockName.toLowerCase()) {
          alert("Stock name already exists!");
          return;
        }
      }

      // Check if at least one part is present
      if (partdata.length === 0) {
        alert("Please add at least one part.");
        return;
      }

      // Create object to store data
      var StockDataObject = {
        stockName: stockName,
        etaDate: etaDate,
        selectedStockstatus: selectedStockstatus,
        partData: partdata,
        createdby: createdby,
        createddate: createddate,
        StockNotes: StockNotes,
        action: action
      };

      // Retrieve existing data from local storage
      var StockData = JSON.parse(localStorage.getItem("StockData")) || [];
      // Append new data to existing array
      StockData.push(StockDataObject);
      // Store updated array in local storage
      localStorage.setItem("StockData", JSON.stringify(StockData));
      $('#AddStockModal').modal('hide');
      location.reload(true);
    }

  });


  function format(d) {
    debugger
    let childRowHTML = '';
    if (d.partData && d.partData.length > 0) {
      childRowHTML += '<table class="text-center" id="childtable" style="width:100%;">';
      childRowHTML += '<thead  style="background-color: aquamarine;"><tr><th class="text-center" >#</th><th class="text-center">Part No</th><th class="text-center">Order No</th><th class="text-center">Notes</th><th class="text-center">Action</th></tr></thead>';
      childRowHTML += '<tbody>';
      d.partData.forEach((partData, index) => {
        const rowNumber = index + 1;
        childRowHTML += '<tr><td>' + rowNumber + '</td><td>' + partData.part_num + '</td><td>' + partData.ordered + '</td><td>'
          + partData.notes + `</td><td> <button type="button" data-stock="${d.stockName}" class="btn-close cancelpart" aria-label="Close"></button></td></tr>`;
      });
      childRowHTML += '</tbody>';
      childRowHTML += '</table>';
    }
    return childRowHTML;
  }


  var stockData = JSON.parse(localStorage.getItem("StockData"));
  // Define the DataTable
  var table = $('#Stockable').DataTable({
    "paging": true,
    "dom": '<"toolbar">frtip',
    bFilter: true,
    bInfo: true,
    fnInitComplete: function () {
      $('div.toolbar').html('<h2>Stock</h2>');
      $('#Stockable_filter').prepend(AddNewStock);
    },
    language: {
      search: "_INPUT_",
      searchPlaceholder: 'Search...',
      paginate: {
        next: '&#62',
        previous: '&#60'
      }
    },
    data: stockData,
    columns: [
      { data: 'stockName', className: 'text-start dt-control', orderable: false },
      { data: 'etaDate', className: 'text-center', orderable: false },
      {
        data: 'selectedStockstatus',
        className: 'text-center',
        orderable: false,
        render: function (data, type, row) {
          // create a select element with options
          var select = '<select class="statusdropdown"><option value="Change">Change </option><option value="In Warehouse">In Warehouse</option><option value="On Water">On Water</option><option value="On Production">On Production</option></select>';
          // return the select element as the cell content
          return select + data;
        }
      }
      ,
      { data: 'createdby', className: 'text-center', orderable: false },
      { data: 'createddate', className: 'text-center', orderable: false },
      { data: 'StockNotes', className: 'text-center', orderable: false },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return (
            '<button type="button" class="btn btn-sm edit"><i class="fa fa-pencil"></i></button>' +
            '<button type="button" class="btn btn-sm history"><i class="fa fa-history"></i></button>'
          );
        },
      },
    ],
    order: [],
  });

  $('#Stockable tbody').on('change', 'select', function () {

    var rowData = table.row($(this).closest('tr')).data(); // get the data for the current row
    var newValue = $(this).val(); // get the new value from the dropdown
    rowData.selectedStockstatus = newValue; // update the data object
    table.row($(this).closest('tr')).data(rowData); // update the table

    // update the local storage
    var data = JSON.parse(localStorage.getItem('StockData'));
    var index = data.findIndex(function (item) {
      return item.stockName === rowData.stockName;
    });
    if (index !== -1) {
      data[index].selectedStockstatus = newValue;
      localStorage.setItem('StockData', JSON.stringify(data));
    }
    location.reload(true)
  });


  $('#Stockable tbody').on('click', '.edit', function () {
    var data = table.row($(this).parents('tr')).data();
    var index = table.row($(this).parents('tr')).index();
    // Populate AddStockModal with data
    $("#StockName").val(data.stockName);
    $("#ETAdate").val(data.etaDate);
    $('input[name="btnradio"][value="' + data.selectedStockstatus + '"]').prop('checked', true);
    // Populate part table with data
    if (data.partData && data.partData.length > 0) {
      data.partData.forEach(function (partData) {
        $("#table2body").append("<tr><td>" + partData.part_num + "</td><td>"
          + partData.invoice_num + "</td><td>" + partData.ordered + "</td><td>"
          + partData.notes + "</td><td><button type='button' class='btn btn-sm btn-danger delete-row'>Delete</button></td></tr>");
      });
    }

    // Delete Function
    $(document).on("click", ".delete-row", function () {
      var partindex = $(this).closest("tr").index();
      partdata.splice(partindex, 1);
      $(this).closest("tr").remove();
    });

    partdata = data.partData;
    // Show AddStockModal
    $('#AddStockModal').modal('show');

    // Handle click on Save Changes button
    $("#save_changes").unbind('click').click(function () {

      if (partdata.length > 0) {
        var StockNotes = partdata[partdata.length - 1].notes;
      }

      // Get form data
      var stockName = $("#StockName").val();
      var etaDate = $("#ETAdate").val();
      var selectedStockstatus = $('input[name="btnradio"]:checked').val();
      var createdby = "Kenneth";
      var createddate = "08/25/2000";
      var StockNotes = StockNotes;
      var action = "";

      // Check if at least one part is present
      if (partdata.length === 0) {
        alert("Please add at least one part.");
        return;
      }


      // Update object at the specified index in the array
      var StockDataObject = {
        stockName: stockName,
        etaDate: etaDate,
        selectedStockstatus: selectedStockstatus,
        partData: partdata,
        createdby: createdby,
        createddate: createddate,
        StockNotes: StockNotes,
        action: action
      };
      var StockData = JSON.parse(localStorage.getItem("StockData")) || [];
      StockData[index] = StockDataObject;
      localStorage.setItem("StockData", JSON.stringify(StockData));
      $('#AddStockModal').modal('hide');
      location.reload(true);
    });
  });

  $(document).on("click", ".cancelpart", function () {
    var index;
    var currentStockName = $(this).attr("data-stock");
    // Remove the corresponding data from local storage
    var StockData = JSON.parse(localStorage.getItem("StockData")) || [];
    var stockIndex = StockData.findIndex(x => x.stockName == currentStockName);
    if (StockData[stockIndex].partData && StockData[stockIndex].partData.length > 0) {
      StockData[stockIndex].partData.splice(index, 1);
      localStorage.setItem("StockData", JSON.stringify(StockData));
    } +
      partdata.splice(index, 1);
    $(this).closest("tr").remove();
    location.reload(true);
  });


  // Add event listener for opening and closing details
  $('#Stockable tbody').on('click', 'td.dt-control', function () {
    debugger
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

  // -------------------------------------------------------------------------------------------------------------
  $("#logout").click(function () {
    localStorage.removeItem("loggedInUser");
    location.replace("index.html");
  });
});


