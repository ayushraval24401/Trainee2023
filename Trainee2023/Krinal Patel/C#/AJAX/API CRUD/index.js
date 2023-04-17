$(document).ready(function () {
    getdata();
    

$("#search").keydown(function () {
    var value = this.value.toLowerCase().trim();
    if (value.length > 3) {
        var url = 'https://demosatva.azurewebsites.net/v1/api/Events/search?searchKey=' + value;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (data) {

                var tableRows = "";


                if (data.document && data.document.records) {
                $.each(data.document.records, function (index, value) {
                    tableRows += '<tr id="' + value.id + '"><td class="eventTitle">' + value.eventTitle + '</td><td class="startDate">' + value.startDate + '</td><td class="endDate">' + value.endDate + '</td><td class="eventDescription">' + value.eventDescription + '</td><td class="eventPriority">' + value.eventPriority + '</td><td><button type="button" class="btn btn-success text-white editsearch" id="' + value.id + '">Edit</button><span class="ps-3"></span><button type="button" class="btn btn-danger text-white deleteEvent" id="' + value.id + '">Delete</button></td></tr>';
                });
                $("#tbodydata").html(tableRows);
                } 
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    }
    else if (value == "" || value == null) {
        getdata();
    }
    else {
        $("#tbodydata").html("<tr><td colspan='6'>No results found</td></tr>");
    }
});
});

$("#AddnewData").click(function () {
    $('#etitle').val('');
    $('#sdate').val('');
    $('#edate').val('');
    $('#edescription').val('');
    $('#epriority').val('');

    $("#addevent").show();
    $("#updateevent").hide();
});

$("#addevent").click(function () {
    
    const url = "https://demosatva.azurewebsites.net/v1/api/Events";

    var eventDescription = $("#edescription").val();
    var eventPriority = $("#epriority").val();

    let data = {
        "eventTitle": $("#etitle").val(),
        "startDate": $("#sdate").val(),
        "endDate": $("#edate").val(),
        "eventDescription": eventDescription,
        "eventPriority": eventPriority
    };

    console.log(data);

    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            console.log('Event added successfully:', data);
            getdata();
        },
        error: function (xhr, status, error) {
            console.log('Error:', error);
        }
    });
    $('#myModal').modal('hide');

});

