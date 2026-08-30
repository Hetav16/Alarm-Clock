let time = document.getElementById('time');
let alarmTime = document.getElementById('alarmTime');
let alarmSound = document.getElementById('alarmSound');
let clockBody = document.getElementById('clockBody');
let isRinging = false; // Flag to prevent triggering play() repeatedly

function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    minutes = formatTime(minutes);
    seconds = formatTime(seconds);

    // Added span tags around the colons for the blinking animation
    time.innerHTML = hours + '<span class="colon">:</span>' + minutes + '<span class="colon">:</span>' + seconds;

    // Check the alarm every second
    checkAlarm();

    setTimeout(updateTime, 1000);
}

function formatTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function checkAlarm() {
    // If no alarm is set, do nothing
    if (!alarmTime.value) return;

    let now = new Date();
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();

    let alarmHours = parseInt(alarmTime.value.split(':')[0]);
    let alarmMinutes = parseInt(alarmTime.value.split(':')[1]);

    // Trigger the alarm if times match and it isn't already ringing
    if (currentHours === alarmHours && currentMinutes === alarmMinutes) {
        if (!isRinging) {
            alarmSound.play();
            clockBody.classList.add('ringing'); // Triggers the CSS shake/pulse animation
            isRinging = true;
        }
    } else {
        // Automatically reset the ringing flag once the minute passes
        isRinging = false; 
    }
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset the audio to the beginning
    clockBody.classList.remove('ringing'); // Stop the animations
    
    // Clear the input so it doesn't immediately ring again
    alarmTime.value = ""; 
    isRinging = false;
}