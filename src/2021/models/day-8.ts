import { Digit } from '../types/day-8';

class InputEntry {
  constructor(public signalPatterns: Array<string>, public output: Array<string>) {}
}

class DigitConfig {
  private internalDisplay = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];
  private digitPositionsMapping: Array<Array<[number, number]>> = [
    [
      [0, 1],
      [1, 0],
      [1, 2],
      [3, 0],
      [3, 2],
      [4, 1],
    ],
    [
      [1, 2],
      [3, 2],
    ],
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [3, 0],
      [4, 1],
    ],
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [3, 2],
      [4, 1],
    ],
    [
      [1, 0],
      [1, 2],
      [2, 1],
      [3, 2],
    ],
    [
      [0, 1],
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 1],
    ],
    [
      [0, 1],
      [1, 0],
      [2, 1],
      [3, 0],
      [3, 2],
      [4, 1],
    ],
    [
      [0, 1],
      [1, 2],
      [3, 2],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1],
      [3, 0],
      [3, 2],
      [4, 1],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1],
      [3, 2],
      [4, 1],
    ],
  ];

  public setPosition([y, x]: [number, number], letter: string) {
    this.internalDisplay[y][x] = letter;
  }

  public isPositionEmpty([y, x]: [number, number]) {
    return this.internalDisplay[y][x] === '.';
  }

  public isPatternLetterPresent(letter: string) {
    return this.internalDisplay.reduce((isPresent, line) => {
      const result = line.reduce((isPresentOnLine, column) => {
        return column === letter || isPresentOnLine;
      }, false);
      return result || isPresent;
    }, false);
  }

  public getConfigCompleted() {
    const allPositions = this.digitPositionsMapping[8];
    return allPositions.reduce((flag, [y, x]) => flag && this.internalDisplay[y][x] !== '.', true);
  }

  public getDigitByConfig(config: string) {
    const configPositions: Array<[number, number]> = [];
    this.internalDisplay.forEach((line, lineIndex) => {
      line.forEach((column, columnIdex) => {
        if (config.includes(column)) {
          configPositions.push([lineIndex, columnIdex]);
        }
      });
    });
    let digit = -1;
    this.digitPositionsMapping.forEach((positions, index) => {
      if (digit === -1 && this.eqPositions(positions, configPositions)) {
        digit = index;
      }
    });
    if (digit === -1) console.log(configPositions);
    return digit;
  }

  private eqPositions(arr1: Array<[number, number]>, arr2: Array<[number, number]>) {
    if (arr1.length !== arr2.length) return false;
    return arr1.reduce((equal, item, index) => equal && item[0] === arr2[index][0] && item[1] === arr2[index][1], true);
  }

  public getPositionsByDigit(digit: Digit) {
    return this.digitPositionsMapping[digit];
  }

  public display(digit?: Digit, character = 'x') {
    if (digit) {
      this.digitPositionsMapping[digit].forEach(([y, x]) => {
        this.internalDisplay[y][x] = character;
      });
    }
    console.log(
      this.internalDisplay.reduce((table, line) => {
        return `${table}\n${line.join('.')}`;
      }, '')
    );
  }
}

const DigitSegmentsCount = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

export { InputEntry, DigitSegmentsCount, DigitConfig };
