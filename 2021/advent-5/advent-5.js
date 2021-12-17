const { createReadInterface } = require("../../common/read-input");

const readInterface = createReadInterface(`${__dirname}/input`);

const clouds = [];
let board = [];

readInterface.on("line", (line) => {
  const [first, second] = line.split(" -> ");
  const [x1, y1] = first.split(",").map(Number);
  const [x2, y2] = second.split(",").map(Number);
  clouds.push({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 } });
});

readInterface.on("close", () => {
  const maxTable = getMaxBoundaries(clouds);
  board = generateBoard(maxTable);
  populateBoard(clouds, "straight");
  displayBoard(board);
  console.log("First response: ", determineResult(board));
  board = generateBoard(maxTable);
  populateBoard(clouds, "all");
  displayBoard(board);
  console.log("Second response: ", determineResult(board));
});

function determineResult(board) {
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

function getMaxBoundaries(clouds) {
  const xList = [];
  const yList = [];
  clouds.forEach((cloud) => {
    xList.push(cloud.start.x);
    xList.push(cloud.end.x);
    yList.push(cloud.start.y);
    yList.push(cloud.end.y);
  });
  const maxX = Math.max(...xList);
  const maxY = Math.max(...yList);
  return {
    x: maxX,
    y: maxY,
  };
}

function generateBoard({ x, y }) {
  const newBoard = [];
  for (let i = 0; i <= x; i++) {
    const newRow = [];
    for (let j = 0; j <= y; j++) {
      newRow.push(0);
    }
    newBoard.push(newRow.slice());
  }
  return newBoard.slice();
}

function populateBoard(clouds, context) {
  let feasableClouds = [];
  if (context === "all") {
    feasableClouds = clouds.slice();
  } else {
    feasableClouds = clouds.filter(
      (cloud) => cloud.start.x === cloud.end.x || cloud.start.y === cloud.end.y
    );
  }
  feasableClouds.forEach((cloud) => {
    const { diff, key } = getDifference(cloud);
    const minX = Math.min(cloud.start.x, cloud.end.x);
    const minY = Math.min(cloud.start.y, cloud.end.y);
    for (let i = 0; i <= diff; i++) {
      if (key === "x") {
        board[cloud.start.y][minX + i]++;
      } else if (key === "y") {
        board[minY + i][cloud.start.x]++;
      } else {
        if (cloud.start.x <= cloud.end.x && cloud.start.y >= cloud.end.y) {
          board[cloud.start.y - i][cloud.start.x + i]++;
        } else if (
          cloud.start.x >= cloud.end.x &&
          cloud.start.y <= cloud.end.y
        ) {
          board[cloud.start.y + i][cloud.start.x - i]++;
        } else if (
          cloud.start.x >= cloud.end.x &&
          cloud.start.y >= cloud.end.y
        ) {
          board[cloud.start.y - i][cloud.start.x - i]++;
        } else {
          board[cloud.start.y + i][cloud.start.x + i]++;
        }
      }
    }
  });
}

function getDifference(cloud) {
  if (cloud.start.x === cloud.end.x) {
    return {
      diff: Math.abs(cloud.start.y - cloud.end.y),
      key: "y",
    };
  } else if (cloud.start.y === cloud.end.y) {
    return {
      diff: Math.abs(cloud.start.x - cloud.end.x),
      key: "x",
    };
  } else {
    console.log(
      Math.abs(cloud.start.x - cloud.end.x),
      Math.abs(cloud.start.y - cloud.end.y)
    );
    return {
      diff: Math.abs(cloud.start.x - cloud.end.x),
      key: null,
    };
  }
}

function displayBoard(board) {
  board.forEach((row) => {
    console.log(row.map((value) => (value === 0 ? "." : `${value}`)).join(""));
  });
}
