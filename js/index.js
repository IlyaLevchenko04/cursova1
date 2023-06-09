const content = document.querySelector('.content');
const spanScoreX = document.querySelector('.scoreX');
const spanScoreO = document.querySelector('.scoreO');
let player = 'X';
let stepX = [];
let stepO = [];
let scoreO = JSON.parse(localStorage.getItem('scoreO')) || 0;
let scoreX = JSON.parse(localStorage.getItem('scoreX')) || 0;
spanScoreX.innerHTML = `X: ${scoreX}`;
spanScoreO.innerHTML = `O: ${scoreO}`;
const win = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let markup = '';

for (let i = 1; i <= 9; i += 1) {
  markup += `<div class="item" data-id="${i}"></div>`;
}

content.insertAdjacentHTML('beforeend', markup);
content.addEventListener('click', onClick);

function onClick(evt) {
  if (!evt.target.textContent) {
    const id = Number(evt.target.dataset.id);
    if (player === 'X') {
      stepX.push(id);
      const isWinner = checkWinner(stepX);
      if (isWinner) {
        scoreX += 1;
        spanScoreX.innerHTML = `X: ${scoreX}`;
        loadScoreToLS();
        alert(`${player} is Winner 😎`);
        reset();
        return;
      }
    } else {
      stepO.push(id);
      const isWinner = checkWinner(stepO);
      if (isWinner) {
        scoreO += 1;
        spanScoreO.innerHTML = `O: ${scoreO}`;
        loadScoreToLS();
        alert(`${player} is Winner 😎`);
        reset();
        return;
      }
    }
    evt.target.textContent = player;
    player = player === 'X' ? 'O' : 'X';
  }
  handleDraw();
}

function checkWinner(arr) {
  const result = win.some(values => values.every(value => arr.includes(value)));

  return result;
}

function reset() {
  content.innerHTML = markup;
  player = 'X';
  stepX = [];
  stepO = [];
}

function loadScoreToLS() {
  localStorage.setItem('scoreX', `${scoreX}`);
  localStorage.setItem('scoreO', `${scoreO}`);
}

function handleDraw() {
  const allItems = document.querySelectorAll('.item');
  const isDraw = Array.from(allItems).every(item => item.textContent !== '');

  if (isDraw) {
    alert('Draw 😐');
    reset();
  }
}
