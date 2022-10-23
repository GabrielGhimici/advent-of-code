const { createReadInterface } = require("../../common/read-input");

const readInterface = createReadInterface(`${__dirname}/input`);

const list = [];

readInterface.on("line", (line) => {
  list.push(Number(line));
});

readInterface.on("close", () => {
  console.log("First response: ", checkMeasureIncreases(list));
  console.log("Second response: ", checkMeasureIncreases(groupMeasures(list)));
});

function checkMeasureIncreases(list) {
  let increases = 0;
  for (let i = 1; i < list.length; i++) {
    if (list[i] > list[i - 1]) {
      increases++;
    }
  }
  return increases;
}

function groupMeasures(list) {
  const groupedMeasures = [];
  for (let i = 0; i < list.length - 2; i++) {
    groupedMeasures.push(list[i] + list[i + 1] + list[i + 2]);
  }
  return groupedMeasures;
}
