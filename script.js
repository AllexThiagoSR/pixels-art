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

const createMatriz = (quantity, parent) => {
  for (let i = 1; i <= quantity; i += 1) {
    const section = document.createElement('section');
    for (let j = 1; j <= quantity; j += 1) {
      const div = document.createElement('div');
      div.className = 'pixel';
      div.style.display = 'inline-block';
      section.appendChild(div);
    }
    parent.appendChild(section);
  }
};

buttonToRandom.addEventListener('click', chooseColors);
createMatriz(5, document.getElementById('pixel-board'));

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