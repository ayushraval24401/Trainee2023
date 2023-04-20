$(document).ready(function() {

    // Populate country dropdown on page load
    $.getJSON('Countries.json', function(data) {
      $.each(data.countries, function(key, value) {
        $('#country').append('<option value="' + value.id + '">' + value.name + '</option>');
      });
    });
  
    // Populate state dropdown when a country is selected
    $('#country').on('change', function() {
      var countryID = $(this).val();
      if (countryID) {
        $.ajax({
          type: "GET",
          url: "States.json",
          data: {
            country: countryID
          },
          dataType: "json",
          success: function(data) {
            $('#state').empty();
            $('#state').append('<option value="">Select State</option>');
            $.each(data.states, function(key, value) {
                if(countryID==value.country_id){
              $('#state').append('<option value="' + value.id + '">' + value.name + '</option>');}
            });
          }
        });
      } else {
        $('#state').empty();
        $('#state').append('<option value="">Select State</option>');
        $('#city').empty();
        $('#city').append('<option value="">Select City</option>');
      }
    });
  
    // Populate city dropdown when a state is selected
    $('#state').on('change', function() {
      var stateID = $(this).val();
      if (stateID) {
        $.ajax({
          type: "GET",
          url: "Cities.json",
          data: {
            state: stateID
          },
          dataType: "json",
          success: function(data) {
            $('#city').empty();
            $('#city').append('<option value="">Select City</option>');
            $.each(data.cities, function(key, value) {
                if(stateID==value.state_id)
                {
              $('#city').append('<option value="' + value.id + '">' + value.name + '</option>');
                }
            });
          }
        });
      } else {
        $('#city').empty();
        $('#city').append('<option value="">Select City</option>');
      }
    });
  
  });
  