const cells = document.querySelectorAll(".cell");
const gameText = document.querySelector(".gametext>h2");
console.log(gameText);

cells.forEach((c) => {
  c.addEventListener("click", (e) => {
    const cellId = c.getAttribute("data-attribute");
    const validPlacement = GameBoard.placeInCell(cellId);
    if (!validPlacement) return;
    const win = GameBoard.checkForWin(
      GameBoard.board,
      GameBoard.currentPlayer.playerTag
    );
    if (win) {
      GameBoard.renderGame();
      gameText.textContent = `${GameBoard.currentPlayer.playerTag} wins!`;
    } else {
      GameBoard.switchPlayer();
      GameBoard.renderGame();
    }
  });
});

function createPlayer(tag) {
  const playerTag = tag;

  return { playerTag };
}

const GameBoard = (function () {
  this.board = [];

  const initGame = function () {
    this.gameEnded = false;
    this.board = new Array(9);
    this.player1 = createPlayer("X");
    this.player2 = createPlayer("O");
    this.currentPlayer = this.player1;
    this.renderGame();
  };

  const renderGame = function () {
    gameText.textContent = `${this.currentPlayer.playerTag} turn`;
    cells.forEach((c) => {
      const cellId = c.getAttribute("data-attribute");

      c.textContent = this.board[parseInt(cellId)];
    });
  };

  const placeInCell = function (cellId) {
    if (this.gameEnded) return;

    const cellIdInt = parseInt(cellId);
    if (this.board[cellIdInt]) return false;
    this.board[parseInt(cellId)] = this.currentPlayer.playerTag;

    return true;
  };

  const switchPlayer = function () {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  };

  function checkForWin(board, player) {
    console.log(board);
    console.log(player);
    // Define the winning combinations
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Horizontal rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Vertical columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        this.gameEnded = true;
        return true; // Player has won
      }
    }

    return false; // No win detected
  }

  return { initGame, renderGame, placeInCell, switchPlayer, checkForWin };
})();

GameBoard.initGame();
