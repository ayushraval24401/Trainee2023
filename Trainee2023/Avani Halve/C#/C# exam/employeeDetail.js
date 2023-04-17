$(document).ready(function () {
  $.ajax({
    url: "employeeDetailFile.json",
    type: 'GET',
    success: function (data) {
        data.forEach(function (item, index) {
            item.index = index + 1;
        });
        var employeeDataTable = $('#employeeDataTable').DataTable({
            
            paging: false,
            info: false,
            "searching": true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: 'Search...'
            },
            data : data,
            columns: [
                { data: "index", className: 'text-center', orderable: false },
                { data: "FirstName", className: 'text-center' },
                { data: "department", className: 'text-center', 
                  render: function(data, type, row) {
                    switch(data) {
                        case 'Sales':
                            return '<span class="sales">' + data + '</span>';
                        case 'Marketing':
                            return '<span class="marketing">' + data + '</span>';
                        case 'Developer':
                            return '<span class="developer">' + data + '</span>';
                        case 'QA':
                            return '<span class="qa">' + data + '</span>';
                        case 'HR':
                            return '<span class="hr ">' + data + '</span>';
                        case 'SEO':
                            return '<span class="seo">' + data + '</span>';
                        default:
                            return data;
                    }
                }},
                { 
                    data: "Email", 
                    className: 'text-center',
                    render: function (data, type, row) {
                        return '<a class="aTag" href="mailto:' + data + '">' + data + '</a>';
                    }
                },
                { 
                    data: "EncryptedPhone", 
                    className: 'text-center',
                    render: function (data, type, row) {
                        return '<a class="aTag" href="tel:' + data + '">' + data + '</a>';
                    }
                },
                { data: "Gender", className: 'text-center' },
                {
                    data: null,
                    className: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return (
                            '<button type="button" class="btn btn-sm empDetail"><i class="fa fa-eye"></i></button>'
                        );
                    },
                },
            ],
        });
        
        $(document).on('click', '.empDetail', function () {
            var row = employeeDataTable.row($(this).closest('tr')).data();
            $('#name').text(row.FirstName);
            $('#email').text(row.Email);
            $('#dob').text(row.DOB);
            $('#gender').text(row.Gender);
            $('#designation').text(row.Designation);
            $('#state').text(row.state);
            $('#city').text(row.city);
            $('#empPostcode').text(row.postCode);
            $('#phone').text(row.EncryptedPhone);
            $('#empDepartment').text(row.department);
            $('#salary').text(row.salary);
            $('#doj').text(row.DOJ);
            $('#expeirence').text(row.exiprence);
            $('#remark').text(row.remark);
            $('#employeeDetailModal').modal('show');
        });
    },
    error: function () {
      swal("Error!", "can't retrive the Data!", "error");
    }
});

});
