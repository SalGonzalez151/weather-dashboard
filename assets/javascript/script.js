var APIKey = 'b0a0ca6ea1dc0c023840ac1209a28957';

var searchBarEl = document.querySelector('#search-bar');
var searchBtnEl = document.querySelector('#search-btn');

function currentWeather(city) {
    var catURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + '&units=imperial';
    fetch(catURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
        })
}

searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();
    city = searchBarEl.value;
    currentWeather(city);
    console.log(city)
});

