import { createReadInterface, linesToList } from '../core/read-input';

async function getInputData() {
  const rawList = await linesToList(createReadInterface(`2021/day-6`));
  return rawList.map((item: string) => item.split(',').map(Number));
}
const newIntervalLength = 8;
const resetIntervalLength = 6;

function computeResult(inputList: Array<number>, dayLimit: number): number {
  const freqArray = Array(newIntervalLength + 1).fill(0);
  inputList.forEach((value) => freqArray[value]++);
  let i = 1;
  while (i <= dayLimit) {
    const newFishCount = freqArray[0];
    freqArray[0] = 0;
    for (let i = 0; i < freqArray.length - 1; i++) {
      freqArray[i] = freqArray[i + 1];
    }
    freqArray[resetIntervalLength] = freqArray[resetIntervalLength] + newFishCount;
    freqArray[newIntervalLength] = newFishCount;
    i++;
  }
  return freqArray.reduce((acc, value) => acc + value, 0);
}

async function lanternfishAfter80() {
  const list = await getInputData();
  return computeResult(list[0], 80);
}

async function lanternfishAfter256() {
  const list = await getInputData();
  return computeResult(list[0], 256);
}

export { lanternfishAfter80, lanternfishAfter256 };
