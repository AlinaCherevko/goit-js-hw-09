import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(formRef.elements.delay.value);
  const step = Number(formRef.elements.step.value);
  const amount = Number(formRef.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const object = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(object);
      } else {
        // Reject
        reject(object);
      }
    }, delay);
  });
}
