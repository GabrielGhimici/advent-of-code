type BingoBoard = Array<Array<number>>;
type BingoBoardMap = Array<Array<0 | 1>>;

interface BingoResponse {
  boardIndex: number;
  boardMap: BingoBoardMap;
  inputNumber: number;
}

export type { BingoBoard, BingoBoardMap, BingoResponse };
