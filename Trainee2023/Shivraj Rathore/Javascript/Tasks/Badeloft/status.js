
$(document).ready(function () {
  const checkuser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (checkuser == null) {
    location.replace("./index.html");
  }

  var activeuser = JSON.parse(localStorage.getItem("loggedInUser"));
  $("#activeuser").html(activeuser.username);



  function format(d) {
    return (
      '<table class="text-center"  style="width:100%;"> ' +
      '<tr>' +
      '<th>#</th>' +
      '<th>Part Number</th>' +
      '<th>Stock Location</th>' +
      '<th>Action</th>' +
      '</tr>' +
      '<tr>' +
      '<td>1</td>' +
      '<td>BW-01-S-M</td>' +
      '<td>Warehouse</td>' +
      '<td><i class="fa fa-close"></i></td>' +
      '</tr>' +
      '<tr>' +
      '<td>2</td>' +
      '<td>AP-03-XL-G</td>' +
      '<td>C-101</td>' +
      '<td><i class="fa fa-close"></i></td>' +
      '</tr>' +
      '<tr>' +
      '<td>3</td>' +
      '<td>BW-03-XL-G</td>' +
      '<td>E-501</td>' +
      '<td><i class="fa fa-close"></i></td>' +
      '</tr>' +
      '</table>'
    );
  }

  var Statusdata = [
    {
      qb_invoice: "150000",
      name: "Kenneth Woodward",
      qb_shipdate: "09/08/2001",
      qb_pay_status: '<button class="btn-sm alert alert-success  p-0"><i class="fa fa-check"></i>&nbsp;Paid</button>',
      status: 'Shipped',
      qb_delievery_phone: "asasxc",
      called: '<input type="checkbox" ></input>',
      qb_tracking: "WBC-123"
    },
    {
      qb_invoice: "150001",
      name: "James Fenske",
      qb_shipdate: "09/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-success  p-0"><i class="fa fa-check"></i>&nbsp;Paid</button>',
      status: 'Shipped',
      qb_delievery_phone: "618-234-6400",
      called: '<input type="checkbox"></input>',
      qb_tracking: "WBC-124"
    },
    {
      qb_invoice: "150002",
      name: "Kelly McCrory",
      qb_shipdate: "02/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-success  p-0"><i class="fa fa-check"></i>&nbsp;Paid</button>',
      status: 'STD',
      qb_delievery_phone: "630-367-8448",
      called: '<input type="checkbox"></input>',
      qb_tracking: ""
    },
    {
      qb_invoice: "150003",
      name: "Linda Englund",
      qb_shipdate: "03/08/2001",
      qb_pay_status: '<button class="btn-sm alert alert-danger  p-0"><i class="fa fa-close"></i>&nbsp;Unpaid</button>',
      status: 'Shipped',
      qb_delievery_phone: "203-963-9428",
      called: '<input type="checkbox"></input>',
      qb_tracking: "WBC-125"
    },
    {
      qb_invoice: "150004",
      name: "Frances Badger",
      qb_shipdate: "04/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-success  p-0"><i class="fa fa-check"></i>&nbsp;Paid</button>',
      status: 'STD',
      qb_delievery_phone: "508-206-0722",
      called: '<input type="checkbox"></input>',
      qb_tracking: ""
    },
    {
      qb_invoice: "150005",
      name: "Tasha Tapia",
      qb_shipdate: "05/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-warning  p-0"><i class="fa fa-exclamation-circle"></i>&nbsp;Pending Approval</button>',
      status: 'Shipped',
      qb_delievery_phone: "201-905-4664",
      called: '<input type="checkbox"></input>',
      qb_tracking: "WBC-127"
    },
    {
      qb_invoice: "150006",
      name: "Samantha Southard",
      qb_shipdate: "06/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-success  p-0"><i class="fa fa-check"></i>&nbsp;Paid</button>',
      status: 'Shipped',
      qb_delievery_phone: "707-271-9412",
      called: '<input type="checkbox"></input>',
      qb_tracking: "WBC-128"
    },
    {
      qb_invoice: "150007",
      name: "James Fenske",
      qb_shipdate: "07/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-success  p-0"><i class="fa fa-check"></i>&nbsp;Paid</button>',
      status: 'Shipped',
      qb_delievery_phone: "618-234-6400",
      called: '<input type="checkbox"></input>',
      qb_tracking: "WBC-124"
    },
    {
      qb_invoice: "150008",
      name: "Kelly McCrory",
      qb_shipdate: "08/08/2001",
      qb_pay_status: '<button class="btn-sm alert alert-success  p-0"><i class="fa fa-check"></i>&nbsp;Paid</button>',
      status: 'STD',
      qb_delievery_phone: "630-367-8448",
      called: '<input type="checkbox"></input>',
      qb_tracking: ""
    },
    {
      qb_invoice: "150009",
      name: "Linda Englund",
      qb_shipdate: "09/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-danger  p-0"><i class="fa fa-close"></i>&nbsp;Unpaid</button>',
      status: 'Shipped',
      qb_delievery_phone: "203-963-9428",
      called: '<input type="checkbox"></input>',
      qb_tracking: "WBC-125"
    },
    {
      qb_invoice: "150010",
      name: "Frances Badger",
      qb_shipdate: "10/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-success  p-0"><i class="fa fa-check"></i>&nbsp;Paid</button>',
      status: 'Shipped',
      qb_delievery_phone: "508-206-0722",
      called: '<input type="checkbox"></input>',
      qb_tracking: ""
    },
    {
      qb_invoice: "150011",
      name: "Tasha Tapia",
      qb_shipdate: "11/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-warning  p-0"><i class="fa fa-exclamation-circle"></i>&nbsp;Pending Approval</button>',
      status: 'STD',
      qb_delievery_phone: "201-905-4664",
      called: '<input type="checkbox"></input>',
      qb_tracking: "WBC-127"
    },
    {
      qb_invoice: "150012",
      name: "Samantha Southard",
      qb_shipdate: "12/08/2001",
      qb_pay_status: '<button  class="btn-sm alert alert-success  p-0"><i class="fa fa-check"></i>&nbsp;Paid</button>',
      status: 'Shipped',
      qb_delievery_phone: "707-271-9412",
      called: '<input type="checkbox"></input>',
      qb_tracking: "WBC-128"
    }
  ]

  var table = $('#Statusdata').DataTable({
    "paging": true,
    "dom": '<"toolbar">frtip',
    bFilter: true,
    bInfo: true,
    fnInitComplete: function () {
      $('div.toolbar').html('<h2>Status</h2>');
    },
    data: Statusdata,
    language: {
      search: "_INPUT_",
          searchPlaceholder: 'Search...',
          paginate: {
            next: '&#62',
            previous: '&#60' 
          },
          "info": "Items _START_ to _END_ of _TOTAL_ total" 
    },
    columns: [
      { data: 'qb_invoice', orderable: true, className: 'dt-control text-start ' },
      { data: 'name', orderable: true,className: 'text-start' },
      { data: 'qb_shipdate', orderable: true ,className: 'text-start'},
      { data: 'qb_pay_status', orderable: false ,className: 'text-start'},
      { data: 'status', orderable: false ,className: 'text-start'},
      { data: 'qb_delievery_phone', orderable: false ,className: 'text-start'},
      { data: 'called', orderable: false ,className: 'text-center'},
      { data: 'qb_tracking', orderable: false ,className: 'text-start'},
    ],
    order: [[1, 'asc']],
  });


  // Add event listener for opening and closing details
  $('#Statusdata tbody').on('click', 'td.dt-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row(tr);

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass('shown');
    }
  });
});

$("#logout").click(function () {
  localStorage.removeItem("loggedInUser");
  location.replace("index.html");
});
