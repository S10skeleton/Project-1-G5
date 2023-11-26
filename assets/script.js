function updateCurrentTime() {
    var currentTime = dayjs().format('MMM D, YYYY h:mm:ss a')
    $('#currentDay').text(currentTime)
}
setInterval(updateCurrentTime, 1000);


function saveButton() {
    const saveButton = document.getElementById("saveButton")
    const textInput = document.getElementById("textInput")
saveButton.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem(textInput.value)
})}


$("#hour-08").val(localStorage.getItem('08'));
$("#hour-09").val(localStorage.getItem('09'));
$("#hour-10").val(localStorage.getItem('10'));
$("#hour-11").val(localStorage.getItem('11'));
$("#hour-12").val(localStorage.getItem('12'));
$("#hour-13").val(localStorage.getItem('13'));
$("#hour-14").val(localStorage.getItem('14'));
$("#hour-15").val(localStorage.getItem('15'));
$("#hour-16").val(localStorage.getItem('16'));
$("#hour-17").val(localStorage.getItem('17'));
$("#hour-18").val(localStorage.getItem('18'));
$("#hour-19").val(localStorage.getItem('19'));
$("#hour-20").val(localStorage.getItem('20'));
