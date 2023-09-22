var APIKey = 'b0a0ca6ea1dc0c023840ac1209a28957';

var searchBarEl = document.querySelector('#search-bar');
var searchBtnEl = document.querySelector('#search-btn');
var forecastEl = document.querySelector('#forecast');
var tempEl = document.querySelector('#forecast-temp');
var windEl = document.querySelector('#forecast-wind');
var humidityEl = document.querySelector('#forecast-humidity');
var fiveDayEl = document.querySelector('.cards');

function currentWeather(city) {
    var catURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + '&units=imperial';
    fetch(catURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            var cityName = data.name;
            var cityTemp = data.main.temp;
            var cityWind = data.wind.speed;
            var cityHumidity = data.main.humidity;
            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            tempEl.textContent = 'Temp: ' + Math.floor(cityTemp);
            forecastEl.textContent = cityName.toUpperCase() + ' ' + dayjs().format('M/D/YYYY');
            windEl.textContent = 'Wind: ' + Math.floor(cityWind) + ' MPH';
            humidityEl.textContent = 'Humidity: ' + Math.floor(cityHumidity) + ' %';
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${APIKey}`)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    for (var i = 0; i < data.list.length; i = i + 8) {
                    console.log(data.list[i]);
                    var card1 = document.createElement('h5');
                    var card2 = document.createElement('p');
                    var card3 = document.createElement('p')
                    var card4 = document.createElement('p')
                    card1.setAttribute('class', 'col-2 card');
                    card1.textContent = dayjs(data.list[i+1].dt_txt).format('M/D/YYYY');
                    card2.textContent = 'temp: ' + data.list[i].main.temp;
                    card3.textContent = 'Wind: ' + data.list[i].wind.speed;
                    card4.textContent = 'Humidity: ' + Math.floor(data.list[i].main.humidity);
                    console.log(card2);
                    fiveDayEl.appendChild(card1);
                    card1.appendChild(card2);
                    card1.appendChild(card3);
                    card1.appendChild(card4);
                    


                    }
                    
                })
        })
}

searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();
    city = searchBarEl.value;
    currentWeather(city);
    // console.log(city)
});

