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
        data: dataSet,
        order: [],
        // dom: "rtip",
        language: {
            paginate: {
                next: " Next &#62",
                previous: "&#60 Previous ",
            },
        },

        columns: [
            {
                orderable: false, title: "#", data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                data: "FullName",
                title: " Name",
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
                    if (data === "Marketing") {
                        return '<span class=" " style="color: #005400;">' + data + '</span>';
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
                data: "PhoneNumber", title: "PhoneNumber", class: "text-center", orderable: false,
                render: function (data, type, row) {
                    return '<a href="tel:' + data + '" style=" text-decoration: none">' + data + '</a>';
                }
            },
            {
                data: "Gender", title: "Gender", class: "text-center", orderable: false, render: function (data, type, row) {
                    return data.toUpperCase();
                }
            },
            {
                data: null, title: "View", class: "text-start", orderable: false, render: function (data, type, row) {
                    return '<i class="bi bi-eye-fill viewDetails"><span class="ttip dflex" style= "width:100px;">View details</span></i>';
                }
            },
        ],
    });

    // // JavaScript code
    $('.viewDetails').hover(
        function () {
            // executed when the mouse enters the element
            $(this).find('.ttip').css('display', 'block');
        },
        function () {
            // executed when the mouse leaves the element
            $(this).find('.ttip').css('display', 'none');
        }
    );





    $('#EmployeDatatable tbody').on('click', '.viewDetails', function () {
        $('#staticBackdrop').modal('show');

        // Get the data for the clicked row
        var data = table.row($(this).closest('tr')).data();
        // Log the data to the console for testing
        $('#name').text(data.FullName);
        $('#email').text(data.EmailAddress);
        $('#dob').text(data.DateOfBirth);
        $('#gender').text(data.Gender);
        $('#designation').text(data.Designation);
        $('#state').text(data.State);
        $('#city').text(data.City);
        $('#postcode').text(data.Postalcode);

        $('#phone').text(data.PhoneNumber);
        $('#department').text(data.Department);
        $('#salary').text(data.Salary);


        $('#experience').text(data.Experience + ' years');


        $('#dateOfJoining').text(data.DateOfJoining);
        $('#remarks').text(data.Remarks);
        console.log(data.FullName);

    });

    $("#textSearch").on("keyup", function () {
        table.search(this.value).draw();
    });

});