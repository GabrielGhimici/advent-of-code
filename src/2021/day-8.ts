import { createReadInterface, linesToList } from '../core/read-input';
import { DigitConfig, DigitSegmentsCount, InputEntry } from './models/day-8';
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
  const digitConfig = new DigitConfig();
  const importantDigits = entry.signalPatterns.filter((pattern) =>
    [1, 7, 4].map((item) => DigitSegmentsCount[item]).includes(pattern.length)
  );
  importantDigits
    .sort((first, second) => {
      return first.length - second.length;
    })
    .forEach((pattern) => {
      const digit = DigitSegmentsCount.indexOf(pattern.length);
      const positions = digitConfig.getPositionsByDigit(digit as Digit);
      const emptyPositions = positions.filter((position) => digitConfig.isPositionEmpty(position));
      const remainingPattern = pattern.split('').filter((letter) => !digitConfig.isPatternLetterPresent(letter));

      emptyPositions.forEach((position, index) => {
        digitConfig.setPosition(position, remainingPattern[index]);
      });
    });
  entry.signalPatterns
    .filter((pattern) => !importantDigits.includes(pattern))
    .sort((first, second) => {
      return first.length - second.length;
    })
    .forEach((pattern) => {
      const remainingPattern = pattern.split('').filter((letter) => !digitConfig.isPatternLetterPresent(letter));
      if (remainingPattern.length === 1 && digitConfig.isPositionEmpty([4, 1])) {
        digitConfig.setPosition([4, 1], remainingPattern[0]);
      } else if (remainingPattern.length === 1 && digitConfig.isPositionEmpty([3, 0])) {
        digitConfig.setPosition([3, 0], remainingPattern[0]);
      }
    });
  digitConfig.display();
  console.log(entry.output.map((output) => digitConfig.getDigitByConfig(output)));
  return entry.output.map((output) => digitConfig.getDigitByConfig(output)).join('');
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
