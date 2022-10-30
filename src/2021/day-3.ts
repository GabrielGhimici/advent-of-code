import { createReadInterface, linesToList } from '../core/read-input';
import { BitValue, BitsValueCount, ReportItem } from './types/day-3';

async function getInputData() {
  const rawList = await linesToList(createReadInterface(`2021/day-3`));
  return rawList.map((item: string) => item.split('').map(Number) as ReportItem);
}

function computeBitsCount(report: Array<ReportItem>) {
  const bitsCount: Array<BitsValueCount> = [];
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

async function computePowerConsumption() {
  const report = await getInputData();
  const bitsCount = computeBitsCount(report);
  const gammaRate: Array<BitValue> = [];
  const epsilonRate: Array<BitValue> = [];
  bitsCount.forEach((count) => {
    if (count[1] > count[0]) {
      gammaRate.push(1);
      epsilonRate.push(0);
    } else {
      gammaRate.push(0);
      epsilonRate.push(1);
    }
  });
  return parseInt(gammaRate.join(''), 2) * parseInt(epsilonRate.join(''), 2);
}

function computeOGR(report: Array<ReportItem>) {
  let position = 0;
  let newReport = report.slice();
  while (newReport.length > 1 && position < newReport[0].length) {
    const bitsCount = computeBitsCount(newReport);
    const countByPosition = bitsCount[position];
    if (countByPosition['1'] >= countByPosition['0']) {
      newReport = newReport.filter((e) => e[position] === 1);
    } else {
      newReport = newReport.filter((e) => e[position] === 0);
    }
    position++;
  }
  return newReport[0];
}

function computeCO2SR(report: Array<ReportItem>) {
  let position = 0;
  let newReport = report.slice();
  while (newReport.length > 1 && position < newReport[0].length) {
    const bitsCount = computeBitsCount(newReport);
    const countByPosition = bitsCount[position];
    if (countByPosition['0'] <= countByPosition['1']) {
      newReport = newReport.filter((e) => e[position] === 0);
    } else {
      newReport = newReport.filter((e) => e[position] === 1);
    }
    position++;
  }
  return newReport[0];
}

async function computeLifeSupport() {
  const report = await getInputData();
  const OGRValue = computeOGR(report);
  const CO2SRValue = computeCO2SR(report);
  return parseInt(OGRValue.join(''), 2) * parseInt(CO2SRValue.join(''), 2);
}

export { computePowerConsumption, computeLifeSupport };
