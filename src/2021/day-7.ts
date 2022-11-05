import { createReadInterface, linesToList } from '../core/read-input';

async function getInputData() {
  const rawList = await linesToList(createReadInterface(`2021/day-7`));
  return rawList.map((item: string) => item.split(',').map(Number))[0];
}

function calculateMinFuelForMovingToPosition(positions: Array<number>, constant: boolean) {
  let minFuel = Infinity;
  const maxPosition = Math.max(...positions);
  const minPosition = Math.min(...positions);
  for (let i = minPosition; i <= maxPosition; i++) {
    const fuelConsumed = computeFuelConsumed(positions, i, constant);
    if (fuelConsumed < minFuel) {
      minFuel = fuelConsumed;
    }
  }
  return minFuel;
}

function computeFuelConsumed(positions: Array<number>, position: number, constant: boolean) {
  if (constant) {
    return positions.map((value) => Math.abs(value - position)).reduce((acc, value) => acc + value, 0);
  } else {
    return positions
      .map((value) => {
        const difference = Math.abs(value - position);
        return (difference * (difference + 1)) / 2;
      })
      .reduce((acc, value) => acc + value, 0);
  }
}

async function constantFuelConsumption() {
  const positions = await getInputData();
  return calculateMinFuelForMovingToPosition(positions, true);
}

async function nonConstantFuelConsumption() {
  const positions = await getInputData();
  return calculateMinFuelForMovingToPosition(positions, false);
}

export { constantFuelConsumption, nonConstantFuelConsumption };
