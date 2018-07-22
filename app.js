const buttons = document.querySelectorAll('.timer-button');
const displayTime = document.querySelector('.display-time-left');
const quitButton = document.querySelector('.quit-button');
const alarmSound = document.querySelector('.audio');
const displayPomodoros = document.querySelector('.display-pomodoro-count');

let countdown;
let isCounting = false;
let pomodoroCount = (localStorage.getItem('pomodoros') === null) ? 0 : parseInt(localStorage.getItem('pomodoros'));
let itsAPomodoro = false;

displayPomodoros.textContent = `Pomodoros done: ${pomodoroCount}`;

function handleTimers() {
  if (isCounting) {
    if (confirm('Are you sure you want start a new countdown?')) {
      clearInterval(countdown);
    } else return;
  }

  if (parseInt(this.dataset.time) === 5) {
    itsAPomodoro = true;
  } else {
    itsAPomodoro = false;
  }

 

  isCounting = true;
  const seconds = parseInt(this.dataset.time);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(Math.round((then - Date.now()) / 1000));
  countdown = setInterval( function() {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      if (itsAPomodoro) {
        handleDonePomodoro();
        
      }
      alarmSound.play();
      isCounting = false;
      clearInterval(countdown);
      if (confirm('Time is up!')) {
        alarmSound.pause();
      }
      return;
    }
    
    displayTimeLeft(secondsLeft);
  }, 1000);
}


function handleDonePomodoro() {
        console.log('now');
        pomodoroCount ++;
        displayPomodoros.textContent = `Pomodoros done: ${pomodoroCount}`;
        itsAPomodoro = false;
        localStorage.setItem("pomodoros", pomodoroCount.toString());
}

function displayTimeLeft(secsLeft) {
  const minutes = Math.floor(secsLeft / 60);
  const seconds = secsLeft % 60
  console.log({minutes, seconds});
  const display = `${minutes > 10 ? '' : '0'}${minutes}:${seconds > 10 ? '' : '0'}${seconds}`;
  displayTime.textContent = display;
}



buttons.forEach(button => button.addEventListener('click', handleTimers));
quitButton.addEventListener('click', () => {
  if (!isCounting) return;
  if (confirm('Are you sure you want quit this countdown?')) {
    clearInterval(countdown);
    displayTime.textContent = '00:00';
    isCounting = false;
} else {
    return;
}
});