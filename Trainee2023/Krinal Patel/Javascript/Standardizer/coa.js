$(document).ready(function () {
  draggable();
    // var ml = $("#mostlikely").textContent;
  //  var ml= document.getElementsByClassName('destinations');
  let lis = document.getElementById('mostlikely').innerHTML;

  var currentDateTime = new Date();
  var formattedDateTime = currentDateTime.toLocaleString();
  document.getElementById("lastupdated").innerHTML = "Last Updated on " + formattedDateTime;
  //  var test = ml(li)
  // console.log(lis.
  //   );
});

// Filter mapping
const buttons = document.querySelectorAll('.destination_source');
const links = document.querySelectorAll('.destination-nav a');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    button.classList.add('active');
    const btnType = button.getAttribute('data-active-type');
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-active-type') === btnType) {
        link.classList.add('active');
        if (link.classList.contains('active')) {
          link.click();
          link.scrollIntoView({
            // behavior: "smooth",
            block: "end",
            inline: "end"
          });
        }
      }
    });

  });
});
// Destination Data Get
const destinationdata = new XMLHttpRequest();
destinationdata.open("GET", "MasterChartOfAcounts.csv", false);

var masterChartAccountDataString;
var masterChartAccountObject;
var masterChartAccountData = [];
destinationdata.onreadystatechange = function () {
  if (destinationdata.readyState === XMLHttpRequest.DONE && destinationdata.status === 200) {
    const csv = destinationdata.responseText;

    const rows = csv.split("\n");
    const headers = rows[0].split(",");

    masterChartAccountData = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = row[j];
      }
      masterChartAccountData.push(obj);
    }

    masterChartAccountDataString = JSON.stringify(masterChartAccountData);
    masterChartAccountObject = JSON.parse(masterChartAccountDataString);
  }
};
destinationdata.send();

var destinationData = JSON.parse(masterChartAccountDataString);
const parentElement = document.getElementById('destination');

destinationData.forEach((item) => {
  var liElement = document.createElement('li');
  liElement.innerHTML = `⠿ ${item.AccountCode} ${'--'} ${item.AccountName}`;
  liElement.classList.add('list-group-item')
  parentElement.appendChild(liElement);
});

//Source data get
var sourcedata = new XMLHttpRequest();
sourcedata.open("GET", "StandardCofA.csv", false);

var standardcofstring;
var standardcofobject;
var standardcofData = [];
sourcedata.onreadystatechange = function () {
  if (sourcedata.readyState === XMLHttpRequest.DONE && sourcedata.status === 200) {
    const csv = sourcedata.responseText;

    const rows = csv.split("\n");
    const headers = rows[0].split(",");

    standardcofData = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = row[j];
      }
      standardcofData.push(obj);
    }

    standardcofstring = JSON.stringify(standardcofData);
    standardcofobject = JSON.parse(standardcofstring);
  }
};
sourcedata.send();
var sourcedata = JSON.parse(standardcofstring);
const parent = document.getElementById('source');

sourcedata.forEach((item) => {

  if (item.Number != "") {

    $("#source").append("<li id='number_" + item.Number + "' class='list-group-item'>" + item.Number + " -- " + item.Name + "<i class='material-icons float-end'>done_all history</i></li>");

    $("#mostlikely").append("<li id='mostlikely_" + item.Number + "'<li class='list-group-item destinations mostlikely_list'</li>");
    $("#likely").append("<li id='likely_" + item.Number + "' class='list-group-item  destinations likely_list'>");
    $("#possible").append("<li id='possible_" + item.Number + "' class='list-group-item  destinations possible_list'>");

  }
});


$( document ).ready(function() {
  getAccountData()
});


//Filtering with Button 

$('.btn-check').click(function () {

  var button = $(this).data("type");
  var mostlikely = $("#mostlikely");
  var likely = $("#likely");
  var possible = $("#possible");

  $("#source li").hide();
  mostlikely.find("li").hide();
  likely.find("li").hide();
  possible.find("li").hide();

  sourcedata.forEach((item) => {

    if (item.Type == button) {
      if (item.Number != "") {

        $("#number_" + item.Number).show();
        $("#mostlikely_" + item.Number).show();
        $("#likely_" + item.Number).show();
        $("#possible_" + item.Number).show();
      }
    }
  });
 
});

//Destination Filter
$('a').click(function () {
  var button = $(this).data("type");
  $("a").removeClass("active"); //Remove active class of the button upside
  $(this).addClass("active"); //Add active class of the button in destination navbar
  
  document.getElementById('destination').innerHTML = ""

  destinationData.forEach((item) => {
    if (item.AccountTypeName == button) {
      var liElement = document.createElement('li');
      liElement.textContent = `⠿ ${item.AccountCode} ${'--'} ${item.AccountName}`;
      liElement.classList.add('list-group-item')
      parentElement.appendChild(liElement);
    }

    
  });
});

