$(document).ready(function () {
  displayapilisttable();

  $(document).on("click", "#AddApiData", function () {
    $("#AddApiModal").modal("show");
  });
  $(document).on("click", "#addEvent", function () {
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
        displayapilisttable();
      },
      error: function (response) {
        console.log(response);
      },
    });

    $("#AddApiModal").modal("hide");
    document.getElementById("apidataform").reset();
  });

  //Edit
  $(document).on("click", ".Edit", function () {
    displayapilisttable();
    $(".saveapiData").attr("id", "EditData");
    $("#AddApiModal").modal("show");
    var index = $(this).data("indexedit");
    var startdate = Date.parse($(this).closest("tr").find("td:eq(1)").text());
    startdate = ConvertDateFormat(startdate);

    var enddate = Date.parse($(this).closest("tr").find("td:eq(2)").text());
    enddate = ConvertDateFormat(enddate);
    //alert(date);
    $("#eventTitle").val($(this).closest("tr").find("td:eq(0)").text());
    $("#StartDate").val(startdate);
    $("#EndDate").val(enddate);
    $("#EventDes").val($(this).closest("tr").find("td:eq(3)").text());
    $("#EventPriority").val($(this).closest("tr").find("td:eq(4)").text());
    $("#hidden").val(index);

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
    $.ajax({
      url: "https://demosatva.azurewebsites.net/v1/api/Events/" + index + "",
      type: "DELETE",
      success: function (result) {
        // Do something with the result
        console.log(result);
        $("[data-indexedit=" + index + "]")
          .closest("tr")
          .remove();
      },
      error: function (response) {
        console.log(response);
      },
    });
    // $(this).closest( "tr" ).remove()
  });

  function displayapilisttable() {
    var apiData;
    $.ajax({
      type: "GET",
      url: "https://demosatva.azurewebsites.net/v1/api/Events",
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.document == null) {
          alert("No data is present");
        } else {
          apiData = data.document.records;
          displayDataInTable(apiData);
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
          "<thead><th>EventTitle</th><th>startDate</th><th>EntDate</th><th>EventDescription</th><th>EventPriority</th><th>Action</th></thead>";
      }
      list +=
        "<tr><td>" +
        apiData[i].eventTitle +
        "</td><td>" +
        apiData[i].startDate +
        "</td><td>" +
        apiData[i].endDate +
        "</td><td>" +
        apiData[i].eventDescription +
        "</td><td>" +
        apiData[i].eventPriority +
        "</td><td><button type='button' class='btn Edit me-1' data-indexedit='" +
        apiData[i].id +
        "'>Edit</button><button type='button' class='btn Delete ms-1' data-indexdelete='" +
        apiData[i].id +
        "'>Delete</button></td></tr>";
    }

    $("#apilisttable").html(list);
  }
});
