$(document).ready(function () {
    $.ajax({
        url: "employee.json",
        type: 'GET',
        success: function (data) {
            data.forEach(function (item, index) {
                item.index = index + 1;
            });
            var eventTable = $('#eventTable').DataTable({
                "dom": '<"toolbar">frtip',
                "searching": true,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: 'Search...'
                },
                data : data,
                columns: [
                    { data: "index", className: 'text-center' },
                    { data: "employeeName", className: 'text-center' },
                    { data: "department", className: 'text-center' },
                    { data: "email", className: 'text-center' },
                    { data: "phoneNumber", className: 'text-center' },
                    { data: "Gender", className: 'text-center' },
                    {
                        data: null,
                        className: 'text-center',
                        render: function (data, type, row) {
                            return (
                                '<button type="button" class="btn btn-sm viewdetails" view-id="' + row.employeeID + '"><i class="fa fa-eye"></i></button>'
                            );
                        },
                    },
                ]
            });
            $(document).on('click', '.viewdetails', function () {
                var viewDetails = $(this).attr('view-id');
                var row = eventTable.row($(this).closest('tr')).data();
                console.log(row.city); 
            });
        },
        error: function () {
            alert('Error retrieving data!');
        }
    });

 

    
    
});


