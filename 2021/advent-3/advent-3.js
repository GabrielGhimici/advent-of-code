const { createReadInterface } = require("../../common/read-input");

const readInterface = createReadInterface(`${__dirname}/input`);

const report = [];

readInterface.on("line", (line) => {
  report.push(line.split(""));
});

readInterface.on("close", () => {
  console.log("First response: ", computePowerConsumption(report));
  console.log("Second response: ", computeLifeSupport(report));
});

function computePowerConsumption(report) {
  const bitsCount = computeBitsCount(report);
  const gammaRate = [];
  const epsilonRate = [];
  bitsCount.forEach((count) => {
    if (count["1"] > count["0"]) {
      gammaRate.push(1);
      epsilonRate.push(0);
    } else {
      gammaRate.push(0);
      epsilonRate.push(1);
    }
  });
  return parseInt(gammaRate.join(""), 2) * parseInt(epsilonRate.join(""), 2);
}

function computeBitsCount(report) {
  const bitsCount = [];
  for (let i = 0; i < report[0].length; i++) {
    bitsCount.push({ 1: 0, 0: 0 });
  }
  report.forEach((row) => {
    row.forEach((bit, index) => {
      bitsCount[index][bit]++;
    });
  });
  return bitsCount;
}

function computeLifeSupport(report) {
  const OGRValue = computeOGR(report);
  const CO2SRValue = computeCO2SR(report);
  return parseInt(OGRValue.join(""), 2) * parseInt(CO2SRValue.join(""), 2);
}

function computeOGR(report) {
  let position = 0;
  let newReport = report.slice();
  while (newReport.length > 1 && position < newReport[0].length) {
    const bitsCount = computeBitsCount(newReport);
    const countByPosition = bitsCount[position];
    if (countByPosition["1"] >= countByPosition["0"]) {
      newReport = newReport.filter((e) => e[position] === "1");
    } else {
      newReport = newReport.filter((e) => e[position] === "0");
    }
    position++;
  }
  return newReport[0];
}

function computeCO2SR(report) {
  let position = 0;
  let newReport = report.slice();
  while (newReport.length > 1 && position < newReport[0].length) {
    const bitsCount = computeBitsCount(newReport);
    const countByPosition = bitsCount[position];
    if (countByPosition["0"] <= countByPosition["1"]) {
      newReport = newReport.filter((e) => e[position] === "0");
    } else {
      newReport = newReport.filter((e) => e[position] === "1");
    }
    position++;
  }
  return newReport[0];
}
