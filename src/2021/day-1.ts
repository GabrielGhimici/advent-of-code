import { createReadInterface, linesToList } from '../core/read-input';

async function getInputData() {
  const rawList = await linesToList(createReadInterface(`2021/day-1`));
  return rawList.map((item: string) => +item);
}

function measurementIncreasesCount(list: Array<number>): number {
  let increases = 0;
  for (let index = 1; index < list.length; index++) {
    if (list[index - 1] < list[index]) {
      increases++;
    }
  }
  return increases;
}

function groupedMeasurements(list: Array<number>) {
  const groupedMeasures = [];
  for (let index = 0; index < list.length - 2; index++) {
    groupedMeasures.push(list[index] + list[index + 1] + list[index + 2]);
  }
  return groupedMeasures;
}

async function measurementIncreases() {
  const data = await getInputData();
  return measurementIncreasesCount(data);
}

async function groupedMeasurementIncreases() {
  const data = await getInputData();
  return measurementIncreasesCount(groupedMeasurements(data));
}

export { measurementIncreases, groupedMeasurementIncreases };
