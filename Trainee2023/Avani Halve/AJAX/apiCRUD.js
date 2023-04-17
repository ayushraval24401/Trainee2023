var jsonData;
var jsondata;

$(document).ready(function() {
   $.ajax({
      type: "GET",
      url: "https://demosatva.azurewebsites.net/v1/api/Events?page=1&itemsPerPage=100",
      data: jsondata,
      contentType: "application/json; charset=utf-8",
      success: function (response) {
         console.log(response);
         var html = "";
         $.each(response.document.records, function (index, value) {
            html =
               html +
               `<tr id = ${index} >
            <td class="text-center">${index + 1}</td>
            <td class="text-center">${response.document.records[index].eventTitle}</td>
            <td class="text-center">${response.document.records[index].startDate}</td>
            <td class="text-center">${response.document.records[index].endDate}</td>
            <td class="text-center">${response.document.records[index].eventDescription}</td>
            <td class="text-center">${response.document.records[index].eventPriority}</td>
            <td nowrap class="text-center"><a href="javascript:void(0);"  onclick="deleteItem(${response.document.records[index].id})" class="fa fa-trash icons"></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0);" class=" fa fa-pencil icons" onclick="EditItem(${response.document.records[index].id})"></a></td>
 </tr>`;
         });
         document.getElementById("CRUDtable").innerHTML = html;
      },
      error: function (xhr, status, error) {
         console.log(xhr.responseText);
      },
   });

});

function getData() {
   debugger
   startDate = document.getElementById('filterStartDate').value;
   endDate = document.getElementById('filterEndDate').value;
   console.log(startDate);
   console.log(endDate);
   var jsondata = {
      "startDate": startDate, 
      "endDate": endDate 
   };
   
   $.ajax({
      type: "GET",
      url: "https://demosatva.azurewebsites.net/v1/api/Events?page=1&itemsPerPage=100",
      data: jsondata,
      contentType: "application/json; charset=utf-8",
      success: function (response) {
         //console.log(response);
         var html = "";
         $.each(response.document.records, function (index, value) {
            var startDateRecord = new Date(response.document.records[index].startDate);
            var endDateRecord = new Date(response.document.records[index].endDate);
            var startDateFormatted = startDateRecord.toISOString().slice(0, 10);
            var endDateFormatted = endDateRecord.toISOString().slice(0, 10);
            if (startDateFormatted >= startDate && endDateFormatted <= endDate) {
               html +=
                  `<tr id=${index}>
                     <td class="text-center">${index + 1}</td>
                     <td class="text-center">${response.document.records[index].eventTitle}</td>
                     <td class="text-center">${response.document.records[index].startDate}</td>
                     <td class="text-center">${response.document.records[index].endDate}</td>
                     <td class="text-center">${response.document.records[index].eventDescription}</td>
                     <td class="text-center">${response.document.records[index].eventPriority}</td>
                     <td nowrap class="text-center">
                        <a href="javascript:void(0);" onclick="deleteItem(${response.document.records[index].id})" class="fa fa-trash icons"></a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="javascript:void(0);" class="fa fa-pencil icons" onclick="EditItem(${response.document.records[index].id})"></a>
                     </td>
                  </tr>`;
            }
         });
         document.getElementById("CRUDtable").innerHTML = html;
         
      },
      error: function (error) {
         console.log(error.responseText);
      },
   });
}

function addData() {
   var title = document.getElementById("title").value;
   var startDate = document.getElementById("startDate").value;
   var endDate = document.getElementById("endDate").value;
   var description = document.getElementById("description").value;
   var priority = document.getElementById("priority").value;

   jsonData = {
      eventTitle: title,
      startDate: startDate,
      endDate: endDate,
      eventDescription: description,
      eventPriority: priority,
   };
   console.log(jsonData);
   jsondata = JSON.stringify(jsonData);
   console.log(jsondata);

   $.ajax({
      type: "POST",
      url: "https://demosatva.azurewebsites.net/v1/api/Events",
      data: jsondata,
      contentType: "application/json; charset=utf-8",
      success: function (response) {
         console.log(response);
         location.reload();
      },
      error: function (xhr, status, error) {
         console.log(xhr.responseText);
      },
   });
}