function getdata() {
    const url = "https://demosatva.azurewebsites.net/v1/api/Events";
    $("#eventTable tbody").empty();


    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        success: function (data) {
           
            if (data.document && data.document.records) {
             
                $.each(data.document.records, function (index, item) {

                    var row = $(`<tr id=${item.id}>`);
    
                    $("<td>").text(item.eventTitle).appendTo(row);
                    $("<td>").text(item.startDate).appendTo(row);
                    $("<td>").text(item.endDate).appendTo(row);
                    $("<td>").text(item.eventDescription).appendTo(row);
                    $("<td>").text(item.eventPriority).appendTo(row);
    
                    row.attr("data-id", item.eventId);
    
                    var actionColumn = $("<td>");
                    var editButton = $("<button>").text("Edit").addClass("btn btn-success editsearch");
                    var deleteButton = $("<button style='margin-left:15px'>").text("Delete").addClass("btn btn-danger");
    
                    $(deleteButton).click(function () {
    
                        var row = $(this).closest("tr");
                        var eventId = row.attr("id");
    
                        $.ajax({
                            type: "DELETE",
                            url: url + "/" + eventId,
                            success: function (data) {
                                console.log("Event deleted successfully:", data);
                                swal("Record Deleted!", "Record deleted successfully", "success");
    
                                // remove the row from the table
                                row.remove();
                            },
                            error: function (xhr, status, error) {
                                console.log("Error:", error);
                            },
                        });
    
                    });
                    $(editButton).click(function () {
    
                        $("#updateevent").show();
                        $("#addevent").hide();
    
                        //Start edit
                        // Get the ID of the record to edit
                        var row = $(this).closest("tr");
                        var eventId = row.attr("id");
    
                        // Get the existing data for the record
                        var eventTitle = row.find("td:eq(0)").text();
                        var startDate = row.find("td:eq(1)").text();
                        var endDate = row.find("td:eq(2)").text();
                        var eventDescription = row.find("td:eq(3)").text();
                        var eventPriority = row.find("td:eq(4)").text();
    
                        startDate = startDate.substring(0, startDate.length - 9);
                        // startDate = new Date(startDate);
                        // startDate = startDate.toLocaleDateString();
    
                        endDate = endDate.substring(0, endDate.length - 9);
                        // endDate = new Date(endDate);
                        // endDate = endDate.toLocaleDateString();
    
                        // Fill in the form fields with the existing data
                        $('#etitle').val(eventTitle);
                        $('#sdate').val(startDate);
                        $('#edate').val(endDate);
                        $('#edescription').val(eventDescription);
                        $('#epriority').val(eventPriority);
    
                        // Show the modal dialog box
                        $('#myModal').modal('show');
    
                        // Change the function called when the Save button is clicked
                        $('#updateevent').off('click').on('click', function () {
                            // Get the updated data from the form fields
                            var updatedEventTitle = $('#etitle').val();
                            var updatedStartDate = $('#sdate').val();
                            var updatedEndDate = $('#edate').val();
                            var updatedEventDescription = $('#edescription').val();
                            var updatedEventPriority = $('#epriority').val();
    
                            // Update the record on the server
                            // var url = "https://demosatva.azurewebsites.net/v1/api/Events" + eventId;
                            var updatedData = {
                                "eventTitle": updatedEventTitle,
                                "startDate": updatedStartDate,
                                "endDate": updatedEndDate,
                                "eventDescription": updatedEventDescription,
                                "eventPriority": updatedEventPriority
                            };
                            $.ajax({
                                type: 'PUT',
                                url: url + "/" + eventId,
                                contentType: 'application/json',
                                data: JSON.stringify(updatedData),
                                success: function (data) {
                                    console.log('Event updated successfully:', data);
                                    // Update the table row with the updated data
                                    row.find("td:eq(0)").text(updatedEventTitle);
                                    row.find("td:eq(1)").text(updatedStartDate);
                                    row.find("td:eq(2)").text(updatedEndDate);
                                    row.find("td:eq(3)").text(updatedEventDescription);
                                    row.find("td:eq(4)").text(updatedEventPriority);
                                    swal("Record Updated!", "Record Updated successfully", "success");
    
                                    getdata();
    
                                },
                                error: function (xhr, status, error) {
                                    console.log('Error:', error);
                                }
                            });
    
                            // Hide the modal dialog box
                            $('#myModal').modal('hide');
                        });
                        //end edit 
    
                    });
    
                    actionColumn.append(editButton).append(deleteButton);
                    actionColumn.appendTo(row);
                    row.appendTo("#eventTable tbody");
                });

              } else {
                // Show a Swal alert if the records property is null
                swal({
                  title: "Error!",
                  text: "The records property is null.",
                  icon: "error",
                });
              }
              
              
          
        },
        error: function (xhr, status, error) {
            console.log('Error:', error);
        }
    });

//     // Get the user's search query
// var query = $("#form1").val();
// const searchurl = "https://demosatva.azurewebsites.net/v1/api/Events/search";

// // Call the API using jQuery
// $.ajax({
//   url: searchurl +"/" ,
//   data: { query: query },
//   success: function(results) {
//     // Display the results on the page
//     for (var i = 0; i < results.length; i++) {
//       $("#form1").append("<div>" + results[i].title + "</div>");
//     }
//   },
//   error: function() {
//     // Handle errors
//     alert("Error calling API.");
//   }
// });


}




// function getdata(searchKeyword) {

//     const url = "https://demosatva.azurewebsites.net/v1/api/Events";
//     $("#eventTable tbody").empty();

//     $.ajax({
//         type: 'GET',
//         url: url,
//         contentType: 'application/json',
//         success: function (data) {
//             console.log(data);

//             if (data.document.records=='') {
//                 swal("No records found");
//             }
//             // Filter data based on search keyword
//             if (searchKeyword) {
//                 data.document.records = data.document.records.filter(function (item) {
//                     return item.eventTitle.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1;
//                 });
//             }

//             $.each(data.document.records, function (index, item) {
//                 var row = $(`<tr id=${item.id}>`);

//                 $("<td>").text(item.eventTitle).appendTo(row);
//                 $("<td>").text(item.startDate).appendTo(row);
//                 $("<td>").text(item.endDate).appendTo(row);
//                 $("<td>").text(item.eventDescription).appendTo(row);
//                 $("<td>").text(item.eventPriority).appendTo(row);

