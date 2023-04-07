const url = 'https://demosatva.azurewebsites.net/v1/api/Events';

var data;
var getAllData;
$('#Update').hide();


$("#Save").click(function (event) {
    data = { "eventTitle": $("#eventTitle").val(), "startDate": $("#StartDate").val(), "endDate": $("#EndDate").val(), "eventDescription": $("#eventDec").val(), "eventPriority": $("#eventPrior").val() }

    console.log(data)
    $.ajax({
        url: url,
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
            console.log('Data added successfully!');
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
                            `<tr  id=${index + 1}  >
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


        },
        error: function () {
            console.error('Failed to add data.');
        }

    });


    resetData();
});



//
window.onload = function GetData() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            getAllData = result;
            console.log(result)
            // For each to add data to table
            var html = "";
            if (getAllData.document != null) {
                $.each(getAllData.document.records, function (index, value) {
                    html = html +
                        `<tr id=${index + 1} >
            <td>${getAllData.document.records[index].eventTitle}</td>
            <td>${getAllData.document.records[index].startDate}</td>
            <td>${getAllData.document.records[index].endDate}</td>
            <td>${getAllData.document.records[index].eventDescription}</td>
            <td>${getAllData.document.records[index].eventPriority}</td>
            <td nowrap><a href="javascript:void(0);"   onclick="deleteData(${index})" class="remCF1 btn btn-danger border">Delete</a><a href="javascript:void(0);"  onclick="editData(${index})" class="remCF1 btn btn-warning">Edit</a></td>  </tr>`
                })
                document.getElementById("root").innerHTML = html;
            }
            else {
                console.log("Error")
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        }

    });
}


// Delete

function deleteData(event) {

    var ids = event;
    console.log("DElete", event)
    
    
    // var rowToRemove = $('tr[data-id="' + idToDelete + '"]');  

    var table = document.getElementById("myTable");
    table.deleteRow(ids+1 );

    var getID;

    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            console.log(data)
            console.log('Data GEt successfully!');

            // getting id from the data
            getID = data.document.records[ids].id;
            console.log("ID", data.document.records[ids].id)

            $.ajax({
                url: url + '/' + getID,
                type: 'DELETE',
                success: function () {
                    console.log('Data deleted successfully!');
                    
                },
                error: function () {
                    console.error('Failed to delete data.');
                }
            });
        },
        error: function () {
            console.error('Failed to delete data.');
        }
    })




}


// Edit

function editData(event) {
    console.log(event)

    var editId = event;

    // Modal open
    $('#AddApiModal').show();
    $('#Save').hide();
    $('#Update').show();
    // Date conversion
    var StartDate = dateConvert(getAllData.document.records[editId].startDate)
    var EndDate = dateConvert(getAllData.document.records[editId].endDate)

    // adding data
    $("#eventTitle").val(getAllData.document.records[editId].eventTitle);
    $("#StartDate").val(StartDate);
    $("#EndDate").val(EndDate);
    $("#eventDec").val(getAllData.document.records[editId].eventDescription);
    $("#eventPrior").val(getAllData.document.records[editId].eventPriority);



    // hide modal
    $("#close").click(function (event) {
        $('#AddApiModal').hide();

    });



    // getting id from the data
    var getDataId = getAllData.document.records[editId].id;

    console.log(getDataId)

    $("#Update").click(function (event) {

        var updateStartdate = originalDate($("#StartDate").val())
        var updateEtartdate = originalDate($("#EndDate").val())


        var updatedata = { "eventTitle": $("#eventTitle").val(), "startDate": updateStartdate, "endDate": updateEtartdate, "eventDescription": $("#eventDec").val(), "eventPriority": $("#eventPrior").val() }


        console.log(updatedata)

        // put request
        $.ajax({
            url: url + '/' + getDataId,
            type: "PUT",
            data: JSON.stringify(updatedata),
            contentType: "application/json",
            success: function (response) {
                console.log("PUT request was successful");
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
                                `<tr  >
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
            },
            error: function (xhr, status, error) {
                console.error("PUT request failed: " + error);
            }

        });
        $('#AddApiModal').hide();
        $('#Save').show();
        $('#Update').hide();

    });

    // resetData();
}

function resetData() {
    $("#eventTitle").val(" ")
    $("#StartDate").val(" ")
    $("#EndDate").val(" ")
    $("#eventDec").val(" ")
    $("#eventPrior").val(" ")

}

// Time

function dateConvert(dates) {
    // Get the date string from the API response
    const dateString = dates;
    console.log(dates)

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Format the date to match the date input format "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function originalDate(dates) {
    var date = new Date(dates);
    var dateTimeString = date.toISOString().slice(0, 10) + "T00:00:00";
    console.log(dateTimeString);
    return dateTimeString;
}


// Search

$("#searchInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});