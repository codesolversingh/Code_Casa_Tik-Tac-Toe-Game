document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.getElementsByClassName('cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
  
    let currentPlayer = 'X';
    let gameOver = false;
  
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
          cells[a].textContent &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent
        ) {
          gameOver = true;
          message.textContent = `Player ${currentPlayer} wins!`;
          cells[a].style.backgroundColor = '#7FFF00';
          cells[b].style.backgroundColor = '#7FFF00';
          cells[c].style.backgroundColor = '#7FFF00';
          break;
        }
      }
    }
  
    function checkDraw() {
      for (const cell of cells) {
        if (!cell.textContent) {
          return false;
        }
      }
      gameOver = true;
      message.textContent = "It's a draw!";
    }
  
    function handleClick(event) {
      const cell = event.target;
      const index = cell.dataset.index;
  
      if (!gameOver && !cell.textContent) {
        cell.textContent = currentPlayer;
        checkWinner();
        checkDraw();
        if (!gameOver) {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          message.textContent = `Player ${currentPlayer}'s Turn`;
        }
      }
    }
  
    function resetGame() {
      for (const cell of cells) {
        cell.textContent = '';
        cell.style.backgroundColor = '#f0f0f0';
      }
      currentPlayer = 'X';
      gameOver = false;
      message.textContent = `Player ${currentPlayer}'s Turn`;
    }
  
    board.addEventListener('click', handleClick);
    resetButton.addEventListener('click', resetGame);
  
    resetGame();
  });
  