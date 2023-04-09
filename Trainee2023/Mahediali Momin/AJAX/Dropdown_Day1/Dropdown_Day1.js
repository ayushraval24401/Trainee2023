$(document).ready(function(){
  $.getJSON('Countries.json',function(data){
    var countryOptions;
    $.each(data.countries, function(i,country)
    {
     countryOptions+="<option value='"+country.id+"'>"+country.name+"</option>";
    });
    $("#countryDropDownList").html(countryOptions)
  })


  $("#countryDropDownList").change(function(){
    var selectedC = $(this).val();
    $.getJSON('States.json',function(data){
      var stateOptions;
      $.each(data.states, function(i,state){
        if(selectedC==state.country_id)
        {
          stateOptions+="<option value='"+state.id+"'>"+state.name+"</option>";
          $('#cityDropDownList').html('<option value="">Select City</option>');
        }
      });
      $("#stateDropDownList").html(stateOptions)
    })
  })


  $("#stateDropDownList").change(function(){
    var selectedC = $(this).val();
    $.getJSON('Cities.json',function(data){
      var cityOptions;
      $.each(data.cities, function(i,city){
        if(selectedC==city.state_id)
        {
          cityOptions+="<option value='"+city.id+"'>"+city.name+"</option>";
        }
      });
      $("#cityDropDownList").html(cityOptions)
    })
  })

  });