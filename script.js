const buttonToRandom = document.getElementById('button-random-color');
const buttonToClear = document.getElementById('clear-board');
const buttonMatriz = document.getElementById('generate-board');
const colors = document.getElementsByClassName('color');
const input = document.getElementById('board-size');
const classes = 'selected';
const pixelBoard = 'pixelBoard';

const checkKey = () => {
  if (localStorage[pixelBoard] === undefined) {
    localStorage.setItem(pixelBoard, '{}');
  }
};

const setStoraged = () => {
  const storagedPixels = JSON.parse(localStorage.getItem(pixelBoard));
  if (storagedPixels !== undefined) {
    const keys = Object.keys(storagedPixels);
    for (let index = 0; index < keys.length; index += 1) {
      const element = document.getElementById(keys[index]);
      element.style.backgroundColor = storagedPixels[keys[index]];
    }
  }
};

const randomizeColor = () => {
  let color = 'rgb(255, 255, 255)';

  while (color === 'rgb(255, 255, 255)') {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    color = `rgb(${red}, ${green}, ${blue})`;
  }
  return color;
};

const chooseColors = () => {
  const arrayColors = [];

  for (let index = 0; index < colors.length; index += 1) {
    if (!colors[index].className.includes('black')) {
      const randomColor = randomizeColor();
      colors[index].style.backgroundColor = randomColor;
      arrayColors.push(randomColor);
    }
  }
  localStorage.setItem('colorPalette', JSON.stringify(arrayColors));
};

const fillPixel = (event) => {
  const pixel = event.target;
  const color = document.querySelector(`.${classes}`);
  const storagedPixels = JSON.parse(localStorage.getItem(pixelBoard));

  pixel.style.backgroundColor = color.style.backgroundColor;
  storagedPixels[pixel.id] = pixel.style.backgroundColor;
  localStorage.pixelBoard = JSON.stringify(storagedPixels);
};

const createMatriz = (quantity, parent) => {
  parent.innerHTML = '';
  for (let i = 1; i <= quantity; i += 1) {
    const section = document.createElement('section');

    section.style.height = '40px';
    section.style.width = 'fit-content';
    for (let j = 1; j <= quantity; j += 1) {
      const div = document.createElement('div');
      div.className = 'pixel';
      div.id = `div-${i}-${j}`;
      div.style.backgroundColor = 'white';
      div.addEventListener('click', fillPixel);
      section.appendChild(div);
    }
    parent.appendChild(section);
  }
};

const selectColor = (event) => {
  const element = event.target;
  const elementSelected = document.getElementsByClassName(classes);

  if (elementSelected.length === 0) {
    element.classList.add(classes);
  } else {
    elementSelected[0].classList.remove(classes);
    element.classList.add(classes);
  }
};

const clearPixels = () => {
  const pixels = document.getElementsByClassName('pixel');
  localStorage.setItem(pixelBoard, '{}');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
};

checkKey();

if (localStorage.colorPalette !== undefined) {
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

const chooseBoardSize = () =>{
  const inputValue = input.value;
  input.value = '';

  if (inputValue === '') {
    alert('Board inválido!');
  } else if (Number(inputValue) > 0) {
    createMatriz(Number(inputValue), document.getElementById('pixel-board'));
  }
}

buttonToRandom.addEventListener('click', chooseColors);
buttonToClear.addEventListener('click', clearPixels);
input.addEventListener('keyup', (event) => {
  const keyPressed = event.key;

  if (keyPressed === 'Enter') {
    chooseBoardSize();
  }
});
buttonMatriz.addEventListener('click', chooseBoardSize);
createMatriz(5, document.getElementById('pixel-board'));
setStoraged();

for (let index = 0; index < colors.length; index += 1) {
  const color = colors[index];
  color.addEventListener('click', selectColor);
}
