//global variables
var weatherApiKey = "12231537ac4043736627becc4bfd9203";

//query selectors
var currentWeather = document.querySelector('#current-weather');
var currentCity = document.querySelector('#current-city');
var currentTemp = document.querySelector('#current-temp');
var conditionIcon = document.querySelector('#description-icon');
var weatherDescription = document.querySelector('#weather-description');
var sunRise = document.querySelector('#morning-sun');
var sunSet = document.querySelector('#evening-sun');

var searchButton = document.querySelector("#search-button")

//load page with current locations weather
window.addEventListener('load', () => {
    var long;
    var lat;

    //attaining users Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

                lat = position.coords.latitude;
                long = position.coords.longitude;

            });
    }

    searchButton.addEventListener("click", function(){
        var searchBar = document.querySelector('.search-bar').value;

        geocode(searchBar)
    })

    // create click event that grabs search-bar value and plugs value into geocode function
    function geocode(city){
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherApiKey}`)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            currentWeather(data[0].lat, data[0].lon)
        })
    }


    function currentWeather(lat, lon){
            //using fetch to retrieve data
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`)
                .then((response) => {
                    return response.json();
                })
                
                .then((data) => {
                    console.log(data)
                    //destructured variables
                    var { temp } = data.main;
                    var  place = data.name;
                    console.log(place)
                    var { description, icon } = data.weather[0];
                    var { sunrise, sunset } = data.sys;

                    var iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                    var sunriseGMT = new Date(sunrise * 1000);
                    var sunsetGMT = new Date(sunset * 1000);
                    console.log(sunriseGMT)
                    console.log(sunsetGMT)

                    conditionIcon.src = iconUrl;
                    currentWeather.textContent = `${temp}`
                    currentCity.textContent = `${place}`;
                    weatherDescription.textContent = `Conditions: ${description}`;
                    sunRise.textContent = `Sunrise: ${sunriseGMT.toLocaleTimeString()}`;
                    sunSet.textContent = `Sunset: ${sunsetGMT.toLocaleTimeString()}`;
                });
            }
            });
// });