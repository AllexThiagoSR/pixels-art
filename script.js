const buttonToRandom = document.getElementById('button-random-color'); // Busca do DOM o botão que aleatoriza as cores da paleta
const buttonToClear = document.getElementById('clear-board'); // Busca no DOM o botão que limpa o quadro
const buttonMatriz = document.getElementById('generate-board'); // Busca no DOM o botão que envia o tamanho da board digitado no input
const colors = document.getElementsByClassName('color'); // Busca no DOM os elementos que têm a classe color que nesse caso são divs
const input = document.getElementById('board-size'); // Busca no DOM o input onde é digitado o tamanho do board
const classes = 'selected';
const pixelBoard = 'pixelBoard';

// Checa se existe a chave pixelBoard no localStorage se não existir cria ela
const checkPixelBoard = () => {
  // Se na chave pixelBoard de localStorage estiver como indefinido ou seja se não foi utilizada ainda entra no escopo desse if 
  if (localStorage[pixelBoard] === undefined) {
    localStorage.setItem(pixelBoard, '{}'); // Adiciona a chave pixelBoard no localStorage com um objeto vazio
  }
};

// Pega os pixels salvos em pixelBoard e põe em seus lugares
const setStoraged = () => {
  const storagedPixels = JSON.parse(localStorage.getItem(pixelBoard)); // Pega no localStorage o objeto salvo na chave pixelBoard

  //Checa para se certificar que tem algo na variável
  if (storagedPixels !== undefined) {
    const keys = Object.keys(storagedPixels); // Pega todas as keys do objeto recuperado do localStorage

    // Itera sobre essas keys que no modelo que foi salvo o objeto cada key representa um pixel e cada value representa a cor que esse pixel deve ter
    for (let index = 0; index < keys.length; index += 1) {
      const element = document.getElementById(keys[index]); // Pega do DOM o elemento com id igual o da key na posição index atual(keys[index])
      element.style.backgroundColor = storagedPixels[keys[index]]; // Muda o backgroundColor do elemento capturado com o valor salvo na key atual
    }
  }
};

// Gera cor aleatória
const randomizeColor = () => {
  let color = 'rgb(255, 255, 255)'; // Inicializa color com a cor branca

  // Loop infinito enquanto a cor gerada for branca
  while (color === 'rgb(255, 255, 255)') {
    const red = Math.floor(Math.random() * 256); // Gera a parte vermelha da cor final
    const green = Math.floor(Math.random() * 256); // Gera a parte verde da cor final
    const blue = Math.floor(Math.random() * 256); // Gera a parte azul da cor final
    color = `rgb(${red}, ${green}, ${blue})`; // Guarda a cor gerada na variável color
  }
  return color; // Retorna a variável color
};

// Gera cores para cada um dos quadrados que não têm a cor preta
const chooseColors = () => {
  const arrayColors = []; // Declaração do array com as cores que será salvo no localStorage

  // Itera sobre colors a partir do item com idex igual a 1 que contém um HTMLColection com todos os elementos que possuem a class color
  for (let index = 1; index < colors.length; index += 1) {
    const randomColor = randomizeColor(); // Gera uma cor aleatória e guarda dentro de uma constante

    colors[index].style.backgroundColor = randomColor; // Define a cor de fundo do elemento que tá na posição index atual de colors
    arrayColors.push(randomColor); // Empurra a cor gerada para o array que será salvo
  }
  
  localStorage.setItem('colorPalette', JSON.stringify(arrayColors));// Converte o array para strinf e salva o array no localStorage
};

// Função do evento de click nos pixels que preenche ele com a cor selecionada
const fillPixel = (event) => {
  const pixel = event.target; // Pega das informações do objeto event o lugar que foi clicado
  const color = document.querySelector(`.${classes}`); // Pega do DOM o primeiro(e sempre único) elemento com a classe selected 
  const storagedPixels = JSON.parse(localStorage.getItem(pixelBoard)); // Pega o objeto salvo no localStorage que contém as informações sobre os pixels que foram pintados anteriormente e quais as cores deles

  pixel.style.backgroundColor = color.style.backgroundColor; // Define a cor de fundo do pixel clicado como a cor de fundo do elemento que possui a classe selected que foi recuperado anteriormente
  storagedPixels[pixel.id] = pixel.style.backgroundColor; // Cria um novo valor no objeto recuperado do localStorage, o objeto salvo o padrão {idDoPixel: corDeFundo} ex: {pixel-1-1: 'rgb(0, 0, 0)'}
  localStorage.pixelBoard = JSON.stringify(storagedPixels); // Converte o objeto para string e salva novamente no localStorage
};

// Cria a board de pixels
const createMatriz = (quantity, parent) => {
  const auxiParent = parent; // Cria uma cosntante auxiliar para não alterar o parâmetro passado
  auxiParent.innerHTML = ''; // Limpa o innerHTML do elemento pai para não haver conflito de boards
  // Loop para criar todas os pixels
  for (let i = 1; i <= quantity; i += 1) {
    const section = document.createElement('section'); // Cria section que vai comportar uma linha pixels

    section.style.height = '40px'; // Deixa altura da section fico com a mesma altura do pixel
    section.style.width = 'fit-content'; // Defina a largura da section como a soma da largura de todos os pixels gerados em cada linha
    // Para cada section criada vão ser criadas n divs(pixels)
    for (let j = 1; j <= quantity; j += 1) {
      const div = document.createElement('div'); // Cria um pixel
      div.className = 'pixel'; // Adiciona a classe pixel a ele
      div.id = `pixel-${i}-${j}`; // Adiciona um id a ele com o padrão pixel-linha-coluna ex: pixel-0-0
      div.style.backgroundColor = 'white'; // Define a cor de fundo do pixel como branca
      div.addEventListener('click', fillPixel); // Adiciona o escutador de eventos de click no pixel com a função de preencher a cor de fundo do pixel com a cor selecionada
      section.appendChild(div); // Adiciona o pixel criado como filho da section criada
    }
    parent.appendChild(section); // Quando criar todos os filhos da section atual adiciona ela na section com a classe pixel-board
  }
};

