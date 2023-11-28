var weather = {
    "apiKey": "12231537ac4043736627becc4bfd9203",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        },
        displayWeather: function(data) {
            var {name} = data;
            var {icon, description} = data.weather[0];
            console.log(name,icon,description)
            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + "png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = temp + "°F";
        }
}