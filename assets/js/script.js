var searchForm = document.querySelector('#search-form');
var city = document.querySelector('#city-name');
var date = document.querySelector('date');
var weatherIcon = document.querySelector('#weather-icon');
var temperature =  document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');
var forecastContainer = document.querySelector('#5-day-forecast');

var apiUrl = 'https://api.openweathermap.org/data/2.5/';
var apiKey = 'fe74c2ee80a2a10c992d91b08ea27c27'

//event listener to search from form information