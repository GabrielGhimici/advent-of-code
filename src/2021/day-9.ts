import { createReadInterface, linesToList } from '../core/read-input';
import { MapData } from './types/day-9';

async function getInputData() {
  const rawList = await linesToList(createReadInterface(`2021/day-9`));
  return rawList.map((item: string) => item.split('').map(Number));
}

function isLowestValue(value: number, comparisonValues: Array<number>) {
  return comparisonValues.reduce((isLowest, comparisonValue) => isLowest && value < comparisonValue, true);
}

function getComparisonValues(row: number, column: number, map: Array<Array<number>>) {
  const values = [];
  const rowLimit = map.length;
  const columnLimit = map[0].length;
  if (row - 1 >= 0) {
    values.push(map[row - 1][column]);
  }
  if (column - 1 >= 0) {
    values.push(map[row][column - 1]);
  }
  if (row + 1 < rowLimit) {
    values.push(map[row + 1][column]);
  }
  if (column + 1 < columnLimit) {
    values.push(map[row][column + 1]);
  }
  return values;
}

function getHeightMapLowPoints(map: Array<Array<number>>) {
  const lowPoints: Array<MapData> = [];
  const rowLimit = map.length;
  const columnLimit = map[0].length;
  for (let row = 0; row < rowLimit; row++) {
    for (let column = 0; column < columnLimit; column++) {
      if (isLowestValue(map[row][column], getComparisonValues(row, column, map))) {
        lowPoints.push({ value: map[row][column], position: { row, column } });
      }
    }
  }
  return lowPoints;
}

function calculateLowPointsRisk(values: Array<MapData>) {
  return values.map(({ value }) => value + 1).reduce((risk, value) => risk + value, 0);
}

function calculateBasinSize(
  row: number,
  column: number,
  map: Array<Array<number>>,
  visited: Array<Array<boolean>>
): number {
  let size = 0;
  const rowLimit = map.length;
  const columnLimit = map[0].length;
  if (map[row][column] === 9 || visited[row][column]) {
    return size;
  }
  visited[row][column] = true;
  size++;
  if (row > 0) {
    size += calculateBasinSize(row - 1, column, map, visited);
  }
  if (column > 0) {
    size += calculateBasinSize(row, column - 1, map, visited);
  }
  if (row < rowLimit - 1) {
    size += calculateBasinSize(row + 1, column, map, visited);
  }
  if (column < columnLimit - 1) {
    size += calculateBasinSize(row, column + 1, map, visited);
  }
  return size;
}

function calculateBasinSizeResult(map: Array<Array<number>>) {
  const rowLimit = map.length;
  const columnLimit = map[0].length;
  const lowPoints = getHeightMapLowPoints(map);
  const sortedPointSizes = lowPoints
    .map(({ position }) => {
      const visitedMap: Array<Array<boolean>> = Array(rowLimit)
        .fill(false)
        .map(() => Array(columnLimit).fill(false));
      return calculateBasinSize(position.row, position.column, map, visitedMap);
    })
    .sort((firstValue, secondValue) => secondValue - firstValue);

  return sortedPointSizes.filter((_, index) => index < 3).reduce((product, value) => product * value, 1);
}

async function getHeightMapLowPointsRisk() {
  const data = await getInputData();
  return calculateLowPointsRisk(getHeightMapLowPoints(data));
}

async function getLargest3BasinsSizeProduct() {
  const data = await getInputData();
  return calculateBasinSizeResult(data);
}

export { getHeightMapLowPointsRisk, getLargest3BasinsSizeProduct };