//Destination All Filter
$('#all').click(function () {
  destinationData.forEach((item) => {
    var liElement = document.createElement('li');
    liElement.textContent = `⠿ ${item.AccountCode} ${'--'} ${item.AccountName}`;
    liElement.classList.add('list-group-item')
    parentElement.appendChild(liElement);
    // } 
  });
});

// Search functionality
$("#search").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#destination li").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});
$('#search').on('search', function () {
  if ($(this).val() === '') {
    $('#destination li').show();
  }
});

// Drag and Drop using Sortable JS
function draggable() {
  $(".destinations").each(function () {
    new Sortable(this, {
      group: "shared",
      animation: 150,
    });
  });

  var destinationacc = document.getElementById("destination")

  new Sortable(destinationacc, {
    group: {
      name: "shared",
      pull: "clone",
      put: false,
    },
    animation: 150,
    sort: false,
  });

  $(".mostlikely_list").each(function () {
    new Sortable(this, {
      group: "shared",
      put: false,
      animation: 150,
      onAdd: function (evt) {

        console.log(evt);
        evt.item.classList = "sort";
        var master = evt.item.parentNode;
        if (master.children.length > 1) {
         
          var old_data = master.children[0];
          var new_data = master.children[1];

          if(old_data.textContent.trim()==new_data.textContent.trim()){

            swal(
              'Account is already existing',
              'You dropped a already existing Account!',
              'warning'
            )
          }
          else{

          var destination = master.getAttribute("id").substring(master.getAttribute("id").indexOf('_'));
          var possible = document.getElementById("possible" + destination);
          var likely = document.getElementById("likely" + destination);

          if (likely.children.length == 0) 
          {
            likely.appendChild(new_data);
          } 
          else if (likely.children.length == 1) {
              
              likely.appendChild(new_data);
            if (possible.children.length == 0) {
              var newchildlikely = likely.children[0];
              possible.appendChild(newchildlikely);
            }
            else if (possible.children.length == 1) {
              possible.children[0].remove();
              var newchildlikely = likely.children[0];
              possible.appendChild(newchildlikely);
            }
          }
        }
        }
      }
    });
  });

  $(".likely_list").each(function () {
    new Sortable(this, {
      group: "shared",
      animation: 150,
      onAdd: function (evt) {
        evt.item.classList = "sort";
        var master = evt.item.parentNode;
        if (master.children.length > 1) {
          var new_data = master.children[1];
          var old_data = master.children[0];

          if(old_data.textContent.trim()==new_data.textContent.trim()){
            swal(
              'Account is already existing',
              'You dropped a already existing Account!',
              'warning'
            )
          }
          else{
          var destination = master.getAttribute("id").substring(master.getAttribute("id").indexOf('_'));
          var possible = document.getElementById("possible" + destination);

          if (possible.children.length == 0) {
            possible.appendChild(new_data);
          } else if (possible.children.length == 1) {
            possible.appendChild(new_data);
            var possiblechild = possible.children[0];
            possiblechild.remove();
          }        
        }}
      }
      });
  });
  
  $(".possible_list").each(function () {
    new Sortable(this, {
      group: "shared",
      animation: 150,
      onAdd: function (evt) {
        evt.item.classList = "sort";
        var master = evt.item.parentNode;
        if (master.children.length > 1) {
          
          master.children[1].remove();
        }
      }
      });
  });



}

//Submit Functionality
function submit() {
  var AccountDetails = new Array;
  var currentDateTime = new Date();
  var formattedDateTime = currentDateTime.toLocaleString();
  document.getElementById("lastupdated").innerHTML = "Last Updated on " + formattedDateTime;

standardcofData.forEach((li) => {

    let AccountData = {
      Id: li.Number,
      mostlikely: $(`#mostlikely_${li.Number}`).html(),
      likely: $(`#likely_${li.Number}`).html(),
      possible: $(`#possible_${li.Number}`).html(),

      standardcofData: standardcofData
    };
    AccountDetails.push(AccountData);
    localStorage.setItem("AccountDetails", JSON.stringify(AccountDetails));

  })
}

function getAccountData(){

  var getAccountData = localStorage.getItem("AccountDetails");
  let getAccountDetails = JSON.parse(getAccountData);
  if(getAccountDetails){
    getAccountDetails.forEach(li =>{
              
        $(`#mostlikely_${li.Id}`).html(li.mostlikely);
        $(`#likely_${li.Id}`).html(li.likely);
        $(`#possible_${li.Id}`).html(li.possible);

    })
  }
}

//Destination Scrolling bar

