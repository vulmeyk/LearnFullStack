export interface SelectedRange {
  startRowIndex: number;
  startColIndex: number;
  endRowIndex: number;
  endColIndex: number;
}

export interface Row {
  values: string[];
  valids: boolean[];
}

export interface IndexCell {
  rowIndex: number;
  colIndex: number;
}
