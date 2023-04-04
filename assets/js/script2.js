var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('city-input');
var searchHistory = document.getElementById('search-history-list');
var currentWeather = document.getElementById('current-weather-info');
var forecast = document.getElementById('5-day-forecast')

var apiUrl = 'https://api.openweathermap.org/data/2.5/';
var apiKey = 'fe74c2ee80a2a10c992d91b08ea27c27';

var searchHistoryData = JSON.parse(localStorage.getItem('searchHistoryData')) || [];

if (searchHistoryData.length > 0) {
    renderSearchHistory();
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var cityName = searchInput.value.trim();
    if (cityName !== '') {
        getWeatherData(cityName);
    }
    searchInput.value = '';
});

// Get weather data for a city and add to UI
function getWeatherData(cityName) {
    var currentWeatherUrl = `${apiUrl}weather?q=${cityName}&appid=${apiKey}&units=metric`;
    var forecastWeatherUrl = `${apiUrl}forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    Promise.all([fetch(currentWeatherUrl), fetch(forecastWeatherUrl)])
        .then(function (responses) {
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        })
        .then(function (data) {
            addToSearchHistory(cityName);
            renderCurrentWeather(data[0]);
            renderForecast(data[1]);
        })
        .catch(function (error) {
            console.error(error);
        });
}

// Adding to history and local storage
function addToSearchHistory(cityName) {
    if (searchHistoryData.indexOf(cityName) === -1) {
        searchHistoryData.push(cityName);

        localStorage.setItem('searchHistoryData', JSON.stringify(searchHistoryData));
        renderSearchHistory();
    }
}

// Render current weather data
function renderCurrentWeather(data) {
    currentWeather.innerHTML = `
    <h3 id="city-name">${data.name}</h3>
    <h3 id="date">${new Date(data.dt * 1000).toDateString()}</h3>
    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" id="weather-icon">
    <p id="temperature">Temperature: ${data.main.temp} &#8451;</p>
    <p id="humidity">Humidity: ${data.main.humidity}%</p>
    <p id="wind-speed">Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

// Render forecast weather data
function renderForecast(data) {
    var forecastData = data.list.filter(function (item) {
        return item.dt_txt.includes('12:00:00');
    });

    forecast.innerHTML = `
    <div class="forecast-card">
      <h3 class="forecast-date">${new Date(forecastData[0].dt * 1000).toDateString()}</h3>
      <img src="http://openweathermap.org/img/w/${forecastData[0].weather[0].icon}.png" alt="${forecastData[0].weather[0].description}" class="forecast-icon">
      <p class="forecast-temp">Temperature: ${forecastData[0].main.temp} &#8451;</p>
      <p class="forecast-wind">Wind Speed: ${forecastData[0].wind.speed} m/s</p>
      <p class="forecast-humidity">Humidity: ${forecastData[0].humidity}
