$(document).ready(function () {
    var countriesDropdown = $('#countries');

    $.getJSON('Countries.json', function (data) {
        // Do something with the data
        console.log(data);
        console.log(countriesDropdown)

        $.each(data.countries, function (i, country) {
            countriesDropdown.append($('<option>').text(country.name).val(country.id));
        });
    });

    countriesDropdown.on('change', function () {
        var selectedCountryId = $(this).val();
        console.log("Alok", selectedCountryId);

        $.getJSON("States.json", function (StateData) {
            var filteredStates = $.map(StateData.states, function (State) {
                if (selectedCountryId == State.country_id) {
                    return {
                        id: State.id,
                        name: State.name,
                    };
                }
            });
            console.log("aa", filteredStates)

            var stateDropdown = $('#States');
            stateDropdown.empty();
            $.each(filteredStates, function (i, StateData) {
                stateDropdown.append($('<option>').text(StateData.name).val(StateData.id));
            })

            
            stateDropdown.on('change', function () {
                var selectedStateId = $(this).val();

                $.getJSON('Cities.json', function (CityData) {
                    var filteredCities = $.map(CityData.cities, function (City) {
                        if (selectedStateId == City.state_id) {
                            return {
                                id: City.id,
                                name: City.name,
                            }
                        }
                    });

                    var cityDropdown = $("#Cities");
                    cityDropdown.empty();
                    $.each(filteredCities, function (i, CityData) {
                        cityDropdown.append($('<option>').text(CityData.name).val(CityData.id));
                    })
                })
            })
        });
    });
});
