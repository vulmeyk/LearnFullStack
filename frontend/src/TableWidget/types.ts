export interface SelectedRange {
  startRow: number;
  startColumn: number;
  endRow: number;
  endColumn: number;
}

export interface Row {
  values: string[];
  valids: boolean[];
}

export interface IndexCell {
  rowIndex: number;
  colIndex: number;
}
