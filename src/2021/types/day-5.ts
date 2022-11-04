class Point {
  constructor(public x: number, public y: number) {}

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class Line {
  constructor(public start: Point, public end: Point) {}

  toString() {
    return `Start: ${this.start.toString()} - End: ${this.end.toString()}`;
  }
}

enum ResultContext {
  All = 'all',
  Straight = 'straight',
}

type Board = Array<Array<number>>;

interface DiffResult {
  diff: number;
  key: 'x' | 'y' | null;
}

export { Point, Line, ResultContext, Board, DiffResult };
