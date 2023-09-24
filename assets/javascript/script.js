var APIKey = 'b0a0ca6ea1dc0c023840ac1209a28957';

var searchBarEl = document.querySelector('#search-bar');
var searchBtnEl = document.querySelector('#search-btn');
var forecastEl = document.querySelector('#forecast');
var tempEl = document.querySelector('#forecast-temp');
var windEl = document.querySelector('#forecast-wind');
var humidityEl = document.querySelector('#forecast-humidity');
var fiveDayEl = document.querySelector('.cards');
var savedListEl = document.querySelector('#saved-list')

cityStorage();

function currentWeather(city) {
    var catURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + '&units=imperial';


    fetch(catURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var weatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
            var imageHTML = `<img src="${weatherIcon}" alt="weather icon" width="40" height="46">`
            console.log(data);
            var cityName = data.name;
            var cityTemp = data.main.temp;
            var cityWind = data.wind.speed;
            var cityHumidity = data.main.humidity;
            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            tempEl.textContent = 'Temp: ' + Math.floor(cityTemp) + ' °F';
            forecastEl.innerHTML = cityName + ' ' + dayjs().format('M/D/YYYY') + ' ' + imageHTML;
            windEl.textContent = 'Wind: ' + Math.floor(cityWind) + ' MPH';
            humidityEl.textContent = 'Humidity: ' + Math.floor(cityHumidity) + ' %';
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${APIKey}`)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    fiveDayEl.innerHTML = '';
                    for (var i = 0; i < data.list.length; i = i + 8) {
                        console.log(data.list[i]);
                        var card1 = document.createElement('h5');
                        var card2 = document.createElement('p');
                        var card3 = document.createElement('p')
                        var card4 = document.createElement('p')
                        var weatherIcon2 = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
                        var imageHTML2 = `<img src="${weatherIcon2}" alt="weather icon" width="40" height="46">`
                        card1.setAttribute('class', 'col-2 card');
                        card1.innerHTML = dayjs(data.list[i + 1].dt_txt).format('M/D/YYYY') + imageHTML2;
                        card2.textContent = 'temp: ' + data.list[i].main.temp + ' °F';
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


function cityStorage() {
    savedListEl.innerHTML = '';
    var cities = JSON.parse(localStorage.getItem('cities'));
    if (cities)
        for (var i = 0; i < cities.length; i++) {
            var recentSearches = document.createElement('button')
            var cityWords = cities[i].split(' ');
            for (var j = 0; j < cityWords.length; j++) {
                cityWords[j] = cityWords[j].charAt(0).toUpperCase() + cityWords[j].slice(1);
            }
            recentSearches.textContent = cityWords.join(' ')
            recentSearches.setAttribute('class', 'btn btn-secondary col-12 my-1');
            savedListEl.appendChild(recentSearches);
        }
}


searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();
    city = searchBarEl.value;
    currentWeather(city);
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    city = city.toLowerCase();
    if (city === '') {
        return;
    } else
        if (!cities.includes(city)) {
            cities.push(city);
            localStorage.setItem('cities', JSON.stringify(cities));
        }

    localStorage.setItem('city', city);
    cityStorage();
});



savedListEl.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        var cityName = event.target.textContent;
        currentWeather(cityName);
    }
});
