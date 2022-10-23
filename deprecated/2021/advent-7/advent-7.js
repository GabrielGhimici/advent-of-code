const { createReadInterface } = require("../../common/read-input");

const readInterface = createReadInterface(`${__dirname}/input`);

const positions = [];

readInterface.on("line", (line) => {
  line
    .split(",")
    .map(Number)
    .forEach((value) => {
      positions.push(value);
    });
});

readInterface.on("close", () => {
  console.log(
    "First response: ",
    calcultateMinFuelForMovingToPosition(positions, true)
  );
  console.log(
    "Second response: ",
    calcultateMinFuelForMovingToPosition(positions, false)
  );
});

function calcultateMinFuelForMovingToPosition(positions, constant) {
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

function computeFuelConsumed(positions, position, constant) {
  if (constant) {
    return positions
      .map((value) => Math.abs(value - position))
      .reduce((acc, value) => acc + value, 0);
  } else {
    return positions
      .map((value) => {
        const difference = Math.abs(value - position);
        return (difference * (difference + 1)) / 2;
      })
      .reduce((acc, value) => acc + value, 0);
  }
}