// Função do evento de click nos quadrados da paleta de cores
const selectColor = (event) => {
  const element = event.target; // Pega do objeto de informações do evento o alvo do evento
  const elementSelected = document.getElementsByClassName(classes); // Pega o elemento que possui a classe selected

  // Checa se não tem nenhum elemento na classe
  if (elementSelected.length === 0) {
    // Se não houver apenas adiciona a classe ao elemento clicado
    element.classList.add(classes);
  } else {
    // Se houver
    elementSelected[0].classList.remove(classes); // Tira a classe do único elemento que a possui
    element.classList.add(classes); // E adiciona no elemento clicado
  }
};

// Função do evento de click no botão de limpar a board de pixels
const clearPixels = () => {
  const pixels = document.getElementsByClassName('pixel'); // Pega todos os pixels do quadro
  localStorage.setItem(pixelBoard, '{}'); // Determina um objeto vazio para a chave pixelBoard do localStorage

  // Itera sobre todos os pixels do quadro
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white'; // Define a cor de fundo do pixel atual como branco novamente
  }
};

// Função que limita o tamanha do board
const minAndMaxBoard = (boardSize, fuctionToExecute) => {
  let auxi = boardSize; // variável auxiliar para guardar o valor do parâmetro

  // Checa se o valor do parâmetro é menor que 5
  if (boardSize < 5) {
    // Se for
    auxi = 5; // Muda o valor para 5(mínimo de linhas e colunas aceitas)
  } else if (boardSize > 50) {
    // Se o valor do parâmetro for maior que 50
    auxi = 50; // Muda o valor para 50(máximo de linhas e colunas aceitas)
  }
  fuctionToExecute(auxi, document.getElementById('pixel-board')); // Executa a função que cria a board com o tamanho passado para o parâmetro
  localStorage.boardSize = JSON.stringify(auxi); // Salva no localStorage o tamanho passado como parâmetro
};

// Função de evento no click do botão VQV
const chooseBoardSize = () => {
  const inputValue = input.value; // Pega o valor do input capturado do DOM anteriormente

  // Checa se o input é uma string vazia
  if (inputValue === '') {
    // Se for
    alert('Board inválido!'); // Exibe um alerta
    input.value = ''; // Limpa o input
  } else {
    // Se não for
    minAndMaxBoard(inputValue, createMatriz); // Cria um board com o valor do input
    input.value = ''; // Limpa o input
  }
};

buttonToRandom.addEventListener('click', chooseColors); // Adiciona o escutador de evento ao botão Cores Aleatórias

buttonToClear.addEventListener('click', clearPixels); // Adiciona o escutador de evento ao botão Limpar

// Adiciona o escutador de evento de keyup no input
input.addEventListener('keyup', (event) => {
  const keyPressed = event.key; // Pega o tecla pressionada
  // Checa se a tecla pressionada foi o enter
  if (keyPressed === 'Enter') {
    // Se for
    chooseBoardSize(); // Chama a função que pegar o valor do input e gera a board com esse valor
  }
});

// Adiciona escutador de eventos no botão VQV
buttonMatriz.addEventListener('click', chooseBoardSize);

// Checa se existe boardSize ou não
if (localStorage.boardSize === undefined) {
  // Se for iguala a undefined
  localStorage.setItem('boardSize', '5'); // Cria a chave com o valor inicial 5
}

createMatriz(JSON.parse(localStorage.getItem('boardSize')), document.getElementById('pixel-board')); // Cria uma board com o valor salvo no localStorage

checkPixelBoard(); // Checa se existe uma chave chamada pixelBoard

setStoraged(); // Chama a função se setar os valores dos pixels

// Checagem se há a key colorPalette no localStorage
if (localStorage.colorPalette !== undefined) {
  // Se for diferente de undefined
  const recuperedColors = JSON.parse(localStorage.getItem('colorPalette')); // Pega o array salvo na chave colorPalette e o converte de volta para array

  // Itera sobre os elementos que contém a classe colors
  for (let index = 0; index < colors.length; index += 1) {
    // Checa se elemento não possui a classe black
    if (!colors[index].className.includes('black')) {
      // Se não possuir
      colors[index].style.backgroundColor = recuperedColors[index - 1]; // Define a cor de fundo do quadrado como a cor salva em recuperedColors[index - 1]
    }
  }
} else {
  // Se não for diferente de undefined
  chooseColors(); // Gera cores e bota nas divs
}

// Adiciona o evento de click nas cores da paleta
for (let index = 0; index < colors.length; index += 1) {
  const color = colors[index]; // Pega o elemento atual uma das divs com a classe color
  color.addEventListener('click', selectColor); // Adiciona o escutador de evento de click e chama a função que seleciona uma cor na paleta
}
