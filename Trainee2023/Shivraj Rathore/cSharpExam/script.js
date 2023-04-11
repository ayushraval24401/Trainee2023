$(document).ready(function () {
    $.ajax({
        url: "employee.json",
        type: 'GET',
        success: function (data) {
            data.forEach(function (item, index) {
                item.index = index + 1;
            });
            var employeeDataTable = $('#employeeDataTable').DataTable({
                "dom": '<"toolbar">frtip',
                "searching": true,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: 'Search...'
                },
                data : data,
                columns: [
                    { data: "index", className: 'text-center', orderable: false },
                    { data: "employeeName", className: 'text-center' },
                    { data: "department", className: 'text-center', 
                      render: function(data, type, row) {
                        switch(data) {
                            case 'Sales':
                                return '<span class="text-sales">' + data + '</span>';
                            case 'Marketing':
                                return '<span class="text-Marketing">' + data + '</span>';
                            case 'Developer':
                                return '<span class="text-Developer">' + data + '</span>';
                            case 'QA':
                                return '<span class="text-QA">' + data + '</span>';
                            case 'HR':
                                return '<span class="text-HR ">' + data + '</span>';
                            case 'SEO':
                                return '<span class="text-SEO">' + data + '</span>';
                            default:
                                return data;
                        }
                    }},
                    { 
                        data: "email", 
                        className: 'text-center',
                        render: function (data, type, row) {
                            return '<a href="mailto:' + data + '">' + data + '</a>';
                        }
                    },
                    { 
                        data: "phoneNumber", 
                        className: 'text-center',
                        render: function (data, type, row) {
                            return '<a href="tel:' + data + '">' + data + '</a>';
                        }
                    },
                    { data: "Gender", className: 'text-center' },
                    {
                        data: null,
                        className: 'text-center',
                        orderable: false,
                        render: function (data, type, row) {
                            return (
                                '<button type="button" class="btn btn-sm viewdetails" view-id="' + row.employeeID + '"><i class="fa fa-eye"></i></button>'
                            );
                        },
                    },
                ]
                ,

            });
            
            $(document).on('click', '.viewdetails', function () {
                var row = employeeDataTable.row($(this).closest('tr')).data();
                $('#empName').text(row.employeeName);
                $('#empEmail').text(row.email);
                $('#empDob').text(row.dateOfBirth);
                $('#empgender').text(row.Gender);
                $('#empDesignation').text(row.designation);
                $('#empState').text(row.state);
                $('#empCity').text(row.city);
                $('#empPostcode').text(row.postCode);
                $('#empPhone').text(row.phoneNumber);
                $('#empDepartment').text(row.department);
                $('#empSalary').text('$' + row.salary);
                $('#empdateOfJoining').text(row.dateOfJoining);
                $('#empTotalexp').text(row.totalExperience);
                $('#empRemarks').text(row.remarks);
                $('#employeeDetailModal').modal('show');
            });
        },
        error: function () {
            alert('Error retrieving data!');
        }
    });

});


