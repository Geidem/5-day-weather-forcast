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

searchForm.addEventListener('submit' , function(event) {
    event.preventDefault();

    var cityName = searchInput.ariaValueMax.trim();
    if (cityName !== '') {
        getWeatherdata(cityName);
    }
    searchInput.value = '';
});


