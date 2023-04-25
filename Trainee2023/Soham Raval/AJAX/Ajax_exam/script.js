$(document).ready(function () {
    $('#example').DataTable({
        order:[],
        ajax: {
            url: 'EmployeeData_15042023.json',
            dataSrc: ''
        },
        
        columns: [
            {data:'Id'},
            { data: 'name' },
            { data: 'Department' },
            { 
                data: 'EmailAddress', 
                render: function(data) {
                    return '<a href="mailto:' + data + '">' + data + '</a>';
                }
            },
            { 
                data: 'PhoneNumber', 
                render: function(data) {
                    return '<a href="tel:' + data + '">' + data + '</a>';
                }
            },
            {
                data: 'Gender',
                render: function(data) {
                    return data === 'Female' ? 'F' : 'M';
                }
            },
            {
                data: null,
                render: function(data) {
                    return '<i class="fa fa-eye" title="View Detail" data-bs-toggle="tooltip" data-bs-placement="top" data-id="' + data.Id + '"></i>';
                }
            }                
        ],
        columnDefs: [
            {
                targets: [0,1,2,3,4,5,6],
                className: 'text-center'
            },
            { targets: [0, 4, 5,6], orderable: false } ,
            { targets: [3, 4], className: 'no-border' },
            { targets: [1, 2, 3], orderable: true } ,
            {
            targets: 2,
            render: function(data, type, row, meta) {
                var color = '';
                switch(data) {
                    case 'Sales':
                        color = '#ff0000';
                        break;
                    case 'Marketing':
                        color = '#005400';
                        break;
                    case 'Development':
                        color = '#000';
                        break;
                    case 'QA':
                        color = '#0000ff';
                        break;
                    case 'HR':
                        color = '#fe00ef';
                        break;
                        case 'SEO':
                            color = '#fe00ef';
                            break;
                    default:
                        color = 'inherit';
                        break;
                }
                return '<span style="color: ' + color + '">' + data + '</span>';
            }
        }
        ],
        language: {
            search: '',
            searchPlaceholder: 'Search here...',
        },
    });
    $('[data-bs-toggle="tooltip"]').tooltip();

    $('body').on('click', '.fa-eye', function() {
        var id = $(this).data('id');
       
        $('#datatableModal').modal('show'); 
        $.ajax({
            url: 'EmployeeData_15042023.json',
            dataType: 'json',
            success: function(data) {
                var employee = data.find(function(item) {
                    return item.Id == id;
                });
                if (employee) {
                    $('#name').text(employee.name);
                    $('#email').text(employee.EmailAddress);
                    $('#dob').text(employee.DateOfBirth);
                    $('#gender').text(employee.Gender);
                    $('#designtion').text(employee.Designation);
                    $('#state').text(employee.State);
                    $('#city').text(employee.City);
                    $('#postcode').text(employee.Postcode);
                    $('#phone').text(employee.PhoneNumber);
                    $('#department').text(employee.Department);
                    $('#salary').text(employee.MonthlySalary);
                    $('#doj').text(employee.DateOfBirth);
                    $('#exp').text(employee.TotalExperience);
                    $('#remark').text(employee.Remarks);
                    $('#datatableModal').modal('show');
                } else {
                    alert('Employee not found');
                }

            },
            error: function() {
                alert('Error fetching employee data');
            }
        });

    });
    
  
    
});
// $(document).ready(function () {
//     $('#example').DataTable({
        
//         ajax: {
//             url: 'EmployeeData_11042023.json',
//             dataSrc: ''
//         },
//         columns: [
//             {data:'Id'},
//             { data: 'name' },
//             { data: 'Department' },
//             { 
//                 data: 'EmailAddress', 
//                 render: function(data) {
//                     return '<a href="mailto:' + data + '">' + data + '</a>';
//                 }
//             },
//             { 
//                 data: 'PhoneNumber', 
//                 render: function(data) {
//                     return '<a href="tel:' + data + '">' + data + '</a>';
//                 }
//             },
//             {
//                 data: 'Gender',
//                 render: function(data) {
//                     return data === 'Female' ? 'F' : 'M';
//                 }
//             },
//             {
//                 data: null,
//                 render: function(data) {
//                     return '<i class="fa fa-eye" title="View Detail" data-bs-toggle="tooltip" data-bs-placement="top" data-id="' + data.Id + '"></i>';
//                 }
//             }                
//         ],
//         columnDefs: [
//             {
//                 targets: [0,1,2,3,4,5],
//                 className: 'text-center'
//             },
//             { targets: [0, 4, 5,6], orderable: false } ,
//             { targets: [3, 4], className: 'no-border'},
//             { targets: [1, 2, 3], orderable: true } ,
//             {
//             targets: 2,
//             render: function(data, type, row, meta) {
//                 var color = '';
//                 switch(data) {
//                     case 'Sales':
//                         color = '#ff0000';
//                         break;
//                     case 'Marketing':
//                         color = '#005400';
//                         break;
//                     case 'Development':
//                         color = '#000';
//                         break;
//                     case 'QA':
//                         color = '#0000ff';
//                         break;
//                     case 'HR':
//                         color = '#fe00ef';
//                         break;
//                         case 'SEO':
//                             color = '#fe00ef';
//                             break;
//                     default:
//                         color = 'inherit';
//                         break;
//                 }
//                 return '<span style="color: ' + color + '">' + data + '</span>';
//             }
//         }
//         ],
//         language: {
//             search: '',
//             searchPlaceholder: 'Search here...',
//         },
//     });
//     $('[data-bs-toggle="tooltip"]').tooltip();

//     $('body').on('click', '.fa-eye', function() {
//         debugger
//         var id = $(this).data('id');
      
//         console.log(id);
//         $('#datatableModal').modal('show'); 
//         $.ajax({
//             url: 'EmployeeData_11042023.json',
//             dataType: 'json',
//             success: function(data) {
//                 console.log(data)
//                 var employee = data.find(function(item) {
//                     return item.Id == id;
//                 });
//                 console.log(employee.name);
//                 if (employee) {
//                     $('#name').text(employee.name);
//                     $('#email').text(employee.EmailAddress);
//                     $('#dob').text(employee.DateOfBirth);
//                     $('#gender').text(employee.Gender);
//                     $('#designtion').text(employee.Designation);
//                     $('#state').text(employee.State);
//                     $('#city').text(employee.City);
//                     $('#postcode').text(employee.Postcode);
//                     $('#phone').text(employee.PhoneNumber);
//                     $('#department').text(employee.Department);
//                     $('#salary').text(employee.MonthlySalary);
//                     $('#doj').text(employee.DateOfBirth);
//                     $('#exp').text(employee.TotalExperience);
//                     $('#remark').text(employee.Remarks);
//                     $('#exampleModal').modal('show');
//                 } else {
//                     alert('Employee not found');
//                 }
//             },
//             error: function() {
//                 alert('Error fetching employee data');
//             }
            
//         });

//     });
    

// });

