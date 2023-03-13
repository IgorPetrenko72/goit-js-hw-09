const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyRef = document.querySelector('body');
let timerId = null;

startBtn.addEventListener("click", () => {
    timerId = setInterval(onChangeBodyColor, 1000);  
    startBtn.setAttribute("disabled", "true");
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onChangeBodyColor() {
    bodyRef.style.backgroundColor = getRandomHexColor();
};
  
stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled");  
});
