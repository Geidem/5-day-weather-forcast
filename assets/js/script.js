var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('city-input');
var searchHistory = document.getElementById('search-history-list');
var currentWeather = document.getElementById('current-weather-info');
var forecast = document.getElementById('5-day-forecast')


var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
var apiKey = 'fe74c2ee80a2a10c992d91b08ea27c27';

var searchHistoryData = JSON.parse(localStorage.getItem('searchHistoryData')) || [];

if (searchHistoryData.length > 0) {
    renderSearchHistory();
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var cityName = searchInput.value.trim();
    if (cityName !== '') {
        getWeatherdata(cityName);
    }
    searchInput.value = '';
});

//Get weather data for a city and add to UI
function getWeatherdata(cityName) {
    var apiUrlParams = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(apiUrlParams)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            addToSearchHistory(cityName);
            renderCurrentWeather(data);
            renderForecast(data);
        })
        .catch(function (error) {
            console.error(error);
        });
}

//Adding to history and local storage
function addToSearchHistory(cityName) {
    if (searchHistoryData.indexOf(cityName) === -1) {
        searchHistoryData.push(cityName);

        localStorage.setItem('searchHistoryData', JSON.stringify(searchHistoryData));
        renderSearchHistory();
    }
}

// Rendering search history list
function renderSearchHistory() {
    searchHistory.innerHTML = '';
    for (var i = 0; i < searchHistoryData.length; i++) {
        var li = document.createElement('li');
        li.textContent = searchHistoryData[i];
        li.addEventListener('click', function (event) {
            var cityName = event.target.textContent;
            getWeatherdata(cityName)
        });
        searchHistory.appendChild(li);
    }
}

// current weather
function renderCurrentWeather(data) {
    var cityName = data.city.name;
    var date = new Date(data.list[0].dt_txt);
    var icon = data.list[0].weather[0].icon;
    var temperature = data.list[0].main.temp.toFixed(1) + 'F';
    var humidity = data.list[0].main.humidity + '%';
    var windSpeed = data.list[0].wind.speed.toFixed(1) + 'mph';

    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute(
      "src",
      "https://openweathermap.org/img/w/" + icon + ".png"
    );
    weatherIcon.setAttribute("alt", data.list[0].weather[0].description);
    weatherIcon.setAttribute("id", "weather-icon");
  
    currentWeather.innerHTML = `
      <h3 id="city-name">${cityName}</h3>
      <h3 id="date">${date}</h3>
    `;
    currentWeather.appendChild(weatherIcon);
    currentWeather.innerHTML += `
      <p id="temperature">${"temperature: " + temperature}</p>
      <p id="humidity">${"Humidity;  " + humidity}</p>
      <p id="wind-speed">${"wind speed;  " + windSpeed}</p>
    `;
  }

    function renderForecast(data) {
        // get the forecast data for the next 5 days
        var forecastData = data.list.filter(function (item) {
            return item.dt_txt.includes("12:00:00");
        }).slice(0, 5);

        // loop through each forecast data and populate the UI
        for (var i = 0; i < forecastData.length; i++) {
            var date = new Date(forecastData[i].dt_txt).toLocaleDateString();
            var icon = forecastData[i].weather[0].icon;
            var temp = forecastData[i].main.temp.toFixed(1) + "F";
            var wind = forecastData[i].wind.speed.toFixed(1) + "MPH";
            var humidity = forecastData[i].main.humidity + "%";

            var forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-card")

            forecastCard.innerHTML = `
            <h3 class="forecast-date">${date}</h3>
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather icon" class="forecast-icon">
            <p class="forecast-temp">Temperature: ${temp}</p>
            <p class="forecast-wind">Wind: ${wind}</p>
            <p class="forecast-humidity">Humidity: ${humidity}</p>
          `;
      
          forecast.appendChild(forecastCard);
        }
      }
            

          
            