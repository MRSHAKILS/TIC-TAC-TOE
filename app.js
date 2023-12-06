const board = document.getElementById('board');
const cells = [];
const message = document.querySelector('.message');
let currentPlayer = 'Player 1';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

// Create the Tic Tac Toe board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', () => makeMove(i));
  cells.push(cell);
  board.appendChild(cell);
}

// Function to handle a move
function makeMove(index) {
  if (!gameActive) {
    startGame();
    gameActive = true;
  }

  if (gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameBoard.every(cell => cell !== '')) {
    message.textContent = 'It\'s a draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    message.textContent = `${currentPlayer}'s turn`;
  }
}

// Function to check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => gameBoard[index] === currentPlayer)
  );
}

// Function to start the game
function startGame() {
  message.textContent = `${currentPlayer}'s turn`;
  document.querySelector('.restart-button').textContent = 'Restart Game';
}

// Function to restart the game
function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'Player 1';
  gameActive = false;

  cells.forEach(cell => {
    cell.textContent = '';
  });

  message.textContent = 'Start a new game';
  document.querySelector('.restart-button').textContent = 'Start Game';
}
