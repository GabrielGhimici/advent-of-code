import { createReadInterface, linesToList } from '../core/read-input';
import { Board, DiffResult, Line, Point, ResultContext } from './types/day-5';

async function getInputData() {
  const rawList = await linesToList(createReadInterface(`2021/day-5`));
  return rawList.map((item: string) => {
    const [first, second] = item.split(' -> ');
    const [x1, y1] = first.split(',').map(Number);
    const [x2, y2] = second.split(',').map(Number);
    return new Line(new Point(x1, y1), new Point(x2, y2));
  });
}

function determineResult(board: Board) {
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] >= 2) {
        count++;
      }
    }
  }
  return count;
}

function getMaxBoundaries(clouds: Array<Line>) {
  const xList: Array<number> = [];
  const yList: Array<number> = [];
  clouds.forEach((cloud) => {
    xList.push(cloud.start.x);
    xList.push(cloud.end.x);
    yList.push(cloud.start.y);
    yList.push(cloud.end.y);
  });
  const maxX = Math.max(...xList);
  const maxY = Math.max(...yList);
  return new Point(maxX, maxY);
}

function generateBoard({ x, y }: Point) {
  const newBoard: Board = [];
  for (let i = 0; i <= x; i++) {
    const newRow = [];
    for (let j = 0; j <= y; j++) {
      newRow.push(0);
    }
    newBoard.push(newRow.slice());
  }
  return newBoard.slice();
}

function populateBoard(clouds: Array<Line>, context: ResultContext, board: Board) {
  let feasibleClouds = [];
  if (context === ResultContext.All) {
    feasibleClouds = clouds.slice();
  } else {
    feasibleClouds = clouds.filter((cloud) => cloud.start.x === cloud.end.x || cloud.start.y === cloud.end.y);
  }
  feasibleClouds.forEach((cloud) => {
    const { diff, key } = getDifference(cloud);
    const minX = Math.min(cloud.start.x, cloud.end.x);
    const minY = Math.min(cloud.start.y, cloud.end.y);
    for (let i = 0; i <= diff; i++) {
      if (key === 'x') {
        board[cloud.start.y][minX + i]++;
      } else if (key === 'y') {
        board[minY + i][cloud.start.x]++;
      } else {
        if (cloud.start.x <= cloud.end.x && cloud.start.y >= cloud.end.y) {
          board[cloud.start.y - i][cloud.start.x + i]++;
        } else if (cloud.start.x >= cloud.end.x && cloud.start.y <= cloud.end.y) {
          board[cloud.start.y + i][cloud.start.x - i]++;
        } else if (cloud.start.x >= cloud.end.x && cloud.start.y >= cloud.end.y) {
          board[cloud.start.y - i][cloud.start.x - i]++;
        } else {
          board[cloud.start.y + i][cloud.start.x + i]++;
        }
      }
    }
  });
}

function getDifference(cloud: Line): DiffResult {
  if (cloud.start.x === cloud.end.x) {
    return {
      diff: Math.abs(cloud.start.y - cloud.end.y),
      key: 'y',
    };
  } else if (cloud.start.y === cloud.end.y) {
    return {
      diff: Math.abs(cloud.start.x - cloud.end.x),
      key: 'x',
    };
  } else {
    return {
      diff: Math.abs(cloud.start.x - cloud.end.x),
      key: null,
    };
  }
}

async function firstBoard() {
  const clouds = await getInputData();
  const maxTable = getMaxBoundaries(clouds);
  const board = generateBoard(maxTable);
  populateBoard(clouds, ResultContext.Straight, board);
  return determineResult(board);
}

async function secondBoard() {
  const clouds = await getInputData();
  const maxTable = getMaxBoundaries(clouds);
  const board = generateBoard(maxTable);
  populateBoard(clouds, ResultContext.All, board);
  return determineResult(board);
}

export { firstBoard, secondBoard };
