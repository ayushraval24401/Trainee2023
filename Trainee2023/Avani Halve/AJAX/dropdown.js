$(document).ready(function () {
   var $countrySelect = $("#country");
   var $stateSelect = $("#state");
   var $citySelect = $("#city");

   $.ajax({
      url: "Countries.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
         console.log(data);
         console.log($("#country"));
         $.each(data.countries, function (i, value) {
            $("#country").append($("<option>").text(value.name).val(value.id));
         });
      },
      error: function (xhr, status, error) {
         if (xhr.status === 404) {
            alert("There was a problem with the server.  Try again soon!");
         } else {
            alert("An error occurred while loading the data. Please try again later.");
         }
      },
   });

   $(document).on("change", "#country", function () {
      $.ajax({
         url: "States.json",
         type: "GET",
         dataType: "json",
         success: function (data) {
            var selectedCountryId = $countrySelect.val();
            console.log(selectedCountryId);
            var filteredStates = $.map(data.states, function (state) {
               if (selectedCountryId == state.country_id) {
                  return {
                     id: state.id,
                     name: state.name,
                  };
               }
            });
            console.log(filteredStates);
            $stateSelect.empty();
            $.each(filteredStates, function (i, state) {
               $stateSelect.append($("<option>").text(state.name).val(state.id));
            });
         },
         error: function (xhr, status, error) {
            if (xhr.status === 404) {
               alert("There was a problem with the server.  Try again soon!");
            } else {
               alert("An error occurred while loading the data. Please try again later.");
            }
         },
      });
   });

   $(document).on("change", "#state", function () {
      $.ajax({
         url: "Cities.json",
         type: "GET",
         dataType: "json",
         success: function (data) {
            var cityStateId = $stateSelect.val();
            console.log(cityStateId);
            var filteredCity = $.map(data.cities, function (city) {
               if (cityStateId == city.state_id) {
                  return {
                     id: city.id,
                     name: city.name,
                  };
               }
            });
            console.log(filteredCity);
            $citySelect.empty();
            $.each(filteredCity, function (i, city) {
               $citySelect.append($("<option>").text(city.name).val(city.id));
            });
         },
         error: function (xhr, status, error) {
            if (xhr.status === 404) {
               alert("There was a problem with the server.  Try again soon!");
            } else {
               alert("An error occurred while loading the data. Please try again later.");
            }
         },
      });
   });
});