//                 row.attr("data-id", item.eventId);

//                 var actionColumn = $("<td>");
//                 var editButton = $("<button>").text("Edit").addClass("btn btn-success");
//                 var deleteButton = $("<button>").text("Delete").addClass("btn btn-danger");

//                 $(deleteButton).click(function () {
//                     var row = $(this).closest("tr");
//                                         var eventId = row.attr("id");
                    
//                                         $.ajax({
//                                             type: "DELETE",
//                                             url: url + "/" + eventId,
//                                             success: function (data) {
//                                                 console.log("Event deleted successfully:", data);
//                                                 swal("Record Deleted!", "Record deleted successfully", "success");
                    
//                                                 // remove the row from the table
//                                                 row.remove();
//                                             },
//                                             error: function (xhr, status, error) {
//                                                 console.log("Error:", error);
//                                             },
//                                         });
//                 });

//                 $(editButton).click(function () {


                    
//                     $("#updateevent").show();
//                     $("#addevent").hide();

//                     //Start edit
//                     // Get the ID of the record to edit
//                     var row = $(this).closest("tr");
//                     var eventId = row.attr("id");

//                     // Get the existing data for the record
//                     var eventTitle = row.find("td:eq(0)").text();
//                     var startDate = row.find("td:eq(1)").text();
//                     var endDate = row.find("td:eq(2)").text();
//                     var eventDescription = row.find("td:eq(3)").text();
//                     var eventPriority = row.find("td:eq(4)").text();

//                     startDate = startDate.substring(0, startDate.length - 9);
//                     // startDate = new Date(startDate);
//                     // startDate = startDate.toLocaleDateString();

//                     endDate = endDate.substring(0, endDate.length - 9);
//                     // endDate = new Date(endDate);
//                     // endDate = endDate.toLocaleDateString();

//                     // Fill in the form fields with the existing data
//                     $('#etitle').val(eventTitle);
//                     $('#sdate').val(startDate);
//                     $('#edate').val(endDate);
//                     $('#edescription').val(eventDescription);
//                     $('#epriority').val(eventPriority);

//                     // Show the modal dialog box
//                     $('#myModal').modal('show');

//                     // Change the function called when the Save button is clicked
//                     $('#updateevent').off('click').on('click', function () {
//                         // Get the updated data from the form fields
//                         var updatedEventTitle = $('#etitle').val();
//                         var updatedStartDate = $('#sdate').val();
//                         var updatedEndDate = $('#edate').val();
//                         var updatedEventDescription = $('#edescription').val();
//                         var updatedEventPriority = $('#epriority').val();

//                         // Update the record on the server
//                         // var url = "https://demosatva.azurewebsites.net/v1/api/Events" + eventId;
//                         var updatedData = {
//                             "eventTitle": updatedEventTitle,
//                             "startDate": updatedStartDate,
//                             "endDate": updatedEndDate,
//                             "eventDescription": updatedEventDescription,
//                             "eventPriority": updatedEventPriority
//                         };
//                         $.ajax({
//                             type: 'PUT',
//                             url: url + "/" + eventId,
//                             contentType: 'application/json',
//                             data: JSON.stringify(updatedData),
//                             success: function (data) {
//                                 console.log('Event updated successfully:', data);
//                                 // Update the table row with the updated data
//                                 row.find("td:eq(0)").text(updatedEventTitle);
//                                 row.find("td:eq(1)").text(updatedStartDate);
//                                 row.find("td:eq(2)").text(updatedEndDate);
//                                 row.find("td:eq(3)").text(updatedEventDescription);
//                                 row.find("td:eq(4)").text(updatedEventPriority);
//                                 swal("Record Updated!", "Record Updated successfully", "success");

//                                 getdata();

//                             },
//                             error: function (xhr, status, error) {
//                                 console.log('Error:', error);
//                             }
//                         });

//                         // Hide the modal dialog box
//                         $('#myModal').modal('hide');
//                     });
//                     //end edit 
//                 });

//                 actionColumn.append(editButton);
//                 actionColumn.append(deleteButton);
//                 row.append(actionColumn);

//                 $("#eventTable tbody").append(row);
//             });
//         },
//         error: function (xhr, status, error) {
//             console.log('Error:', error);
//         }
//     });
// }

// $("#form1").on("input", function () {
//     var searchKeyword = $(this).val();
//     getdata(searchKeyword);
// });

