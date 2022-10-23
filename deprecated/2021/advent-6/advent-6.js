const { createReadInterface } = require("../../common/read-input");

const readInterface = createReadInterface(`${__dirname}/input`);

const newIntervalLength = 8;
const resetIntervalLength = 6;
let list = [];

readInterface.on("line", (line) => {
  list = line.split(",").map(Number);
});

readInterface.on("close", () => {
  console.log(
    "First result: ",
    computeResult(list, 80)
  );
  console.log(
    "Second result: ",
    computeResult(list, 256)
  );
});

function computeResult(inputList, dayLimit) {
  const freqArray = Array(newIntervalLength + 1).fill(0);
  inputList.forEach((value) => freqArray[value]++);
  let i = 1;
  while (i <= dayLimit) {
    const newFishCount = freqArray[0];
    freqArray[0] = 0;
    for (let i = 0; i < freqArray.length - 1; i++) {
      freqArray[i] = freqArray[i + 1];
    }
    freqArray[resetIntervalLength] =
      freqArray[resetIntervalLength] + newFishCount;
    freqArray[newIntervalLength] = newFishCount;
    i++;
  }
  return freqArray.reduce((acc, value) => acc + value, 0);
}
