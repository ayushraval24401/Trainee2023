$(document).ready(function() {

  var isEdit= false;
  
  $('#addEvent').click(function() {

    if(!isEdit)
    {
      debugger
        // Serialize form data
        let data = {
          "eventTitle": $("#eventTitle").val(),
          "startDate":  $("#startDate").val(),
          "endDate":  $("#endDate").val(),
          "eventDescription": $("#eventDescription").val(),
          "eventPriority": $("#eventPriority").val(),
      }

      // Send AJAX POST request
      $.ajax({
        type: 'POST',
        url: 'https://demosatva.azurewebsites.net/v1/api/Events',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(data),
        success: function(response) {
          // Create new row and append it to the table
          let row = '<tr>';
          row += '<td>' + data.eventTitle + '</td>';
          row += '<td>' + data.startDate + '</td>';
          row += '<td>' + data.endDate + '</td>';
          row += '<td>' + data.eventDescription + '</td>';
          row += '<td>' + data.eventPriority + '</td>';
          row += '<td><button class="btn btn-primary btn-sm" data-id="' + response.document.id + '">Edit</button></td>';
          row += '<td><button class="btn btn-danger btn-sm" data-id="' + response.document.id + '">Delete</button></td>';
          row += '</tr>';
          $('#eventData').append(row);

      
    
        },
        error: function(error) {
          $('#response').html('Error: ' + error.statusText);
        }
      });
    }
  
  });


  $("#result").click(function() {

    $('#addEvent').text('Add Event');
    // Clear form inputs
    $('#eventTitle').val('');
    $('#startDate').val('');
    $('#endDate').val('');
    $('#eventDescription').val('');
    $('#eventPriority').val('');

  });
  

  function getData(){
      // Clear existing data from the table
    $('#eventData').empty();

    // Send AJAX GET request to fetch data
    $.ajax({
      type: 'GET',
      url: 'https://demosatva.azurewebsites.net/v1/api/Events',
      success: function(response) {
        // Loop through the data and add rows to the table
        $.each(response.document.records, function(index, eventData) {
          let row = '<tr>';
          row += '<td>' + eventData.eventTitle + '</td>';
          row += '<td>' + eventData.startDate + '</td>';
          row += '<td>' + eventData.endDate + '</td>';
          row += '<td>' + eventData.eventDescription + '</td>';
          row += '<td>' + eventData.eventPriority + '</td>';

          row += '<td><button class="editBtn  btn btn-primary btn-sm" data-id="' + eventData.id + '">Edit</button></td>';
          row += '<td><button class="deleteBtn  btn btn-danger btn-sm" data-id="' + eventData.id + '">Delete</button></td>';

          // var editBtn = $('<button>').text('Edit').data('id',item.id);
          // var deleteBtn = $('<button>').text('Delete').data('id',item.id);

          row += '</tr>';
          $('#eventData').append(row);
        });
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });
  }

// Get data button click 
$('#getData').click(function() {

  getData()
  
});





// Edit button click handler
$(document).on('click', '.editBtn', function() { 
  isEdit = true;

  $('#addEvent').text('Edit Event');

  // Get the ID of the event to edit
  let eventId = $(this).data('id');

  // Get the event data from the API using AJAX GET request
  $.ajax({
    type: 'GET',
    url: 'https://demosatva.azurewebsites.net/v1/api/Events/' + eventId,
    success: function(eventData) {
      console.log(eventData)

      eventData.document.startDate = eventData.document.startDate.slice(0, -9);
      eventData.document.endDate = eventData.document.endDate.slice(0, -9);

      // Populate the edit form with the event data
      $('#eventTitle').val(eventData.document.eventTitle);
      $('#startDate').val(eventData.document.startDate);
      $('#endDate').val(eventData.document.endDate);
      $('#eventDescription').val(eventData.document.eventDescription);
      $('#eventPriority').val(eventData.document.eventPriority);
      // Show the edit modal
      $('#editEventModal').modal('show');
      getData(); //get all data
    },
    error: function(error) {
      console.log('Error:', error);
    }
  });

  // Save changes button click handler
  $('#addEvent').click(function() {
    debugger
    // Get the updated event data from the form
    let updatedEventData = {
      eventTitle: $('#eventTitle').val(),
      startDate: $('#startDate').val(),
      endDate: $('#endDate').val(),
      eventDescription: $('#eventDescription').val(),
      eventPriority: $('#eventPriority').val()
    };

    // Send a PUT request to the API to update the event data
    $.ajax({
      type: 'PUT',
      url: 'https://demosatva.azurewebsites.net/v1/api/Events/' + eventId,
      data: JSON.stringify(updatedEventData),
      contentType: 'application/json',
      success: function(response) {
        // Reload the table data after update
        $('#getData').click();
        // Hide the edit modal
        $('#editEventModal').modal('hide');
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });
  });
});




// Delete button click handler
$(document).on('click', '.deleteBtn', function() {
    // Get the ID from the button data attribute
    var eventId = $(this).data('id');
    console.log(eventId)
    
    // Send AJAX DELETE request to delete data
    $.ajax({
      type: 'DELETE',
      url: 'https://demosatva.azurewebsites.net/v1/api/Events/' + eventId,
      success: function(response) {
        // Remove the corresponding table row on success
        $(this).closest('tr').remove();
        $('#response').html('Data deleted...');
        getData(); 
        Swal.fire(
          'Success!',
          'Data deleted successfully!',
          'success'
      );
        //get all data
      }.bind(this), // use .bind() to pass the clicked button as the "this" object
      error: function(error) {
        console.log('Error:', error);
      }
    });
  });
});



$(document).ready(function() {
  // Detect keyup event on the search input field
  $('#searchInput').on('keyup', function() {
    let value = $(this).val().toLowerCase();  // Get the user input and convert it to lowercase
    $.ajax({
      type: 'GET',
      url: 'https://demosatva.azurewebsites.net/v1/api/Events?search=' + value,
      success: function(response) {
        console.log(response)
        let rows = '';  // Initialize a variable to store the HTML rows
        $.each(response, function(index, data) {
          rows += '<tr>';
          rows += '<td>' + data.document.records.eventTitle + '</td>';
          rows += '<td>' + data.document.records.startDate + '</td>';
          rows += '<td>' + data.document.records.endDate + '</td>';
          rows += '<td>' + data.document.records.eventDescription + '</td>';
          rows += '<td>' + data.document.records.eventPriority + '</td>';
          rows += '<td><button class="btn btn-primary btn-sm" data-id="' + data.id + '">Edit</button></td>';
          rows += '<td><button class="btn btn-danger btn-sm" data-id="' + data.id + '">Delete</button></td>';
          rows += '</tr>';
        });
        $('#eventData').html(rows);  // Replace the table rows with the new rows
      },
      error: function(error) {
        $('#response').html('Error: ' + error.statusText);
      }
    });
  });
});



// $(document).ready(function() {
//   $('#searchInput').on('keyup', function() {
//     let value = $(this).val().toLowerCase();  // Get the user input and convert it to lowercase
//     $('#eventData tr').filter(function() {  // Filter the table rows
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1) 
//     });
//   });
// });

