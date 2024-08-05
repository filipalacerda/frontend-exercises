window.onload = () => {
  const restartButton = document.getElementById("restart");
  const squares = document.querySelectorAll(".square");

  const players = ["X", "O"];

  // First player is always X
  let currentPlayer = players[0];

  // Print the result
  const result = document.getElementById("result");
  const initialResultContent = document.createTextNode("X's turn!");
  result.appendChild(initialResultContent);

  // Clean the board values
  // Reset the players turn to X
  // Reset the result message
  restartButton.addEventListener("click", () => {
    squares.forEach((square, i) => {
      square.textContent = "";
    });

    result.textContent = `X's turn!`;

    currentPlayer = players[0];
  });

  // Store the winning combinations possible
  const winningCombinations = [
    // horizontal options
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical options
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal options
    [0, 4, 8],
    [2, 4, 6],
  ];

  squares.forEach((square, i) => {
    const changeTurns = () => {
      // Let's change the player turn
      currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
      if (currentPlayer === players[1]) {
        makeComputerMove(currentPlayer);
      }
    };

    square.addEventListener("click", () => {
      // if it already has a value do nothing
      if (squares[i].textContent !== "") {
        return;
      }
      // otherwise print the current player symbol
      squares[i].textContent = currentPlayer;

      // Check if it's a win
      if (checkWin(currentPlayer)) {
        result.textContent = `Game over! ${currentPlayer} wins!`;
        return;
      }

      //Check if it's a tie
      if (checkTie()) {
        result.textContent = `Game is tied!`;
        return;
      }

      changeTurns();
    });

    const checkTie = () => {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === "") {
          return false;
        }
      }
      return true;
    };

    const checkWin = (currentPlayer) => {
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        // For each of the winning combinations check if the value
        // has the current player value
        if (
          squares[a].textContent === currentPlayer &&
          squares[b].textContent === currentPlayer &&
          squares[c].textContent === currentPlayer
        ) {
          return true;
        }
      }
      return false;
    };
  });

  const makeComputerMove = (player) => {
    // check the free squares
    const emptyCells = Array.from(squares).filter((square) => {
      return square.textContent === "";
    });

    // get random cell
    const randomCellIndex = Math.floor(Math.random() * emptyCells.length);

    // Update the content of the cell
    emptyCells[randomCellIndex].textContent = player;

    // Let's change the player turn
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
};
