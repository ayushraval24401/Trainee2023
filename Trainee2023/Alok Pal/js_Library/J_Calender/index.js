document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2023-02-07",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    selectable : true,
    selectHelper: true,
    select : function(start,end, allDays){
      console.log(start,end,allDays)
       $("#bookingModal").modal("toggle");
    },




    dateClick: function (info) {
      console.log("a day has been clicked! "+' '+info.dateStr);
    },

    //   events: [
    //     {
    //       title: 'All Day Event',
    //       start: '2023-02-01'
    //     },
    //     {
    //       title: 'Long Event',
    //       start: '2023-02-07',
    //       end: '2023-02-10'
    //     },
    //     {
    //       groupId: '999',
    //       title: 'Repeating Event',
    //       start: '2023-02-09T16:00:00'
    //     },
    //     {
    //       groupId: '999',
    //       title: 'Repeating Event',
    //       start: '2023-02-16T16:00:00'
    //     },
    //     {
    //       title: 'Conference',
    //       start: '2023-02-11',
    //       end: '2023-02-13'
    //     },
    //     {
    //       title: 'Meeting',
    //       start: '2023-02-12T10:30:00',
    //       end: '2023-02-12T12:30:00'
    //     },
    //     {
    //       title: 'Lunch',
    //       start: '2023-02-12T12:00:00'
    //     },
    //     {
    //       title: 'Meeting',
    //       start: '2023-02-12T14:30:00'
    //     },
    //     {
    //       title: 'Birthday Party',
    //       start: '2023-02-13T07:00:00'
    //     },
    //     {
    //       title: 'Click for Google',
    //       url: 'http://google.com/',
    //       start: '2023-02-28'
    //     }
    //   ]
  });

  calendar.render();
});
