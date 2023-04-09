// search
$(document).ready(function(){
  $("#searchid").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#mastertable").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

// navbar for Master account details
$('.toggle').click(function(){
  $('.nav').toggleClass("justify-content-end");
  $('.toggle').toggleClass("text-light");
});



// button change color on click
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  });
});

// destination  account structure
fetch("./MasterChartOfAcounts - Sheet1.csv")
  .then(res => res.text())
  .then(data => {
    const result = data.split(/\r?\n|\r/).map(e => e.split(",")).splice(1);
    const jsonData = [];

    result.forEach(e => {
      const obj = {
        AccountTypeCode: e[0],
        AccountTypeName: e[1],
        SubAccountTypeCode: e[2],
        SubAccountName: e[3],
        AccountCode: e[4],
        AccountName: e[5],
        SpecialtyEmergencyCashBasis: e[6],
        SpecialtyEmergencyAccrualBasis: e[7],
        GeneralPracticeCashBasis: e[8],
        GeneralPracticeAccrualBasis: e[9],
        GPSpecERHybridCashBasis: e[10],
        GPSpecERHybridAccrualBasis: e[11],
        EquineCashBasis: e[12],
        EquineAccuralBasis: e[13]
      };

      jsonData.push(obj);
    });
    console.log(jsonData);
    // Use the jsonData to populate the table

    // let tbody = document.querySelector("#mastertable");

    // jsonData.forEach(e => {
    //   let columns = [e.AccountCode, e.AccountName];
    //   let row = document.createElement("tr");


    //   columns.forEach(col => {
    //     let cell = document.createElement("td");

    //     cell.innerText = col;
    //     row.appendChild(cell);

    //   });

    //   tbody.appendChild(row);

    // });
    jsonData.forEach(e => {
      $("#mastertable").append("<div class='divclass  d-flex'><i class='material-icons'>drag_indicator</i>" + e.AccountCode + "--" + e.AccountName + "</div>");

      $('#mostlikelyid').append("<div class='mostlikelyclass'>"+ " " +"</div>")
      $('#likelyid').append("<div class='likelyclass'>"+ " " +"</div>")
      $('#Possibleid').append("<div class='Possibleclass'>"+ " " +"</div>")
    });
  });



// source  account structure
fetch("./Standard-CofA.csv")
  .then(res => res.text())
  .then(data => {
    const result = data.split(/\r?\n|\r/).map(e => e.split(",")).splice(1);
    const jsonData = [];

    result.forEach(e => {
      const obj = {
        Type: e[0],
        Group: e[1],
        SubGroup: e[2],
        Number: e[3],
        Name: e[4],
        Keywords: e[5],
        Description: e[6]
     
      };

      jsonData.push(obj);
    });
    console.log(jsonData);
    jsonData.forEach(e => {
      $("#SAStable").append("<div class='divclass d-flex justify-content-between'>" + e.Number + " " + e.Name + "<i class='material-icons'>done_all history</i></div>");
    });
  });
