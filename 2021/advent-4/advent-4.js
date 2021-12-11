const { createReadInterface } = require("../../common/read-input");

const readInterface = createReadInterface(`${__dirname}/input`);

let generatedNumbers = [];
const boards = [];
let board = [];

readInterface.on("line", (line) => {
  if (generatedNumbers.length === 0) {
    generatedNumbers = line.split(",").map((value) => Number(value));
  } else {
    if (!line && board.length !== 0) {
      boards.push(board);
      board = [];
    } else {
      board.push(line.split(" ").map((value) => Number(value)));
    }
  }
});

readInterface.on("close", () => {
  if (board.length) {
    boards.push(board);
  }
  console.log(
    "First response: ",
    conputeResult(computeFirstBingo(boards, generatedNumbers))
  );
  console.log(
    "Second response: ",
    conputeResult(computeBingo(boards, generatedNumbers))
  );
});

function generateBoardMaps(boards) {
  const boardMaps = [];
  boards.forEach((board) => {
    const boardMap = [];
    board.forEach((row) => {
      boardMap.push(Array(row.length).fill(0));
    });
    boardMaps.push(boardMap);
  });
  return boardMaps;
}

function conputeResult(boardData) {
  let sumOfUnmarked = 0;
  for (let r = 0; r < boardData.boardMap.length; r++) {
    for (let c = 0; c < boardData.boardMap[0].length; c++) {
      if (boardData.boardMap[r][c] === 0) {
        sumOfUnmarked += boards[boardData.boardIndex][r][c];
      }
    }
  }
  return sumOfUnmarked * boardData.inputNumber;
}

function computeFirstBingo(boards, input) {
  const boardMaps = generateBoardMaps(boards);
  for (let i = 0; i < input.length; i++) {
    boards.forEach((board, index) => {
      for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
          if (board[r][c] === input[i]) {
            boardMaps[index][r][c] = 1;
          }
        }
      }
    });
    const boardIndex = getFirstBoardWithBingo(boardMaps);
    if (boardIndex !== -1) {
      return {
        boardIndex,
        boardMap: boardMaps[boardIndex],
        inputNumber: input[i],
      };
    }
  }
}

function getFirstBoardWithBingo(boardMaps) {
  for (let i = 0; i < boardMaps.length; i++) {
    if (checkIfBingo(boardMaps[i])) {
      return i;
    }
  }
  return -1;
}

function checkIfBingo(boardMap) {
  let bingoOnRow = boardMap.reduce((accumulator, row) => {
    const checkRow = row.reduce((acc, column) => {
      return acc && column !== 0;
    }, true);
    return accumulator || checkRow;
  }, false);
  let bingoOnColumn = false;
  for (let c = 0; c < boardMap[0].length; c++) {
    let allCompleted = true;
    for (let r = 0; r < boardMap.length; r++) {
      if (boardMap[r][c] === 0) {
        allCompleted = false;
      }
    }
    if (allCompleted) {
      bingoOnColumn = true;
    }
  }
  return bingoOnRow || bingoOnColumn;
}
