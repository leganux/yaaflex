const Base_URL = './../cdn/assets/catalogs/';
const countries = Base_URL + 'countries.json';
const states = Base_URL + 'states.json';
const cities = Base_URL + 'cities.json';
const Base_Save = '/api/cat/'

//addCountry

var JSONOPPERATE = {};


$(document).ready(function () {

    $('#load_countries_').click(function () {
        $.getJSON(countries, {}, function (data) {
            JSONOPPERATE = data;
            opperate('addCountry');
        });
    });
    $('#load_states_').click(function () {
        $.getJSON(states, {}, function (data) {
            JSONOPPERATE = data;
            opperate('addState');
        });

    });
    $('#load_cities_').click(function () {
        $.getJSON(cities, {}, function (data) {
            JSONOPPERATE = data;
            opperate('addCity');
        });

    });



});

var opperate = function (cName) {
    setTimeout(function () {
        if (JSONOPPERATE.length > 0) {
            data = JSONOPPERATE.pop()
            $.post(Base_Save + cName, data, function (data) {

                opperate(cName);
            });
        } else {
            alert('Proceso finalizado')
        }
    }, 100)

}
