import { createReadInterface, linesToList } from '../core/read-input';
import { DigitSegmentsCount, InputEntry } from './models/day-8';
import { Digit } from './types/day-8';

async function getInputData() {
  const rawList = await linesToList(createReadInterface(`2021/day-8`));
  return rawList
    .map((item: string) => item.split(' | '))
    .map(([signals, outputs]) => new InputEntry(signals.split(' '), outputs.split(' ')));
}

function computeDigitSegments(digits: Array<Digit>) {
  return digits.map((digit) => DigitSegmentsCount[digit]);
}

function decodeOutput(entry: InputEntry) {
  const digitMap = Array(10).fill(Array(0));
  const sortedPatternInput = entry.signalPatterns
    .map((pattern) => pattern.split('').sort())
    .sort((first, second) => first.length - second.length);

  sortedPatternInput
    .filter((pattern) => [2, 3, 4, 7].includes(pattern.length))
    .forEach((pattern) => {
      digitMap[DigitSegmentsCount.indexOf(pattern.length)] = pattern;
    });

  sortedPatternInput
    .filter((pattern) => pattern.length === 6)
    .forEach((pattern) => {
      const combined7and4 = [...new Set([...digitMap[4], ...digitMap[7]])].sort();
      if (patternDifference(pattern, combined7and4).length === 1) {
        digitMap[9] = pattern;
      } else if (patternDifference(digitMap[1], patternDifference(digitMap[8], pattern)).length === 1) {
        digitMap[6] = pattern;
      } else {
        digitMap[0] = pattern;
      }
    });

  sortedPatternInput
    .filter((pattern) => pattern.length === 5)
    .forEach((pattern) => {
      const combinedPatternWith1 = [...new Set([...pattern, ...digitMap[1]])].sort();
      if (patternDifference(digitMap[9], combinedPatternWith1).length === 0) {
        digitMap[5] = pattern;
      } else if (patternDifference(digitMap[4], pattern).length === 2) {
        digitMap[2] = pattern;
      } else {
        digitMap[3] = pattern;
      }
    });
  const output = entry.output
    .map((item) => item.split('').sort())
    .map((item) => {
      return digitMap.findIndex((digitConfig) => eqPattern(item, digitConfig));
    })
    .join('');
  return output;
}

function eqPattern(arr1: Array<string>, arr2: Array<string>) {
  if (arr1.length !== arr2.length) return false;
  return arr1.reduce((equal, item, index) => equal && item === arr2[index], true);
}

function patternDifference(first: Array<string>, second: Array<string>) {
  const difference: Array<string> = [];
  first.forEach((element) => {
    if (!second.includes(element)) {
      difference.push(element);
    }
  });
  return difference;
}

function getNumberOfDigits(input: Array<InputEntry>, digits: Array<Digit>) {
  const digitSegments = computeDigitSegments(digits);
  let numberOfDigits = 0;
  input.forEach((entry) => {
    entry.output.forEach((outputItem) => {
      if (digitSegments.includes(outputItem.length as Digit)) {
        numberOfDigits++;
      }
    });
  });
  return numberOfDigits;
}

function computeSumOfOutputs(input: Array<InputEntry>) {
  return input.map((entry) => Number(decodeOutput(entry))).reduce((sum, output) => sum + output, 0);
}

async function getDigitsCount() {
  const data = await getInputData();
  return getNumberOfDigits(data, [1, 4, 7, 8]);
}

async function getSumOfOutputs() {
  const data = await getInputData();
  return computeSumOfOutputs(data);
}

export { getDigitsCount, getSumOfOutputs };
