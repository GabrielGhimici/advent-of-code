type BitValue = 1 | 0;
type ReportItem = Array<BitValue>;

interface BitsValueCount {
  0: number;
  1: number;
}

export { ReportItem, BitsValueCount, BitValue };
