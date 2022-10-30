import { createReadInterface, linesToList } from '../core/read-input';
import type { BingoBoard, BingoBoardMap, BingoResponse } from './types/day-4';

async function getInputData() {
  const rawList = await linesToList(createReadInterface(`2021/day-4`));
  let generatedNumbers: Array<number> = [];
  const boards: Array<BingoBoard> = [];
  let board: BingoBoard = [];
  rawList.forEach((line) => {
    if (generatedNumbers.length === 0) {
      generatedNumbers = line.split(',').map((value) => Number(value));
    } else {
      if (!line && board.length !== 0) {
        boards.push(board);
        board = [];
      } else {
        board.push(line.split(' ').map((value) => Number(value)));
      }
    }
  });
  return { generatedNumbers, boards };
}

function generateBoardMaps(boards: Array<BingoBoard>) {
  const boardMaps: Array<BingoBoardMap> = [];
  boards.forEach((board) => {
    const boardMap: BingoBoardMap = [];
    board.forEach((row) => {
      boardMap.push(Array(row.length).fill(0));
    });
    boardMaps.push(boardMap);
  });
  return boardMaps;
}

function computeFirstBingo(boards: Array<BingoBoard>, input: Array<number>) {
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

function computeSecondBingo(boards: Array<BingoBoard>, input: Array<number>) {
  const boardMaps = generateBoardMaps(boards);
  for (let i = 0; i < input.length; i++) {
    for (let index = 0; index < boards.length; index++) {
      for (let r = 0; r < boards[index].length; r++) {
        for (let c = 0; c < boards[index][0].length; c++) {
          if (boards[index][r][c] === input[i]) {
            boardMaps[index][r][c] = 1;
          }
        }
      }
      if (allBoardsDone(boardMaps)) {
        return {
          boardIndex: index,
          boardMap: boardMaps[index],
          inputNumber: input[i],
        };
      }
    }
  }
}

function getFirstBoardWithBingo(boardMaps: Array<BingoBoardMap>) {
  for (let i = 0; i < boardMaps.length; i++) {
    if (checkIfBingo(boardMaps[i])) {
      return i;
    }
  }
  return -1;
}

function checkIfBingo(boardMap: BingoBoardMap) {
  const bingoOnRow = boardMap.reduce((accumulator, row) => {
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

function allBoardsDone(boardMaps: Array<BingoBoardMap>) {
  let allDone = true;
  for (let i = 0; i < boardMaps.length; i++) {
    if (!checkIfBingo(boardMaps[i])) {
      allDone = false;
    }
  }
  return allDone;
}

function computeResult(boardData: BingoResponse | undefined, boards: Array<BingoBoard>) {
  if (!boardData) return -1;
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

async function personalWin() {
  const { generatedNumbers, boards } = await getInputData();
  return computeResult(computeFirstBingo(boards, generatedNumbers), boards);
}

async function squidWin() {
  const { generatedNumbers, boards } = await getInputData();
  return computeResult(computeSecondBingo(boards, generatedNumbers), boards);
}

export { personalWin, squidWin };
