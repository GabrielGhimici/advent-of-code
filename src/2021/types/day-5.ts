type Board = Array<Array<number>>;

interface DiffResult {
  diff: number;
  key: 'x' | 'y' | null;
}

export { Board, DiffResult };
