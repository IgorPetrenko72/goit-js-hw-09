import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onClick);

const options = flatpickr(refs.input,{
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
        refs.startBtn.removeAttribute('disabled');
        Notiflix.Notify.success("Let's start timer");
    } else {
        Notiflix.Notify.failure('Please choose a date in the future');
    //   window.alert('Please choose a date in the future');
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onClick() {
  refs.startBtn.setAttribute('disabled', true);

  const timer = setInterval(() => {
    const selectedDate = options.selectedDates[0].getTime() - Date.now();

    if (selectedDate > 0) {
        renderTimer(convertMs(selectedDate));
    } else {
      clearInterval(timer);
      refs.input.removeAttribute('disabled');
    }
  }, 1000);
};

function renderTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};