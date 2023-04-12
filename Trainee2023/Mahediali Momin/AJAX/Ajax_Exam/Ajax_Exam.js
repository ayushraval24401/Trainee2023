$(document).ready(function () {
    var employeeData = $('#Ajax_table').DataTable({
        order: [],
        searching: true,
        paging: true,
        pageLength: 10,
        ajax: {
            url: 'EmployeeData_08-April-2023.json', // replace with your API endpoint
            // type: 'GET',
            dataSrc: '', // set to an empty string since the data is not wrapped in a property
        },
        columns: [
            { data: 'EmployeeID', "orderable": false, className: 'text-center' },
            { data: 'Name', className: 'text-center' },
            {
                data: 'Department',
                className: 'text-center',
                render: function (data, type, row) {
                    // set the text color for the department based on the value
                    var color = '';
                    if (data === 'Sales') {
                        color = '#ff0000';
                    }
                    else if (data === 'Marketing') {
                        color = '#005400';
                    }
                    else if (data === 'Development') {
                        color = '#000';
                    }
                    else if (data === 'QA') {
                        color = '#0000ff';
                    }
                    else if (data === 'SEO') {
                        color = '#fe00ef';
                    }

                    return '<span style="color: ' + color + '">' + data + '</span>';
                }
            },
            {
                data: 'Email',
                className: 'text-center',
                render: function (data, type, row) {
                    return '<a class="no-underline" href="mailto:' + data + '">' + data + '</a>';
                }
            },
            {
                data: 'Phone',
                "orderable": false,
                className: 'text-center',
                render: function (data, type, row) {
                    return '<a class="no-underline" href="tel:' + data + '">' + data + '</a>';
                }
            },
            {
                data: 'Gender',
                "orderable": false,
                className: 'text-center',
                render: function (data, type, row) {
                    if (data === 'Male') {
                        return 'M';
                    } else if (data === 'Female') {
                        return 'F';
                    } else {
                        return '';
                    }
                }
            },
            {
                data: null,
                className: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    // return '<i class="fa-solid fa-eye modal_eye" data-toggle="modal" data-target="#ajaxdataModal"  data-row-id="0" data-placement="top" title="View Details"></i>';
                    //  return '<i class="fa-solid fa-eye eyeDetail" data-row-id="' + row.EmployeeID + '" data-toggle="tooltip" data-placement="top" title="View Details"></i>';
                    return '<i class="fa-solid fa-eye eyeDetail" data-row-id="' + row.EmployeeID + '" title="View Details">';
                    // return '<button type="button" class="btn btn-sm eyeDetail" view-id="' + row.EmployeeID + '" data-toggle="tooltip" data-placement="top" title="View Details"><i class="fa fa-eye"></i></button>';
                }
            },

        ],
        
        language: {
            search: '<i class="fa fa-search" aria-hidden="true"></i>',
            searchPlaceholder: 'Search here...',
            paginate: {
                previous: "< Prev",
                next: "Next >"
            },
        }

    });
    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip()
    // });
    

    $(document).on('click', '.eyeDetail', function () {
        var rowData = employeeData.row($(this).closest('tr')).data();
        console.log(rowData)
        $('#EmpName').text(rowData.Name);
        $('#EmpEmail').text(rowData.Email);
        $('#EmpDOB').text(rowData.DOB);
        $('#EmpGender').text(rowData.Gender);
        $('#EmpDesignation').text(rowData.Designation);
        $('#EmpState').text(rowData.State);
        $('#EmpCity').text(rowData.City);
        $('#EmpPostcode').text(rowData.Postcode);
        $('#EmpPhone').text(rowData.Phone);
        $('#EmpDepartment').text(rowData.Department);
        $('#EmpSalary').text('$' + rowData.MonthlySalary);
        $('#EmpDOJ').text(rowData.DateOfJoining);
        $('#EmpExperience').text(rowData.TotalExperience);
        $('#EmpRemarks').text(rowData.Remarks);
        $('#EmployeeDetails').modal('show');

    });

    $('.search').on('input', function () {
        var query = $(this).val().toLowerCase();
        $('#Ajax_table tbody tr').each(function () {
            var text = $(this).text().toLowerCase();
            if (text.indexOf(query) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
});



// Make an Ajax request to fetch the data from the JSON file
        // $.ajax({
        //     url: 'EmployeeData_08-April-2023.json', // Replace with the actual path to your JSON file
        //     dataType: 'json',
        //     success: function(data) {
        //         console.log(data)
        //         // Update the modal body with the fetched data
        //         var modalBody = '<p>Employee ID: ' + data[rowId].EmployeeID + '</p>' +
        //                         '<p>Name: ' + data[rowId].Name + '</p>' +
        //                         '<p>Email: ' + data[rowId].Email + '</p>' +
        //                         '<p>DOB: ' + data[rowId].DOB + '</p>' +
        //                         '<p>Gender: ' + data[rowId].Gender + '</p>' +
        //                         '<p>Designation: ' + data[rowId].Designation + '</p>' +
        //                         '<p>State: ' + data[rowId].State + '</p>' +
        //                         '<p>City: ' + data[rowId].City + '</p>' +
        //                         '<p>Postcode: ' + data[rowId].Postcode + '</p>' +
        //                         '<p>Phone: ' + data[rowId].Phone + '</p>' +
        //                         '<p>Department: ' + data[rowId].Department + '</p>' +
        //                         '<p>Monthly Salary: ' + data[rowId].MonthlySalary + '</p>';
        //         $('#ajaxdataModal .modal-body').html(modalBody);
        //         $('#ajaxdataModal').modal('show'); // Show the modal
        //     }
        // });

         // return an HTML element containing the eye icon with tooltip
                    // return '<i class="fa-solid fa-eye modal_eye" data-toggle="modal" data-target="#ajaxdataModal"  data-row-id="0" data-placement="top" title="View Details"></i>';
                    // return '<i class="fa-solid fa-eye eyeDetail" data-row-id="' + row.EmployeeID + '" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>';