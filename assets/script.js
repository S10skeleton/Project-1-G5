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


// function saveButton() {
//     // const saveButton = document.getElementById("saveButton")
//     const textInput = document.getElementById("textInput10").value
//     console.log(textInput)
// // saveButton.addEventListener('click', function(event) {
// //     event.preventDefault();
//     localStorage.setItem('savedText', textInput)
// // })
// }

// $(".saveButton").click(function (event) {
//     event.preventDefault();
//     var value = $(this).siblings(".description").val();
//     var time = $(this).parent().attr("id").split("-")[1];
//     localStorage.setItem(time, value);
// });



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
    document.querySelector("eight").value = "";
    document.querySelector("nine").value = "";
    document.querySelector("ten").value = "";
    document.querySelector("eleven").value = "";
    document.querySelector("twelve").value = "";
    document.querySelector("one").value = "";
    document.querySelector("two").value = "";
    document.querySelector("three").value = "";
    document.querySelector("four").value = "";
    document.querySelector("five").value = "";
    document.querySelector("#six").value = "";
    document.querySelector("#seven").value = "";
}

// document.getElementById('clearButton').addEventListener('click', clearLocalStorage);
// querySelectorAll text input class loop thru new array add eventListener which is saveButton() 