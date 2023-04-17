$(document).ready(function () {
  var EmployeeDatails;
  $.ajax({
    type: "GET",
    url: "EmployeeDetails.json",
    dataType: "json",
    //async:false,
    success: function (data) {
      EmployeeDatails = data;
      displaytable(data);
    },
    error: function (response) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Fail to Load Data',
        //footer: '<a href="">Why do I have this issue?</a>'
      })
    },
  });
 // console.log(EmployeeDatails)
  

  function displaytable(EmployeeData) {
    
    table = $("#Table").DataTable({
      order: [],
      deferRender: true,
      
      language: {
        search: "" ,
        searchPlaceholder: "Search here...",
        info: "Items _START_ to _END_ of _TOTAL_ total",
        paginate: {
          next: 'Next  <i class="bi bi-chevron-right"></i>',
          previous: '<i class="bi bi-chevron-left"></i> Prev',
        },
      },
      // "dom": 'rtip',
      columnDefs: [
        //{ className: "dt-left", targets: [0, 2, 6] },
        { className: "dt-center", targets: "_all"},
        // { width: "10px", targets: [0] },
      ],
     
      data: EmployeeData,
      bInfo: true,
      columns: [
        
        {
          data: "Index",
          title: "#",
          //className: "dt-control ShowChildrow",
          orderable: false,
          "render": function ( data, type, full, meta ) {
            return  meta.row + 1;
        } 
        }, 
        {
          data: "EmployeeName",
          title: "Name",
          //className: "dt-control ShowChildrow",
          orderable: true,
        },
        {
            data: "Department",
            title: "Department",
            //className: "dt-control ShowChildrow",
            orderable: true,
            render:function (data, type, row) {
              if(data=="QA"){
                return "<span class='QA'>"+data+"</span>"
              }
              if(data=="Development"){
                return "<span class='Develoment'>"+data+"</span>"
              }
              if(data=="Sales"){
                return "<span class='Sales'>"+data+"</span>"
              }
              if(data=="Marketing"){
                return "<span class='Marketing'>"+data+"</span>"
              }
              if(data=="HR"){
                return "<span class='HR'>"+data+"</span>"
              }
              if(data=="SEO"){
                return "<span class='SEO'>"+data+"</span>"
              }
              
          }
          },
          {
            data: "Email",
            title: "Email",
            //className: "dt-control ShowChildrow",
            orderable: true,
            render:function (data, type, row) {
                return "<a href='mailto:"+data+"'>"+data+"</a>"
            }
          },
          {
            data: "Phone",
            title: "Phone Number",
            //className: "dt-control ShowChildrow",
            orderable: false,
            render:function (data, type, row) {
                return "<a href='tel:"+data+"'>"+data+"</a>"
            }
          },
          {
            data: "Gender",
            title: "Gender",
            //className: "dt-control ShowChildrow",
            orderable: false,
          },
          {
            data: "EmployeeID",
            title: "Action",
            orderable: false,
            // className: "editStock",
            render:function (data, type, row) {
             return "<button type='button' class='btn ViewDetails Tooltip' id='"+data+"'><span class='tooltiptext'>View Details</span><i class='bi bi-eye-fill'></i></button>";
            }
          },
      ],
    });
  }

 
 // $("input[type=search]").attr('id','search')
 
    $(document).on("click",".ViewDetails",function(){
    $("#EmployeeDetailsModal").modal('show')
    
    var id=$(this).attr('id')
    
    for(let i=0;i<EmployeeDatails.length;i++){
      if(EmployeeDatails[i].EmployeeID==id){
        $("#employeeName").text(EmployeeDatails[i].EmployeeName)
        $("#employeeEmail").text(EmployeeDatails[i].Email)
        $("#employeeDOB").text(EmployeeDatails[i].DateOfBirth)
       
        if(EmployeeDatails[i].Gender=="M"){
          $("#employeeGender").text("Male")
        }
        else{
          $("#employeeGender").text("Female")
        }
       
        $("#employeeDesignation").text(EmployeeDatails[i].Designation)
        $("#employeeState").text(EmployeeDatails[i].State)
        $("#employeeCity").text(EmployeeDatails[i].City)
        $("#employeePostlCode").text(EmployeeDatails[i].PostalCode)
        
        $("#employeePhone").text(EmployeeDatails[i].Phone)
        $("#employeeDepartment").text(EmployeeDatails[i].Department)
        $("#employeeSalary").text("$"+EmployeeDatails[i].MonthlySalary)
        //$("#employeePostlCode").text(EmployeeDatails[i].PostalCode)
        $("#employeeDOJ").text(EmployeeDatails[i].DateOfJoining)

        debugger
         var TotalExp=(EmployeeDatails[i].TotalExperience).toString();
         var exp=TotalExp.split(".")
         exp[1]="0."+exp[1]
         exp[1]=Number(exp[1])
          var expmonth=parseInt((exp[1]*365.242199)/30)
         
        $("#employeeExperience").text(exp[0]+" Years, "+expmonth +" Month")

        $("#employeeRemark").text(EmployeeDatails[i].Remarks)
      }
    }
    
  })
});

// date.ToString("dd-MMM-yyyy");