const buttonToRandom = document.getElementById('button-random-color');
const colors = document.getElementsByClassName('color');

const randomizeColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

const chooseColors = () => {
  const arrayColors =[];
  
  for (let color of colors) {
    if (!color.className.includes('black')){
      const randomColor = randomizeColor();
      color.style.backgroundColor = randomColor;
      arrayColors.push(randomColor);
    }
  }
  localStorage.setItem('colorPalette', JSON.stringify(arrayColors));
}

// const createMatriz = () => {};

buttonToRandom.addEventListener('click', chooseColors);

window.onload = () => {
  if (localStorage.length !== 0) {
    const recuperedColors = JSON.parse(localStorage.getItem('colorPalette'));
    const elements = document.getElementsByClassName('color');

    for (let index = 0; index < elements.length; index += 1) {
      if (!elements[index].className.includes('black')) {
        elements[index].style.backgroundColor = recuperedColors[index - 1];
      }
    }
  } else {
    chooseColors();
  }
};