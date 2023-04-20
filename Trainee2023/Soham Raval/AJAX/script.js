$(document).ready(function () {
  getdata();
});

const url = "https://demosatva.azurewebsites.net/v1/api/Events";
//GET
var tableBody = $('#tablbody');
function getdata() {
  $.ajax({
    url: url,
    method: 'GET',

    success: function (data) {
      console.log("mydata", data);

      tableBody.empty(); // Remove existing rows

      if(data.document&&data.document.records){

        $.each(data.document.records, function (index, item) {
          var row = $('<tr>');
          row.append($('<td>').text(item.eventTitle));
          row.append($('<td>').text(item.startDate));
          row.append($('<td>').text(item.endDate));
          row.append($('<td>').text(item.eventDescription));
          row.append($('<td>').text(item.eventPriority));
  
          var editBtn = $('<button>').text('Edit').data('id', item.id).addClass('btn btn-primary');
          var deleteBtn = $('<button>').text('Delete').data('id', item.id).addClass('btn btn-danger ms-2');
  
          var buttonTd = $('<td>');
          buttonTd.append(editBtn);
          buttonTd.append(deleteBtn);
          row.append(buttonTd);
  
          deleteBtn.on('click', function () {
            deleteData($(this).data('id'), $(this).closest('tr').index());
          });
          editBtn.on('click', function () {
            editData($(this).data('id'));
          });
  
  
          tableBody.append(row);
        });
      }
      else{
        alert("ERROR")
      }

    },
    error: function () {
      console.log('Failed to fetch data from API');
    }
  });
}

function deleteData(id, rowIndex) {
  $.ajax({
    url: "https://demosatva.azurewebsites.net/v1/api/Events/" + id,
    type: 'DELETE',
    success: function (response) {
      console.log(response);
      tableBody.find('tr').eq(rowIndex).remove();
    },
    error: function (error) {
      console.log(error.responseText);
    }
  });
}
function editData(id) {
  $('#add-event-btn').hide();
  $(".edits").show();
  console.log(id);
  const url = "https://demosatva.azurewebsites.net/v1/api/Events";
  // Fetch data for the selected record
  $.ajax({
    url: url + "/" + id,
    method: 'GET',
    success: function (data) {
      console.log("data", data);
      console.log("data", data);
      console.log("eventTitle", data.document.eventTitle);
      console.log("startDate", data.document.startDate);
      console.log("endDate", data.document.endDate);
      console.log("eventDescription", data.document.eventDescription);
      console.log("eventPriority", data.document.eventPriority);

      data.document.startDate = data.document.startDate.slice(0, -9);
      data.document.endDate = data.document.endDate.slice(0, -9);


      // Prefill the edit form with the fetched data
      $('#eventtitle').val(data.document.eventTitle);
      $('#Startdate').val(data.document.startDate);
      $('#Enddate').val(data.document.endDate);
      $('#eventdescription').val(data.document.eventDescription);
      $('#eventpriority').val(data.document.eventPriority);


      // Show the edit form
      $('#adddatamodal').modal('show');


      // Submit the edited data to the server
      $("#edit-event-btn").click(function () {
        // e.preventDefault();
        var editedData = {
          "eventTitle": $('#eventtitle').val(),
          "startDate": $('#Startdate').val(),
          "endDate": $('#Enddate').val(),
          "eventDescription": $('#eventdescription').val(),
          "eventPriority": $('#eventpriority').val()
        };
        console.log(editedData);
        $.ajax({
          url: "https://demosatva.azurewebsites.net/v1/api/Events/" + id,
          type: 'PUT',
          data: JSON.stringify(editedData),
          contentType: 'application/json',
          success: function (response) {
            console.log(response);
            getdata(); // Refresh the table
            $('#adddatamodal').modal('hide'); // Hide the edit form
            getdata();
          },
          error: function (error) {
            console.log(error.responseText);
          }
        });
      });
    },
    error: function (error) {
      console.log(error.responseText);
    }

  });
}

$( "#addmodal" ).click(function() {
  $(".edits").hide();
  $("#add-event-btn").show();

   $('#eventtitle').val('');
             $('#Startdate').val('');
             $('#Enddate').val('');
               $('#eventdescription').val('');
               $('#eventpriority').val('');
});

function adddata() {

  var eventData = {

    "eventTitle": $("#eventtitle").val(),
    "startDate": $("#Startdate").val(),
    "endDate": $("#Enddate").val(),
    "eventDescription": $("#eventdescription").val(),
    "eventPriority": $("#eventpriority").val()
  };

  console.log(eventData)


  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(eventData),
    contentType: 'application/json',
    success: function (response) {
      console.log(response);

      const newRow = $('<tr>');
      newRow.append($('<td>').text(response.eventTitle));
      newRow.append($('<td>').text(response.startDate));
      newRow.append($('<td>').text(response.endDate));
      newRow.append($('<td>').text(response.eventDescription));
      newRow.append($('<td>').text(response.eventPriority));

      const editBtn = $('<button>').text('Edit').addClass('btn btn-primary');
      const deleteBtn = $('<button>').text('Delete').data('id', response.id);

      const buttonTd = $('<td>');
      buttonTd.append(editBtn);
      buttonTd.append(deleteBtn);
      newRow.append(buttonTd);
      getdata();
    },
    error: function (error) {
      console.log(error.responseText);
    }
  });
}

$('#searchInput').on('keyup', function() {
  let value = $(this).val().toLowerCase();  
  $.ajax({
    type: 'GET',
    url: 'https://demosatva.azurewebsites.net/v1/api/Events/search?searchKey=' + value,
    success: function(response) {
      console.log(response);
      let rows = '';  
      $.each(response.document.records, function(index, data) {
        rows += '<tr>';
        rows += '<td>' + data.eventTitle + '</td>';
        rows += '<td>' + data.startDate + '</td>';
        rows += '<td>' + data.endDate + '</td>';
        rows += '<td>' + data.eventDescription + '</td>';
        rows += '<td>' + data.eventPriority + '</td>';
        rows += '<td><button class="btn btn-primary btn-sm border border-1" data-id="' + data.id + '">Edit</button></td>';
        rows += '<td><button class="btn  btn-sm border border-1" data-id="' + data.id + '">Delete</button></td>';
        rows += '</tr>';

      });
      $('#tablbody').html(rows);  // Replace the table rows with the new rows
    },
    error: function(error) {
      $('#response').html('Error: ' + error.statusText);
    }
  });
});


