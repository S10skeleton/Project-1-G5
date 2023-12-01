//global variables
var weatherApiKey = "12231537ac4043736627becc4bfd9203";

//query selectors
var currentWeather = document.querySelector("#current-weather");
var currentCity = document.querySelector("#current-city");
var currentTemp = document.querySelector("#current-temp");
var feelsLike = document.querySelector("#feels-like");
var conditionIcon = document.querySelector("#description-icon");
var weatherDescription = document.querySelector("#weather-description");
var sunRise = document.querySelector("#morning-sun");
var sunSet = document.querySelector("#evening-sun");

var searchButton = document.querySelector("#search-button");

function getCurrentWeather(lat, lon) {
    //using fetch to retrieve data
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`
    )
      .then((response) => {
        return response.json();
      })
  
      .then((data) => {
        console.log(data);
        //destructured variables
        var { temp, feels_like } = data.main;
        var place = data.name;
        console.log(place);
        var { description, icon } = data.weather[0];
        var { sunrise, sunset } = data.sys;
  
        var iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  
        var sunriseGMT = new Date(sunrise * 1000);
        var sunsetGMT = new Date(sunset * 1000);
        console.log(sunriseGMT);
        console.log(sunsetGMT);
  
        conditionIcon.src = iconUrl;
        currentTemp.textContent = `Current Temperature: ${Math.round(temp)} °F`;
        feelsLike.textContent = `Feels like: ${Math.round(feels_like)} °F`;
        currentCity.textContent = `${place}`;
        weatherDescription.textContent = `Conditions: ${description}`;
        sunRise.textContent = `Sunrise: ${sunriseGMT.toLocaleTimeString()}`;
        sunSet.textContent = `Sunset: ${sunsetGMT.toLocaleTimeString()}`;
      });
  }

//load page with current locations weather
window.addEventListener("load", () => {
  var long;
  var lat;

  //attaining users Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat, long);
      getCurrentWeather(lat, long);
    });
}
});

searchButton.addEventListener("click", function () {
  var searchBar = document.querySelector(".search-bar").value;

  geocode(searchBar);
});

// create click event that grabs search-bar value and plugs value into geocode function
function geocode(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherApiKey}&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getCurrentWeather(data[0].lat, data[0].lon);
    });
}
