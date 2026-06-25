const minutesInput = document.getElementById('minutes');
const startBtn = document.getElementById('startBtn');
const cancelBtn = document.getElementById('cancelBtn');
const countdownEl = document.getElementById('countdown');
const container = document.getElementById('countdown-container');
const presetBtns = document.querySelectorAll('.preset-btn');

function startTimer(mins) {
  if (isNaN(mins) || mins <= 0) {
    alert("Please enter a valid number!");
    return;
  }
  chrome.alarms.create("pauseSpotify", { delayInMinutes: mins });
  minutesInput.value = '';
  updateCountdown();
}

function updateCountdown() {
  chrome.alarms.get("pauseSpotify", (alarm) => {
    if (alarm) {
      const remainingMs = alarm.scheduledTime - Date.now();
      const remainingMinutes = Math.max(0, Math.ceil(remainingMs / 60000));
      countdownEl.innerText = `${remainingMinutes} minutes remaining`;
      container.style.borderLeftColor = remainingMinutes <= 5 ? "#e63946" : "#1DB954";
    } else {
      countdownEl.innerText = "No active timer.";
      container.style.borderLeftColor = "#333";
    }
  });
}

updateCountdown();
setInterval(updateCountdown, 10000);

startBtn.addEventListener('click', () => startTimer(parseFloat(minutesInput.value)));

presetBtns.forEach(btn => {
  btn.addEventListener('click', () => startTimer(parseFloat(btn.getAttribute('data-time'))));
});

cancelBtn.addEventListener('click', () => {
  chrome.alarms.clear("pauseSpotify", () => updateCountdown());
});