function EditItem(index) {
   console.log(index);
   $.ajax({
      type: 'GET',
      url: 'https://demosatva.azurewebsites.net/v1/api/Events/' + index,
      success: function(eventData) {
        console.log(eventData)
        $('#title').val(eventData.document.eventTitle);
        $('#startDate').val(eventData.document.startDate);
        $('#endDate').val(eventData.document.endDate);
        $('#description').val(eventData.document.eventDescription);
        $('#priority').val(eventData.document.eventPriority);
       
        $('#exampleModal').modal('show');
        $('#saveBtn').css('display', 'block');
        $('#addEvent').css('display', 'none');
        
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });



   $('#saveBtn').on('click', function () {
      var updatedData = {
         eventTitle: $('#title').val(),
         startDate: $('#startDate').val(),
         endDate: $('#endDate').val(),
         eventDescription: $('#description').val(),
         eventPriority: $('#priority').val()
      };
      console.log(updatedData);
      $('#exampleModal').modal('hide');
      $.ajax({
         url: "https://demosatva.azurewebsites.net/v1/api/Events/" + index,
         type: "PUT",
         contentType: "application/json; charset=utf-8",
         data: JSON.stringify(updatedData),
         success: function (response) {
            console.log(response);
            $('#CRUDtable').find('tr#' + index + ' td:nth-child(2)').text(response.eventTitle);
            $('#CRUDtable').find('tr#' + index + ' td:nth-child(3)').text(response.startDate);
            $('#CRUDtable').find('tr#' + index + ' td:nth-child(4)').text(response.endDate);
            $('#CRUDtable').find('tr#' + index + ' td:nth-child(5)').text(response.eventDescription);
            $('#CRUDtable').find('tr#' + index + ' td:nth-child(6)').text(response.eventPriority);
            location.reload();
         },
         error: function (xhr, textStatus, errorThrown) {
            console.log("Error in Operation: " + textStatus + " - " + errorThrown);
         },
      });
   });
}

function deleteItem(index) {
   console.log(index);
   $.ajax({
      url: "https://demosatva.azurewebsites.net/v1/api/Events/" + index,
      type: "DELETE",
      dataType: "json",
      data: index,
      success: function (data, textStatus, xhr) {
         console.log("Data Deleted!");
         alert("Data Deleted!");
         location.reload();
      },
      error: function (xhr, textStatus, errorThrown) {
         console.log("Error in Operation");
         alert("Error in Operation");
      },
   });
}

$('#search').on("keyup", function(){
   var searchValue = $(this).val(); 
   console.log(searchValue);
   $.ajax({
      type: "GET",
      url: "https://demosatva.azurewebsites.net/v1/api/Events?page=1&itemsPerPage=100",
      data: searchValue , 
      contentType: "application/json; charset=utf-8",
      success: function (response) {
         var html = "";
         $.each(response.document.records, function (index, value) {
            if (value.eventTitle.includes(searchValue)) {
               html +=
                  `<tr id=${index}>
                     <td class="text-center">${index + 1}</td>
                     <td class="text-center">${value.eventTitle}</td>
                     <td class="text-center">${value.startDate}</td>
                     <td class="text-center">${value.endDate}</td>
                     <td class="text-center">${value.eventDescription}</td>
                     <td class="text-center">${value.eventPriority}</td>
                     <td nowrap class="text-center">
                        <a href="javascript:void(0);" onclick="deleteItem(${value.id})" class="fa fa-trash icons"></a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="javascript:void(0);" class="fa fa-pencil icons" onclick="EditItem(${value.id})"></a>
                     </td>
                  </tr>`;
            }
         });
         document.getElementById("CRUDtable").innerHTML = html;
      },      
      error: function (error) {
         console.log(error.responseText);
      },
   });
});
