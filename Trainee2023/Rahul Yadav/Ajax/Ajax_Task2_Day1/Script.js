$("#adddata").click(function () {
    $("#dataform").valid();
});
$("#dataform").validate({
    rules: {
        eventtitle: {
            required: true,
        },
        startdata: {
            required: true,
        },
        enddate: {
            required: true,
        },
        eventdescription: {
            required: true,
        },
        eventpriority: {
            required: true,
        },
    },
    messages: {
        eventtitle: {
            required: "This field is required",
        },
        startdata: {
            required: "This field is required",
        },
        enddate: {
            required: "This field is required",
        },
        eventdescription: {
            required: "This field is required",
        },
        eventpriority: {
            required: "This field is required",
        },
    },

});








$("#adddata").click(function () {
    var eventTitle = $("#eventtitle").val();
    var startdata = $("#startdata").val();
    var enddate = $("#enddate").val();
    var eventdescription = $("#eventdescription").val();
    var eventpriority = $("#eventpriority").val();

    var obj = {
        eventTitle: eventTitle,
        startDate: startdata,
        endDate: enddate,
        eventDescription: eventdescription,
        eventPriority: eventpriority
    }

    $.ajax({
        type: 'POST',
        url: "https://demosatva.azurewebsites.net/v1/api/Events",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log(response);
            $('#dataModal').modal('hide');
            document.getElementById("dataform").reset();
        },
        error: function (response) {
            console.log(response);
        },
    });

});


$("#getdata").click(function () {
    $.ajax({
        type: 'GET',
        url: 'https://demosatva.azurewebsites.net/v1/api/Events',
        dataType: 'json',
        data: JSON.stringify({}),
        success: function (data, response) {
            console.log(response);
            console.log(data);
            // $('.messages').append("<li>"+JSON.stringify(data)+"</li>")
            if (data.document != null) {
                let html = "";
                // console.log(data.document.records.length);
                for (i = 0; i < data.document.records.length; i++) {
                    html = html +
                        `<tr class='Datalist' id=${i + 1}>
                            <td>${i + 1}</td>
                            <td>${data.document.records[i].eventTitle}</td>
                            <td>${data.document.records[i].startDate}</td>
                            <td>${data.document.records[i].endDate}</td>
                            <td>${data.document.records[i].eventDescription}</td>
                            <td>${data.document.records[i].eventPriority}</td>
                            <td nowrap><a href="javascript:void(0);"  onclick="deletedatatable( ${data.document.records[i].id},${i + 1})" class="remCF1 btn btn-danger border">Delete</a><a href="javascript:void(0);"  onclick="editdatatable(${data.document.records[i].id} , ${i + 1} )" class="remCF1 btn btn-warning" >Edit</a></td>
                        <tr>`;
                }
                document.getElementById("mainbody").innerHTML = html;
            } else {
                console.log("error");
                swal(" No Record Found !", " No Record Found !", "info");
            }
        },
        error: function (response) {
            console.log(response);
        }
    });

});


function deletedatatable(id, tableIndex) {
    $.ajax({
        type: 'DELETE',
        url: 'https://demosatva.azurewebsites.net/v1/api/Events/' + id + '',
        success: function (response) {
            console.log(response);
            console.log(tableIndex);
            $("#" + tableIndex).remove();
        },
        error: function (response) {
            console.log(response);
        }
    });
};

function editdatatable(id, tableIndex) {
    console.log(id);
    console.log(tableIndex);
    $("#adddata").css("display", "none");
    $("#editdata").css('display', 'block');
    $('#dataModal').modal('show');
    const url = 'https://demosatva.azurewebsites.net/v1/api/Events';
    $.ajax({
        type: 'GET',
        url: url + '/' + id,
        success: function (data) {
            console.log(data);
            data.document.startDate = data.document.startDate.slice(0, -9);
            data.document.endDate = data.document.endDate.slice(0, -9);
            // console.log(data.document.eventTitle);
            $("#eventtitle").val(data.document.eventTitle);
            $("#startdata").val(data.document.startDate);
            $("#enddate").val(data.document.endDate);
            $("#eventdescription").val(data.document.eventDescription);
            $("#eventpriority").val(data.document.eventPriority);
            $("#hidden").val(id)
        },
        error: function (response) {
            console.log(response);
        },
    });


};

$("#editdata").click(function () {
    var id = $("#hidden").val()
    var objdata = {
        eventTitle: $("#eventtitle").val(),
        startDate: $("#startdata").val(),
        endDate: $("#enddate").val(),
        eventDescription: $("#eventdescription").val(),
        eventPriority: $("#eventpriority").val()
    }
    $.ajax({
        type: 'PUT',
        url: 'https://demosatva.azurewebsites.net/v1/api/Events/' + id,
        data: JSON.stringify(objdata),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log(response);

        },
        error: function (response) {
            console.log(response);
        },
    });
    $('#dataModal').modal('hide');
    document.getElementById("dataform").reset();

});


function search() {
    var searchinputvalue = this.value.toLowerCase().trim();
    console.log(searchinputvalue);
    $.ajax({
        type: 'GET',
        url: 'https://demosatva.azurewebsites.net/v1/api/Events/search?page=1&itemsPerPage=100',
        dataType: 'json',
        data: JSON.stringify({}),
        success: function (data) {
            if (searchinputvalue == data.document.eventTitle) {
                console.log("match");
            }
        }

    });
    // let input = document.getElementById('datatablesearch').value
    // input = input.toLowerCase();
    // let x = document.getElementsByClassName('Datalist');
    // for (i = 0; i < x.length; i++) {
    //     if (!x[i].innerHTML.toLowerCase().includes(input)) {
    //         x[i].style.display = "none";
    //     }
    //     else {
    //         x[i].style.display = "";
    //     }
    // }
};