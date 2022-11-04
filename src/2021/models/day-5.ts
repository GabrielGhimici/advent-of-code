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

export { Point, Line, ResultContext };
