const buttonToRandom = document.getElementById('button-random-color');
const colors = document.getElementsByClassName('color');

const randomizeColor = () => {
  const red = Math.ceil(Math.random() * 255);
  const green = Math.ceil(Math.random() * 255);
  const blue = Math.ceil(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
};

buttonToRandom.addEventListener('click', () => {
  for (let color of colors) {
    if (!color.className.includes('black')){
      color.style.backgroundColor = randomizeColor();
    }
  }
})