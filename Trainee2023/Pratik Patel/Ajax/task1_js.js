$(document).ready(function(){
    var CountriesData;
    var StateData;
    var CityData;
    
    $.ajax({
        type:'GET',
        url:'Countries.json',
        dataType:'json',
        // async:false,
        success:function(data){
            CountriesData = data;
            for(x in CountriesData.countries ){
        
                var Option = document.createElement("option");
                Option.innerHTML = CountriesData.countries[x].name;
                Option.value  = CountriesData.countries[x].id;
                document.getElementById("country").appendChild(Option);
                
              }
        }
    });
    $.ajax({
        type:'GET',
        url:'Cities.json',
        dataType:'json',
       // async:false,
        success:function(data){
            CityData = data;
        }
    });
    $.ajax({
        type:'GET',
        url:'States.json',
        dataType:'json',
       // async:false,
        success:function(data){
            StateData = data;
        }
    });

    // console.log(CountriesData)
    // console.log(StateData)
    // console.log(CityData)
    
   // var list="<option selected disabled>Choose Country</option>"
//    debugger
//     countriesDropDown = document.getElementById("country");
//    CountriesData.forEach(element => {
//     debugger
//         let option = document.createElement("option");
//         option.setAttribute('value',element.id);
//         console.log("SDv")
      
//         let optionText = document.createTextNode(element.name);
//         option.appendChild(optionText);
      
//         countriesDropDown.appendChild(option);
//    });
        
    
   

    $("#country").change(function () {
        $("#state").html(
          "<option selected disabled>Choose Sate</option>"
        );
        $("#city").html(
            "<option selected disabled>Choose City</option>"
          );
        // const Counrty = StateData.states.filter(
        //   (m) => m.id == $("#country").val()
        // );
        const SelectdCountry=$("#country").val();
       
        for(x in StateData.states ){
            
        if(StateData.states[x].country_id==SelectdCountry){
            var Option = document.createElement("option");
            Option.innerHTML = StateData.states[x].name;
            Option.value  = StateData.states[x].id;
            document.getElementById("state").appendChild(Option);
        }
          }
        
      });

      $("#state").change(function () {
        $("#city").html(
          "<option selected disabled>Choose City</option>"
        );
        // const Counrty = StateData.states.filter(
        //   (m) => m.id == $("#country").val()
        // );
        const SelectdState=$("#state").val();
        console.log(SelectdState)
        for(x in CityData.cities ){
            debugger
        if(CityData.cities[x].state_id==SelectdState){
            var Option = document.createElement("option");
            Option.innerHTML = CityData.cities[x].name;
            Option.value  = CityData.cities[x].id;
            document.getElementById("city").appendChild(Option);
        }
          }
        
      });
  });