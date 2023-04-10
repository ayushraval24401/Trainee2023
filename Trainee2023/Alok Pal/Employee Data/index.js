// var dataSet = [
//     ["Stock Location", "", "", "On Water", "On Water", "In production"],
//     ["ETA Date", "", "", "10/08/2021", "10/08/2021", "10/08/2021"],
//     ["BW-01-S-M", "1", "0", "<button class='dataColor border-0 bg-light' data-bs-toggle='popover' id='popover'>3</button>", "0", "0"],
//     [
//       "BW-03-XL-G",
//       "1",
//       "1",
//       // '<button type="button" class="" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">2</button>',
//       '<div class= "dataColor ">3 </div>',
//       "2",
//       "1",
//     ],
//     ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"], ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"], ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"], 
//     ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"],
//     //  ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"], ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"], ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"], ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"], ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"], ["BW-01-Q-M", "", "0", '<div class= "dataColor">3 </div>', "0", "1"],
// ]
//const url = "C:\Users\chint\source\repos\Exam\EmployeeData_TodayDate.json";

var dataSet;
$.ajax({
    url: 'EmployeeData_TodayDate.json',
    dataType: "json",
    success: function (data) {
        dataSet = data;
        console.log("Data fetched successfully:", data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error fetching data:", textStatus, errorThrown);
    }
});




var table;
$(document).ready(function () {
    table = $("#EmployeDatatable").DataTable({
        // order: [[3, 'desc']],
        data: dataSet,

        // " bLengthChange": false,
        // "bFilter": true,
        // " bAutoWidth": false,

        // order: [],
        // dom: "rtip",
        language: {
            paginate: {
                next: " Next &#62",
                previous: "&#60 Previous ",
            },
        },

        columnDefs: [
            { orderable: true, targets: 3 },
            //  { orderable: false, targets: 3 },
        ],

        columns: [
            {
                title: "#", data: null,
                render: function (data, type, row, meta) {
                    // Render the row number
                    return meta.row + 1;
                }
            },
            {
                data: "FullName",
                title: " Name"
            },
            {
                data: "Department",
                title: "Department",
                class: "text-center",
                render: function (data, type, row) {
                    var departmentClass = data.replace(/\s+/g, '-').toLowerCase(); // convert department name to a class
                    if (data === "QA") {
                        departmentClass += " specific-department"; // add class to highlight specific department
                        return '<span class="' + departmentClass + '">' + data + '</span>';
                    }
                    if (data === "Development") {
                        return '<span>' + data + '</span>';
                    }
                    if (data === "Sales") {
                        return '<span class=" " style="color: #ff0000;">' + data + '</span>';
                    }
                    if (data === "HR") {
                        return '<span class=" " style="color: orange;">' + data + '</span>';
                    }
                    if (data === "SEO") {
                        return '<span class=" " style="color: #fe00ef;">' + data + '</span>';
                    }
                }

            },
            {
                data: "EmailAddress",
                title: "Email",
                class: "text-center",
                render: function (data, type, row) {
                    return '<a href="mailto:' + data + '" style=" text-decoration: none">' + data + '</a>';
                }
            }

            ,
            {
                data: "PhoneNumber", title: "PhoneNumber", class: "text-center",
                render: function (data, type, row) {
                    return '<a href="tel:' + data + '" style=" text-decoration: none">' + data + '</a>';
                }
            },
            {
                data: "Gender", title: "Gender", class: "text-center", render: function (data, type, row) {
                    return data.toUpperCase();
                }
            },
            {
                data: null, title: "View", class: "text-center", render: function (data, type, row) {
                    return '<i class="bi bi-eye-fill viewDetails" title="View details"></i>';
                }
            },
        ],
    });



    // $('.viewDetails').click(function () {
    //     // code to run when the element is clicked
    //     //var data = table.row(this).data();

    //     // Populate the modal fields with the data

    //     var table ;
    //     $('#staticBackdrop').modal('show');
    //     var data = table.row(this).data();
    //     console.log(data)
    //     $("name").html(dataSet.FullName);
    // });
    // $('#EmployeDatatable tbody').on('click', 'tr', function() {
    //     // Get the data for the clicked row
    //     var data = table.row(this).data();

    //     // Populate the modal fields with the data
    //     $('#modalTitle').text(data['Title']);
    //     $('#modalBody').text(data['Body']);

    //     // Show the modal
    //     $('#myModal').modal('show');
    //   });

    $('#EmployeDatatable tbody').on('click', '.viewDetails', function () {
        $('#staticBackdrop').modal('show');

        // Get the data for the clicked row
        var data = table.row($(this).closest('tr')).data();
        // Log the data to the console for testing
        $('#name').text(data.FullName);
        $('#email').text(data.EmailAddress);
        $('#dob').text(data.DateOfJoining);
        $('#gender').text(data.Gender);
        $('#designation').text(data.Designation);
        $('#state').text(data.State);

        console.log(data.FullName);

    });
});