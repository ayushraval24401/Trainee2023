$(document).ready(function () {
    load_json_data('country');
    function load_json_data(id) {
        var html_code = '';
        $.getJSON('Countries.json', function (data) {
            debugger
            html_code += '<option value="">Select ' + id + '</option>';

            console.log(data);
            $.each(data.countries, function (key, value) {
                html_code += '<option value="' + value.id + '">' + value.name + '</option>';
            });
            $('#' + id).html(html_code);
        });

    }

    $(document).on('change', '#country', function () {
        var countryId = $(this).val();
        var html_code = '';
        $.getJSON('States.json', function (data) {
            html_code += '<option value="">Select State ' + '</option>';
            $.each(data.states, function (key, value) {
                debugger
                if (countryId == value.country_id) {
                    debugger
                    html_code += '<option value="' + value.id + '">' + value.name + '</option>';
                    $('#city').html('<option value="">Select City</option>');
                }
            });
            $('#state').html(html_code);
        });
    });

    $(document).on('change', '#state', function () {
        var stateId = $(this).val();
        var html_code = '';
        $.getJSON('Cities.json', function (data) {
            html_code += '<option value="">Select City ' + '</option>';
            $.each(data.cities, function (key, value) {
                debugger
                if (stateId == value.state_id) {
                    debugger
                    html_code += '<option value="' + value.id + '">' + value.name + '</option>';

                }
            });
            $('#city').html(html_code);
        });
    });
});