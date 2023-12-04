const youtubeAPIKey = 'AIzaSyDyL-p1U0ANtwm1RScCBDvqFFkwXbfPZl0';

function searchYoutube() {
    const searchButton = document.getElementById('searchInput').value;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchButton}&key=${youtubeAPIKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const videoId = data.items[0].id.videoId;
            embedVideoPlayer(videoId);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function embedVideoPlayer(videoId) {
    const playerDiv = document.getElementById('player');
    playerDiv.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
}



function updateCurrentTime() {
    var currentTime = dayjs().format('MMM D, YYYY h:mm:ss a')
    $('#currentDay').text(currentTime)
}
setInterval(updateCurrentTime, 1000);

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
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`
    )
      .then((response) => {
        return response.json();
      })
  
      .then((data) => {
        //destructured variables
        var { temp, feels_like } = data.main;
        var place = data.name;
        var { description, icon } = data.weather[0];
        var { sunrise, sunset } = data.sys;
  
        var iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  
        var sunriseGMT = new Date(sunrise * 1000);
        var sunsetGMT = new Date(sunset * 1000);
  
        conditionIcon.src = iconUrl;
        currentTemp.textContent = `Current Temp: ${Math.round(temp)} °F`;
        feelsLike.textContent = `Feels Like: ${Math.round(feels_like)} °F`;
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



$(document).ready(function () {
    $(".saveButton").click(function (event) {
        var value = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");
        event.preventDefault();
        localStorage.setItem(time, value);

        console.log(value)
        console.log(time)
    })
})



function init() {
    $("#hour-08 textarea").val(localStorage.getItem('hour-08'));
    $("#hour-09 textarea").val(localStorage.getItem('hour-09'));
    $("#hour-10 textarea").val(localStorage.getItem('hour-10'));
    $("#hour-11 textarea").val(localStorage.getItem('hour-11'));
    $("#hour-12 textarea").val(localStorage.getItem('hour-12'));
    $("#hour-13 textarea").val(localStorage.getItem('hour-13'));
    $("#hour-14 textarea").val(localStorage.getItem('hour-14'));
    $("#hour-15 textarea").val(localStorage.getItem('hour-15'));
    $("#hour-16 textarea").val(localStorage.getItem('hour-16'));
    $("#hour-17 textarea").val(localStorage.getItem('hour-17'));
    $("#hour-18 textarea").val(localStorage.getItem('hour-18'));
    $("#hour-19 textarea").val(localStorage.getItem('hour-19'));
}

init();

function clearLocalStorage() {
    localStorage.clear();
    document.querySelector("#eight").value = " ";
    document.querySelector("#nine").value = " ";
    document.querySelector("#ten").value = " ";
    document.querySelector("#eleven").value = " ";
    document.querySelector("#twelve").value = " ";
    document.querySelector("#one").value = " ";
    document.querySelector("#two").value = " ";
    document.querySelector("#three").value = " ";
    document.querySelector("#four").value = " ";
    document.querySelector("#five").value = " ";
    document.querySelector("#six").value = " ";
    document.querySelector("#seven").value = " ";
}

// document.getElementById('clearButton').addEventListener('click', clearLocalStorage);
// querySelectorAll text input class loop thru new array add eventListener which is saveButton() 

//section for GitHub------------------------------------------------------------
//repository data points of interest
//data for the repositories = [0]
//[0].clone_url data used to get the url
//[0].owner.login data used to get the github username

//variables needed
var gitBtn = document.querySelector(".gitBtn")
var gitUserSearch = document.querySelector("#username")

//add eventlistener
gitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const gitUserRepos = gitUserSearch.value.trim();
  githubRepos(gitUserRepos);
});

//api call function
function githubRepos(gitUserRepos) {
  return fetch(`https://api.github.com/users/${gitUserRepos}/repos`)
    .then(function (response) {
      if (!response.ok) {
        console.log('error: fetch repo failed')
        userNotFound();
        return null;
      }
      return response.json();
    })
    .then(function (repositories) {
      if (repositories) {
        console.log(repositories);
        var gitRepoLists = document.getElementById("gitRepoLists")
        gitRepoLists.innerHTML = '';
        if (repositories.length === 0) {
          userNotFound();
        } else {
          //add for loop to create the list of repositories into the html bellow.
          for (let i = 0; i < repositories.length; i++) {
            var getGitRepos = repositories[i].clone_url;
            var gitName = repositories[i].owner.login
            var repoListing = document.createElement('div');
            repoListing.classList.add('gitRepoCss'); //Use this class to change the CSS if needed// the repos were generated through JavaS to html page
            repoListing.innerHTML = `<p>${gitName}:  <a href="${getGitRepos}" target="_blank">${getGitRepos}</a></p>`;
            gitRepoLists.appendChild(repoListing);

          }
        }
      }
    })
    .then(null, function (error) {
      console.log('did not fetch repos', error.message);
      return null;
    });
}

function userNotFound() {
  var gitRepoLists = document.getElementById('gitRepoLists');
  gitRepoLists.innerHTML = '<p>User not found</p>';
}


function updateBackgroundImage() {
  const now = new Date();
  const hour = now.getHours();
  let backgroundImage = '';

  if (hour >= 0 && hour < 3) {
      backgroundImage = 'url(assets/Images/nighttime.png)';
  } else if (hour >= 3 && hour < 6) {
      backgroundImage = 'url(assets/Images/nighttime.png)';
  } else if (hour >= 6 && hour < 9) {
      backgroundImage = 'url(assets/Images/illustration sunrise.png)';
  } else if (hour >= 9 && hour < 12) {
      backgroundImage = 'url(assets/Images/lateMorning.png)';
  } else if (hour >= 12 && hour < 15) {
      backgroundImage = 'url(assets/Images/midDay.png)';
  } else if (hour >= 15 && hour < 18) {
      backgroundImage = 'url(assets/Images/afternoon.png)';
  } else if (hour >= 18 && hour < 21) {
      backgroundImage = 'url(assets/Images/nighttime.png)';
  } else {
      backgroundImage = 'url(assets/Images/nighttime.png)';
  }

  document.body.style.backgroundImage = backgroundImage;
}

// Call the function to set the initial background
updateBackgroundImage();

setInterval(updateBackgroundImage, 3600000);

//end of GitHub section --------------------------------------------------------------