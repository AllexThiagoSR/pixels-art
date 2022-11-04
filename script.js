const buttonToRandom = document.getElementById('button-random-color');
const colors = document.getElementsByClassName('color');

const randomizeColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

const chooseColors = () => {
  for (let color of colors) {
    if (!color.className.includes('black')){

      color.style.backgroundColor = randomizeColor();
    }
  }
}

buttonToRandom.addEventListener('click', chooseColors);

window.onload = chooseColors;