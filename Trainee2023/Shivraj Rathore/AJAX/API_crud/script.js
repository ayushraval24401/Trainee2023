$(document).ready(function () {
    var addNewData = document.getElementById("addNewdata");

    $("#addNewdata").click(function () {
        $('#dataModal').modal('show');
        var $t = $(this),
            target = $t[0].href || $t.data("target") || $t.parents('.modal') || [];
        $(target)
            .find("input,textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
    });

    var eventTable = $('#eventTable').DataTable({
        "dom": '<"toolbar">frtip',
        "searching": true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: 'Search...'
        },
        fnInitComplete: function () {
            $('#eventTable_filter').append(addNewData)
        },
        columns: [
            { data: "eventTitle", className: 'text-center' },
            { data: "startDate", className: 'text-center' },
            { data: "endDate", className: 'text-center' },
            { data: "eventDescription", className: 'text-center' },
            { data: "eventPriority", className: 'text-center' },
            {
                data: null,
                className: 'text-center',
                render: function (data, type, row) {
                    return (
                        '<button type="button" class="btn btn-sm edit" edit-id="' + row.id + ' "><i class="fa fa-pencil"></i></button>' +
                        '<button type="button" class="btn btn-sm delete" data-id="' + row.id + '"><i class="fa fa-trash"></i></button>'
                    );
                },
            },
        ]
    });

    $("#getData").click(function () {
        $.ajax({
            url: "https://demosatva.azurewebsites.net/v1/api/Events",
            type: 'GET',
            success: function (data) {
                console.log(data)
                var records = data.document.records;

                eventTable.clear().rows.add(records).draw();
            },
            error: function () {
                alert('Error retrieving data!');
            }
        });
    });

    $('#newEventForm').validate({
        rules: {
            eventTitle:
                { required: true },
            modalStartDate:
                { required: true },
            modalEndDate:
                { required: true },
            eventDescription:
                { required: true },
            eventPriority:
                { required: true }
        },
        messages: {
            eventTitle:
                { required: "Please Fill data" },
            modalStartDate:
                { required: "Choose Start Date" },
            modalEndDate:
                { required: "Choose End Date" },
            eventDescription:
                { required: "Please Fill Description" },
            eventPriority:
                { required: "Please Set Priority" }
        }
    })

    $("#addEvent").click(function () {
        if ($("#newEventForm").valid()) {
            var eventTitle = $("#eventTitle").val();
            var startDate = $("#modalStartDate").val();
            var endDate = $("#modalEndDate").val();
            var eventPriority = parseInt($("#eventPriority").val());
            var eventDescription = $("#eventDescription").val();
            var eventObject = {
                eventTitle: eventTitle,
                startDate: startDate,
                endDate: endDate,
                eventDescription: eventDescription,
                eventPriority: eventPriority
            };
            $.ajax({
                type: "POST",
                url: "https://demosatva.azurewebsites.net/v1/api/Events",
                data: JSON.stringify(eventObject),
                contentType: 'application/json',
                success: function () {
                    $('#dataModal').modal('hide');
                    Swal.fire({
                        icon: 'success',
                        title: 'Event Added Successfully!'
                    });   
                },
                error: function () {
                    alert('Error occurred while adding new event!');
                }
            });
        }
    });
    
    $(document).on('click', '.delete', function () {
        var del_id = $(this).attr('data-id');
        var row = $(this); // store reference to the element
        $.ajax({
            type: "DELETE",
            url: 'https://demosatva.azurewebsites.net/v1/api/Events/' + del_id,
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Event Deleted Successfully!'
                });
                row.closest("tr").remove(); // use the stored reference to remove the element
            },
            error: function () {
                alert('Error occurred while adding new event!');
            }
        });
    });

    $(document).on('click', '.edit', function () {
        var edit_id = $(this).attr('edit-id');
        var row = $(this);
        $.ajax({
            url: 'https://demosatva.azurewebsites.net/v1/api/Events/' + edit_id,
            type: "GET",
            success: function (data) {
                var recordsNew = data.document;
                $("#eventTitle").val(recordsNew.eventTitle);
                $("#modalStartDate").val(recordsNew.startDate);
                $("#modalEndDate").val(recordsNew.endDate);
                $("#eventDescription").val(recordsNew.eventDescription);
                $("#eventPriority").val(recordsNew.eventPriority);
                $('#dataModal').modal('show')

                $("#addEvent").unbind('click').click(function () {
                    if ($("#newEventForm").valid() == true) {
                        eventTitle = $("#eventTitle").val();
                        startDate = $("#modalStartDate").val();
                        endDate = $("#modalEndDate").val();
                        eventPriority = parseInt($("#eventPriority").val());
                        eventDescription = $("#eventDescription").val();
                        var eventObject =
                        {
                            eventTitle: eventTitle,
                            startDate: startDate,
                            endDate: endDate,
                            eventDescription: eventDescription,
                            eventPriority: eventPriority
                        }

                        $.ajax({
                            type: "PUT",
                            url: 'https://demosatva.azurewebsites.net/v1/api/Events/' + edit_id,
                            data: JSON.stringify(eventObject),
                            accept: 'application/json',
                            contentType: 'application/json',
                            success: function () {

                                $("#getData").click();

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Event Updated Successfully!'
                                })
                            },
                            error: function () {
                                alert('Error occurred while adding new event!');
                            }
                        });
                        $('#dataModal').modal('hide');
                    }
                })
            },
            error: function () {
                alert('Error occurred while getting data');
            }
        });
    });

});
