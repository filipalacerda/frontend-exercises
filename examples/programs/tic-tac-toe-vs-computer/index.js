window.onload = () => {
  const restartButton = document.getElementById("restart");
  const squares = document.querySelectorAll(".square");

  const humanMark = "X";
  const aiMark = "0";
  // First player is always X
  let currentPlayer = humanMark;

  // Clean the board values
  // Reset the players turn to X
  // Reset the result message
  restartButton.addEventListener("click", () => {
    squares.forEach((square) => {
      square.textContent = "";
    });
    currentPlayer = humanMark;
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

  const changeTurns = () => {
    // Let's change the player turn
    currentPlayer = currentPlayer === humanMark ? aiMark : humanMark;
  };

  squares.forEach((square, i) => {
    square.addEventListener("click", () => {
      // if it already has a value do nothing
      if (squares[i].textContent !== "") {
        return;
      }
      // otherwise print the current player symbol
      squares[i].textContent = currentPlayer;

      changeTurns();

      if (currentPlayer === aiMark) {
        makeComputerMove();
      }
    });
  });

  const checkWin = (currentBoardState, currentPlayer) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      // For each of the winning combinations check if the value
      // has the current player value
      if (
        currentBoardState[a] === currentPlayer &&
        currentBoardState[b] === currentPlayer &&
        currentBoardState[c] === currentPlayer
      ) {
        return true;
      }
    }
    return false;
  };

  const makeComputerMove = () => {
    const bestPlayInfo = minimax(getCurrentBoardState(), "0");
    if (squares[bestPlayInfo.index]) {
      squares[bestPlayInfo.index].textContent = "0";
    }

    changeTurns();
  };

  const getEmptyCellsIndexes = (currentBoardState) => {
    return currentBoardState.filter((square) => {
      return square !== "X" && square !== "0";
    });
  };

  const getCurrentBoardState = () => {
    return Array.from(squares).map((square, index) => {
      if (square.textContent === "") {
        return index;
      } else {
        return square.textContent;
      }
    });
  };

  const minimax = (currentBoardState, currentPlayer) => {
    // Store the indexes of all empty cells:
    const availCellsIndexes = getEmptyCellsIndexes(currentBoardState);

    // Check if its a terminal state
    if (checkWin(currentBoardState, humanMark)) {
      return { score: -1 };
    } else if (checkWin(currentBoardState, aiMark)) {
      return { score: 1 };
    } else if (availCellsIndexes.length === 0) {
      return { score: 0 };
    }

    const allTestPlayInfos = [];
    // Create a for-loop statement that will loop through each of the empty cells:
    for (let i = 0; i < availCellsIndexes.length; i++) {
      // Create a place to store this test-play’s terminal score:
      const currentTestPlayInfo = {};

      // Save the index number of the cell this for-loop is currently processing:
      currentTestPlayInfo.index = currentBoardState[availCellsIndexes[i]];

      // Place the current player’s mark on the cell for-loop is currently processing:
      currentBoardState[availCellsIndexes[i]] = currentPlayer;

      if (currentPlayer === aiMark) {
        // Step 11 - Recursively run the minimax function for the new board:
        const result = minimax(currentBoardState, humanMark);

        // Step 12 - Save the result variable’s score into the currentTestPlayInfo object:
        currentTestPlayInfo.score = result.score;
      } else {
        // Recursively run the minimax function for the new board:
        const result = minimax(currentBoardState, aiMark);
        // Save the result variable’s score into the currentTestPlayInfo object:
        currentTestPlayInfo.score = result.score;
      }

      // Reset the current board back to the state it was before the current player made its move:
      currentBoardState[availCellsIndexes[i]] = currentTestPlayInfo.index;

      // Save the result of the current player’s test-play for future use:
      allTestPlayInfos.push(currentTestPlayInfo);
    }

    // Step 15 - Create a store for the best test-play’s reference:
    let bestTestPlay = null;

    // Step 16 - Get the reference to the current player’s best test-play:
    if (currentPlayer === aiMark) {
      let bestScore = -Infinity;
      for (let i = 0; i < allTestPlayInfos.length; i++) {
        if (allTestPlayInfos[i].score > bestScore) {
          bestScore = allTestPlayInfos[i].score;
          bestTestPlay = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < allTestPlayInfos.length; i++) {
        if (allTestPlayInfos[i].score < bestScore) {
          bestScore = allTestPlayInfos[i].score;
          bestTestPlay = i;
        }
      }
    }
    // Get the object with the best test-play score for the current player:
    return allTestPlayInfos[bestTestPlay];
  };
};
