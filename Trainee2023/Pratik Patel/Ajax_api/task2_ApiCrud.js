$(document).ready(function () {
  $(".Loader").hide()
  
 // displayapilisttable();
 // $("#pagenumber1").trigger('click'); 

  window.onload=function(){
    document.getElementById("pagenumber1").click();
  };

  $(document).on("click", "#AddApiData", function () {
    $("#ApiModalLabel").html("Add Api Modal");
    $("#AddApiModal").modal("show");
  });
  $.validator.addMethod("Numbers", function (value) {
    return /^\d+$/.test(value);
  });
  $("#apidataform").validate({
    rules: {
      eventTitle: {
        required: true,
      },
      StartDate: {
        required: true,
      },
      EndDate: {
        required: true,
      },
      EventDes: {
        required: true,
      },
      EventPriority: {
        required: true,
        Numbers: true,
      },
    },
    messages: {
      eventTitle: {
        required: "Please Enter Event Title",
      },
      StartDate: {
        required: "Please Enter Event start date",
      },
      EndDate: {
        required: "Please Enter Event end Date",
      },
      EventDes: {
        required: "Please Enter Event Description",
      },
      EventPriority: {
        required: "Please Enter Event Priority",
        Numbers: "Please Enter Numbers",
      },
    },
    submitHandler: function (form) {
      form.submit();
    },
  });
  var form = $("#apidataform");
  form.validate();
  $(document).on("click", "#addEvent", function () {
    var validationcheck = form.valid();
    if (validationcheck == true) {
      var evtTitle = $("#eventTitle").val();
      var startdate = $("#StartDate").val();
      var enddate = $("#EndDate").val();
      var evtDescription = $("#EventDes").val();
      var evtPriority = $("#EventPriority").val();

      var EventDetails = {
        eventTitle: evtTitle,
        startDate: startdate,
        endDate: enddate,
        eventDescription: evtDescription,
        eventPriority: evtPriority,
      };
      console.log(EventDetails);

      $.ajax({
        type: "POST",
        url: "https://demosatva.azurewebsites.net/v1/api/Events",
        data: JSON.stringify(EventDetails),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
          console.log(response);
          Swal.fire("Good job!", "You have successfully added data", "success");
          displayapilisttable();
        },
        error: function (response) {
          console.log(response);
        },
      });

      $("#AddApiModal").modal("hide");
      document.getElementById("apidataform").reset();
    } else {
    }
  });

  //Edit
  $(document).on("click", ".Edit", function () {
    $(".saveapiData").attr("id", "EditData");
    $("#AddApiModal").modal("show");
    $("#ApiModalLabel").html("Edit Api Modal");
    //displayapilisttable();
    var index = $(this).data("indexedit");
    var apiData;
    $.ajax({
      type: "GET",
      url: "https://demosatva.azurewebsites.net/v1/api/Events/" + index,
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.document == null) {
          //alert("No data is present");
          $("#apilisttable").html(
            "<thead class='text-center'><th>EventTitle</th><th>startDate</th><th>EntDate</th><th>EventDescription</th><th>EventPriority</th><th>Action</th></thead><tr><td>No Data is Present<td></tr>"
          );
        } else {
         // alert("AF");
          console.log(data.document);

          var startdate = Date.parse(data.document.startDate);
          startdate = ConvertDateFormat(startdate);

          var enddate = Date.parse(data.document.endDate);
          enddate = ConvertDateFormat(enddate);
          $("#eventTitle").val(data.document.eventTitle);
          $("#StartDate").val(startdate);
          $("#EndDate").val(enddate);
          $("#EventDes").val(data.document.eventDescription);
          $("#EventPriority").val(data.document.eventPriority);
          $("#hidden").val(index);
        }
      },
    });

    // var startdate = Date.parse($(this).closest("tr").find("td:eq(1)").text());
    // startdate = ConvertDateFormat(startdate);

    // var enddate = Date.parse($(this).closest("tr").find("td:eq(2)").text());
    // enddate = ConvertDateFormat(enddate);
    //alert(date);

    // alert(evtTitle)
  });

  $(document).on("click", "#EditData", function () {
    var evtTitle = $("#eventTitle").val();
    var startdate = $("#StartDate").val();
    var enddate = $("#EndDate").val();
    var evtDescription = $("#EventDes").val();
    var evtPriority = $("#EventPriority").val();

    var EventDetails = {
      eventTitle: evtTitle,
      startDate: startdate,
      endDate: enddate,
      eventDescription: evtDescription,
      eventPriority: evtPriority,
    };
    var index = $("#hidden").val();

    $.ajax({
      url: "https://demosatva.azurewebsites.net/v1/api/Events/" + index + "",
      type: "PUT",
      data: JSON.stringify(EventDetails),
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
        // console.log("PRATIK");
        displayapilisttable();
      },
      error: function (response) {
        console.log(response);
      },
    });
    $("#AddApiModal").modal("hide");
    $(".saveapiData").attr("id", "addEvent");
    document.getElementById("apidataform").reset();
  });

  $(document).on("click", ".closebutton", function () {
    $(".saveapiData").attr("id", "addEvent");

    document.getElementById("apidataform").reset();
  });

  function ConvertDateFormat(date) {
    var date = new Date(date);
    date = date.toLocaleDateString().split("/");

    //alert( "sac"+date[0]+"-"+date[1]+"-"+date[2])

    if (date[1] < 10) {
      date[1] = "0" + date[1];
    }
    // alert(date[1])
    if (date[0] < 10) {
      date[0] = "0" + date[0];
    }
    date = date[2] + "-" + date[0] + "-" + date[1];
    // alert("sdv"+date)
    return date;
  }

  //Delete
  $(document).on("click", ".Delete", function () {
    var index = $(this).data("indexdelete");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url:
            "https://demosatva.azurewebsites.net/v1/api/Events/" + index + "",
          type: "DELETE",
          success: function (result) {
            // Do something with the result
            console.log(result);
            $("[data-indexedit=" + index + "]")
              .closest("tr")
              .remove();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          },
          error: function (response) {
            console.log(response);
          },
        });
      }
    });

    // $(this).closest( "tr" ).remove()
  });

  function displayapilisttable() {
    $(".Loader").show()

    var apiData;
    $.ajax({
      type: "GET",
      url: "https://demosatva.azurewebsites.net/v1/api/Events",
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.document == null) {
          //alert("No data is present");
          $("#apilisttable").html(
            "<thead class='text-center'><th>EventTitle</th><th>startDate</th><th>EntDate</th><th>EventDescription</th><th>EventPriority</th><th>Action</th></thead><tr><td>No Data is Present<td></tr>"
          );
          $(".Loader").hide()
        } else {
          apiData = data.document.records;
          displayDataInTable(apiData);
          $(".Loader").hide()
        }
      },
    });

    // console.log(apiData);
  }
  function displayDataInTable(apiData) {
    var list = "";
    for (let i = 0; i < apiData.length; i++) {
      if (list == 0) {
        list =
          "<thead class='text-center'><th>EventTitle</th><th>startDate</th><th>EntDate</th><th>EventDescription</th><th>EventPriority</th><th>Action</th></thead>";
      }
      list +=
        "<tr class='text-center'><td>" +
        apiData[i].eventTitle +
        "</td><td>" +
        apiData[i].startDate +
        "</td><td>" +
        apiData[i].endDate +
        "</td><td>" +
        apiData[i].eventDescription +
        "</td><td>" +
        apiData[i].eventPriority +
        "</td><td><button type='button' class='btn Edit me-1 btn-success' data-indexedit='" +
        apiData[i].id +
        "'>Edit</button><button type='button' class='btn Delete ms-1 btn-danger' data-indexdelete='" +
        apiData[i].id +
        "'>Delete</button></td></tr>";
    }

    $("#apilisttable").html(list);
  }

  $(document).on("click", ".pageindex", function () {
    var pagenumber = $(this).val();
    $(".pageindex").removeClass("activebtn");
    $(this).addClass("activebtn");
    DisplayDataPageWise(pagenumber)
    // var apiData;
    // $.ajax({
    //   type: "GET",
    //   url:
    //     "https://demosatva.azurewebsites.net/v1/api/Events?page=" +pagenumber +"&itemsPerPage=5",
    //   dataType: "json",
    //   async: false,
    //   success: function (data) {
    //     if (data.document == null) {
    //       $("#apilisttable").html(
    //         "<thead class='text-center'><th>EventTitle</th><th>startDate</th><th>EntDate</th><th>EventDescription</th><th>EventPriority</th><th>Action</th></thead><tr><td>No Data is Present<td></tr>"
    //       );
    //     } else {
    //       apiData = data.document.records;
    //       displayDataInTable(apiData);
    //     }
    //   },
    // });
  });
   
  $(document).on("click", "#previousPage", function () {

   
    var pagenumber=($(".activebtn").val())-1
    if(pagenumber>0){
    $(".pageindex").removeClass("activebtn");
    $("[data-page=" + pagenumber + "]")
              .addClass("activebtn")
    // $(".pageindex").removeClass("activebtn");
    // $(this).addClass("activebtn");
    DisplayDataPageWise(pagenumber)
    }
  })

  function DisplayDataPageWise(pagenumber){
    var apiData;
    $.ajax({
      type: "GET",
      url:
        "https://demosatva.azurewebsites.net/v1/api/Events?page=" +pagenumber +"&itemsPerPage=5",
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.document == null) {
          $("#apilisttable").html(
            "<thead class='text-center'><th>EventTitle</th><th>startDate</th><th>EntDate</th><th>EventDescription</th><th>EventPriority</th><th>Action</th></thead><tr><td>No Data is Present<td></tr>"
          );
        } else {
          apiData = data.document.records;
          displayDataInTable(apiData);
        }
      },
    });
  }

  $(document).on("keyup", "#searchData", function () {
    if ($("#searchData").val().trim().length >= 3) {
      debugger;
      $.ajax({
        type: "GET",
        url:
          "https://demosatva.azurewebsites.net/v1/api/Events/search?searchKey=" +
          $("#searchData").val(),
        dataType: "json",
        async: false,
        success: function (data) {
          if (data.document == null) {
            $("#apilisttable").html(
              "<thead class='text-center'><th>EventTitle</th><th>startDate</th><th>EntDate</th><th>EventDescription</th><th>EventPriority</th><th>Action</th></thead><tr><td>No Data is Present<td></tr>"
            );
          } else {
            apiData = data.document.records;
            displayDataInTable(apiData);
          }
        },
      });
    } else {
      displayapilisttable();
    }
  });
});
