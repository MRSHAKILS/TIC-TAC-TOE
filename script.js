let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function startGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    updateMessage('Game started. ' + currentPlayer + "'s turn.");
    updateGameBoard();
    document.getElementById('startMessage').style.display = 'none';
    document.querySelector('button').style.display = 'none';
}

function restartGame() {
    startGame();
    updateMessage('Game restarted. ' + currentPlayer + "'s turn.");
    document.querySelector('button').style.display = 'none';
}

function handleClick(index) {
    if (gameActive && gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        if (checkWin()) {
            updateMessage(currentPlayer + ' wins!');
            gameActive = false;
            document.querySelector('button').style.display = 'block';
        } else if (checkDraw()) {
            updateMessage('It\'s a draw!');
            gameActive = false;
            document.querySelector('button').style.display = 'block';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateMessage(currentPlayer === 'X' ? "Player 1's turn." : "Player 2's turn.");
        }
        updateGameBoard();
    }
}

function updateGameBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName('cell')[i].innerText = gameBoard[i];
    }
}

function updateMessage(message) {
    document.getElementById('resultMessage').innerText = message;
    document.getElementById('turnMessage').innerText = gameActive ? 'Current turn: ' + currentPlayer : '';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function checkDraw() {
    return !gameBoard.includes('');
}
