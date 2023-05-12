// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
const timerEl = document.querySelector('.timer');

timerEl.style.display = 'flex';
timerEl.style.gap = '30px';
timerEl.style.justifyContent = 'center';
timerEl.style.marginTop = '100px';

let selectedDate = 0;
let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // ств.довільну вибрану дату та поточну дату
    selectedDate = selectedDates[0].getTime();
    // console.log('це вибрана дата', selectedDate);
    const currentDate = new Date().getTime();
    // console.log('це поточна дата', currentDate);
    if (selectedDate < currentDate) {
      window.alert('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', startCountdown());
    }
  },
};
flatpickr(inputEl, options);

function startCountdown(selectedDates) {
  startBtn.setAttribute('disabled', true);

  timer = setInterval(() => {
    const currentDate = new Date().getTime();

    const timeDifference = selectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    // console.log(`${days}:${hours}:${minutes}:${seconds}`);
    updateTimerValues(days, hours, minutes, seconds);
  }, 1000);
  if (timeDifference === 0) {
    clearInterval(timer);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updateTimerValues(days, hours, minutes, seconds) {
  daysValue.textContent = `${days}`;
  hoursValue.textContent = `${hours}`;
  minutesValue.textContent = `${minutes}`;
  secondsValue.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
