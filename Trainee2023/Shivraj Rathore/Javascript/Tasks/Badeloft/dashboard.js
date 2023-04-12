
$(document).ready(function () {


  const hello = JSON.parse(localStorage.getItem("loggedInUser"));
        if (hello == null) {
            location.replace("./index.html");
        }


var DashboardData = [
['Stock Location', '', '', 'On Water', 'On Water', 'In Production'],
['ETA Date', '', '', '08/15/2021', '08/15/2021', '08/15/2021'],
['BW-01-S-M', '1', '0', "<button class='text-primary  border-0 bg-light' data-bs-toggle='popover' id='popover'>3</button>", '0', '0'],
['BW-03-XL-G', '1', '1', "<button class='text-primary border-0 bg-light'>2</button>", '2', '1'],
['BW-01-Q-M', '', '0', "<button class='text-primary border-0 bg-light'>2</button>", '0', '1'],
['BW-03-XL-G', '1', '1', "<button class='text-primary border-0 bg-light'>2</button>", '2', '1'],
['ZK-08-X2P', '1', '0', "<button class='text-primary border-0 bg-light'>2</button>", '0', '1'],
['AP-03-XL-G', '1', '1', "<button class='text-primary border-0 bg-light'>2</button>", '2', '1'],
['WB-05-M-G', '', '0', "<button class='text-primary border-0 bg-light'>2</button>", '0', '1'],
['ZK-08-X2P', '1', '1', "<button class='text-primary border-0 bg-light'>2</button>", '2', '1'],
['WB-05-M-G', '', '0', "<button class='text-primary border-0 bg-light'>2</button>", '0', '1'],
['ZK-08-X2P', '1', '1', "<button class='text-primary border-0 bg-light'>2</button>", '2', '1'],
['WB-05-M-G', '', '', '', '', ''],
];


var StockLocation = $.fn.dataTable.absoluteOrder( 
  [{ value: 'Stock Location', position: 'top' },
  { value: 'ETA Date', position: 'top' } ]);


var table = $('#dashboard_table').DataTable({
  language: {
    search: "_INPUT_",
        searchPlaceholder: 'Search...',
        paginate: {
          next: '&#62',
          previous: '&#60' 
        },
        "info": "Items _START_ to _END_ of _TOTAL_ total"
  },
  data: DashboardData,
  paging: true,
  dom: '<"toolbar">frtip',
  bFilter: true,
  bInfo: true,
  columnDefs: [
    {
      width : "30%",
      targets:[0]
    },
    { targets: 0, type: StockLocation },
    { orderable: true, targets: 0 },
    { orderable: false, targets: "_all" }
  ],
  fnInitComplete: function () {
    $("div.toolbar").html("<h2>Dashboard</h2>");
  },
})

var activeuser = JSON.parse(localStorage.getItem("loggedInUser"));
$("#activeuser").html(activeuser.username);

$("#logout").click(function () {
localStorage.removeItem("loggedInUser");
location.replace("index.html");
});

$('[data-bs-toggle="popover"]').popover({

  container: 'body',
  placement: 'right',
  html: true, 
  content: function() {
        return $('#popover-form').html();
  }
});

$(document).on('click', '.btn-close', function() {
  $('[data-bs-toggle="popover"]').popover('hide');
});

});

