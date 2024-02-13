const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const scoresDisplay = document.getElementById('scores');
let currentPlayer = 'X';
let scores = {
  X: 0,
  O: 0
};

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;
  
  if (cell.textContent === '') {
    cell.textContent = currentPlayer;
    if (checkWinner()) {
      scores[currentPlayer]++;
      scoresDisplay.textContent = `Player X: ${scores['X']} | Player O: ${scores['O']}`;
      statusDisplay.textContent = `Player ${currentPlayer} wins!`;
      disableBoard();
    } else if (checkTie()) {
      statusDisplay.textContent = 'It\'s a tie!';
      disableBoard();
    } else {
      switchPlayer();
      statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return [...cells].every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  enableBoard();
  currentPlayer = 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function disableBoard() {
  cells.forEach(cell => {
    cell.style.pointerEvents = 'none';
  });
}

function enableBoard() {
  cells.forEach(cell => {
    cell.style.pointerEvents = 'auto';
  });
}
