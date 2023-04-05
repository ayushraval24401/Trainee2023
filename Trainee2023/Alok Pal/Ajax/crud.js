const url = 'https://demosatva.azurewebsites.net/v1/api/Events';

const data = { "eventTitle": $("#eventTitle").val(), "startDate": $("#StartDate").val(), "endDate": $("#EndDate").val(), "eventDescription": $("#eventDec").val(), "eventPriority": $("#eventPrior").val() }

$("#target").click(function (event) {
   
    console.log(data)
    alert("Handler for .submit() called.");

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
            console.log('Data added successfully!');
        },
        error: function () {
            console.error('Failed to add data.');
        }
    });

});

var getAllData;

$("#getdata").click(function (event) {
    // $.get(url, function (data) {
    //     // handle the data returned by the API
    //     getAllData =data;
    //     console.log(getAllData);
    // }).fail(function (error) {
    //         // handle any errors that occur
    //         console.error(error);
    //    });

    $.ajax({

        url: url,
        type: "GET",
        
        success: function (result) {
            getAllData = result;
            console.log(result)
            // For each to add data to table
            var html = "";
            $.each(getAllData.document.records, function (index) {
                html = html +
                 `<tr id = ${index} >
                <td>${index + 1}</td>
                <td>${getAllData.document.records[index].eventTitle}</td>
                 <td>${getAllData.document.records[index].startDate}</td>
                 <td>${getAllData.document.records[index].endDate}</td>
                <td>${getAllData.document.records[index].eventDescription}</td>
               <td>${getAllData.document.records[index].eventPriority}</td>
                <td nowrap><a href="javascript:void(0);"  onclick="deleteData(${index})" class="remCF1 btn btn-danger border">Delete</a><a href="javascript:void(0);"  onclick="editData(${index})" class="remCF1 btn btn-warning">Edit</a></td>  </tr>`
            })
            document.getElementById("root").innerHTML = html;
        },
        error: function (xhr, status, error) {
            console.log(error);
        }

    });

    


})

$(document).ready(function(){
    $.ajax({

        url: url,
        type: "GET",
        
        success: function (result) {
            getAllData = result;
            console.log(result)
            // For each to add data to table
            var html = "";
            $.each(getAllData.document.records, function (index, value) {
                html = html +
                 `<tr id = ${index} >
                <td>${index + 1}</td>
                <td>${getAllData.document.records[index].eventTitle}</td>
                 <td>${getAllData.document.records[index].startDate}</td>
                 <td>${getAllData.document.records[index].endDate}</td>
                <td>${getAllData.document.records[index].eventDescription}</td>
               <td>${getAllData.document.records[index].eventPriority}</td>
                <td nowrap><a href="javascript:void(0);"  onclick="deleteData(${index})" class="remCF1 btn btn-danger border">Delete</a><a href="javascript:void(0);"  onclick="editData(${index})" class="remCF1 btn btn-warning">Edit</a></td>  </tr>`
            })
            document.getElementById("root").innerHTML = html;
        },
        error: function (xhr, status, error) {
            console.log(error);
        }

    }); 
})
function deleteData(event) {
   var id = event;
   
    console.log(event)
    $.ajax({
        url: url + '/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
            console.log('Data deleted successfully!');
        },
        error: function () {
            console.error('Failed to delete data.');
        }
    });
   

}
function editData(event) {
    console.log(event)

}