const navScroller = function ({
  wrapperSelector: wrapperSelector = '.nav-scroller-wrapper',
  selector: selector = '.nav-scroller',
  contentSelector: contentSelector = '.nav-scroller-content',
  buttonLeftSelector: buttonLeftSelector = '.nav-scroller-btn--left',
  buttonRightSelector: buttonRightSelector = '.nav-scroller-btn--right',
  scrollStep: scrollStep = 75
} = {}) {

  let scrolling = false;
  let scrollingDirection = '';
  let scrollOverflow = '';
  let timeout;

  let navScrollerWrapper;

  if (wrapperSelector.nodeType === 1) {
    navScrollerWrapper = wrapperSelector;
  } else {
    navScrollerWrapper = document.querySelector(wrapperSelector);
  }
  if (navScrollerWrapper === undefined || navScrollerWrapper === null) return;

  let navScroller = navScrollerWrapper.querySelector(selector);
  let navScrollerContent = navScrollerWrapper.querySelector(contentSelector);
  let navScrollerLeft = navScrollerWrapper.querySelector(buttonLeftSelector);
  let navScrollerRight = navScrollerWrapper.querySelector(buttonRightSelector);

  // Sets overflow
  const setOverflow = function () {
    scrollOverflow = getOverflow(navScrollerContent, navScroller);
    toggleButtons(scrollOverflow);
  }
  // Debounce setting the overflow with requestAnimationFrame
  const requestSetOverflow = function () {
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => {
      setOverflow();
    });
  }
  // Get overflow value on scroller
  const getOverflow = function (content, container) {
    let containerMetrics = container.getBoundingClientRect();
    let containerWidth = containerMetrics.width;
    let containerMetricsLeft = Math.floor(containerMetrics.left);
    let contentMetrics = content.getBoundingClientRect();
    let contentMetricsRight = Math.floor(contentMetrics.right);
    let contentMetricsLeft = Math.floor(contentMetrics.left);
    // Offset the values by the left value of the container
    let offset = containerMetricsLeft;
    containerMetricsLeft -= offset;
    contentMetricsRight -= offset + 1; // Due to an off by one bug in iOS
    contentMetricsLeft -= offset;

    if (containerMetricsLeft > contentMetricsLeft && containerWidth < contentMetricsRight) {
      return 'both';
    } else if (contentMetricsLeft < containerMetricsLeft) {
      return 'left';
    } else if (contentMetricsRight > containerWidth) {
      return 'right';
    } else {
      return 'none';
    }
  }
  // Move the scroller with a transform
  const moveScroller = function (direction) {
    if (scrolling === true) return;

    setOverflow();

    let scrollDistance = scrollStep;
    let scrollAvailable;


    if (scrollOverflow === direction || scrollOverflow === 'both') {

      if (direction === 'left') {
        scrollAvailable = navScroller.scrollLeft;
      }

      if (direction === 'right') {
        let navScrollerRightEdge = navScroller.getBoundingClientRect().right;
        let navScrollerContentRightEdge = navScrollerContent.getBoundingClientRect().right;

        scrollAvailable = Math.floor(navScrollerContentRightEdge - navScrollerRightEdge);
      }

      // If there is less that 1.5 steps available then scroll the full way
      if (scrollAvailable < (scrollStep * 1.5)) {
        scrollDistance = scrollAvailable;
      }

      if (direction === 'right') {
        scrollDistance *= -1;
      }

      navScrollerContent.classList.remove('no-transition');
      navScrollerContent.style.transform = 'translateX(' + scrollDistance + 'px)';

      scrollingDirection = direction;
      scrolling = true;
    }

  }
  // Set the scroller position and removes transform, called after moveScroller()
  const setScrollerPosition = function () {
    var style = window.getComputedStyle(navScrollerContent, null);
    var transform = style.getPropertyValue('transform');
    var transformValue = Math.abs(parseInt(transform.split(',')[4]) || 0);

    if (scrollingDirection === 'left') {
      transformValue *= -1;
    }

    navScrollerContent.classList.add('no-transition');
    navScrollerContent.style.transform = '';
    navScroller.scrollLeft = navScroller.scrollLeft + transformValue;
    navScrollerContent.classList.remove('no-transition');

    scrolling = false;
  }
  // Toggle buttons depending on overflow
  const toggleButtons = function (overflow) {
    navScrollerLeft.classList.remove('active');
    navScrollerRight.classList.remove('active');

    if (overflow === 'both' || overflow === 'left') {
      navScrollerLeft.classList.add('active');
    }

    if (overflow === 'both' || overflow === 'right') {
      navScrollerRight.classList.add('active');
    }
  }
  const init = function () {

    // Determine scroll overflow
    setOverflow();

    // Scroll listener
    navScroller.addEventListener('scroll', () => {
      requestSetOverflow();
    });

    // Resize listener
    window.addEventListener('resize', () => {
      requestSetOverflow();
    });

    // Button listeners
    navScrollerLeft.addEventListener('click', () => {
      moveScroller('left');
    });

    navScrollerRight.addEventListener('click', () => {
      moveScroller('right');
    });

    // Set scroller position
    navScrollerContent.addEventListener('transitionend', () => {
      setScrollerPosition();
    });

  };
  // Init is called by default
  init();
  // Reveal API
  return {
    init
  };
};
const navScrollerTest = navScroller();


