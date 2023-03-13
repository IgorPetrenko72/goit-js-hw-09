import Notiflix from 'notiflix';

const refs = {
  createPromises: document.querySelector(`.form`),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.createPromises.addEventListener('submit', (e) => {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  const delayValue = parseInt(delay.value);
  const stepValue = parseInt(step.value);
  const amountValue = parseInt(amount.value);
  
  for (let i = 0; i < amountValue; i+=1) {
    const delay = i * stepValue + delayValue;

createPromise(i, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
     }
  e.currentTarget.reset();
});