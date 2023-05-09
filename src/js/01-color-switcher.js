const refs = {
  startBtn: document.querySelector('button[data-start]'),
  closeBtn: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};
let timerId = null;
refs.startBtn.addEventListener('click', event => {
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  event.target.setAttribute('disabled', true);
  refs.closeBtn.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.closeBtn.addEventListener('click', event => {
  clearInterval(timerId);
  event.target.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
});
