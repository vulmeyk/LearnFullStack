import type { Dispatch } from "react";

export type Row = {
  values: string[];
  valids: boolean[];
};

export type Column = {
  header: string;
  type: string;
};

export type CellIndex = {
  rowIndex: number;
  colIndex: number;
};

export type ActiveCell = {
  rowIndex: number;
  colIndex: number;
  editingValue: string | null;
};

export type SelectedRange = {
  start: CellIndex;
  end: CellIndex;
};

export type TableWidgetProps = {
  columns: Column[];
  rows: Row[];
};

export type TableHeaderProps = {
  columns: Column[];
  maxRowIndex: number;
  dispatch: Dispatch<TableAction>;
};

export type TableBodyProps = {
  columns: Column[];
  state: TableState;
  dispatch: Dispatch<TableAction>;
};

export type TableCellProps = {
  value: string;
  rowIndex: number;
  colIndex: number;
  status: "default" | "active" | "edit" | "selected" | "error";
  dispatch: Dispatch<TableAction>;
};

export type TableState = {
  activeCell: ActiveCell | null;
  selectedRange: SelectedRange | null;
  rows: Row[];
};

export type TableAction =
  | {
      type: "NAVIGATE_CELLS";
      payload: {
        updateActiveCell?: Partial<ActiveCell> | null;
        farCell?: CellIndex;
        moveActiveCell?: CellIndex;
      };
    }
  | {
      type: "CLEAR_CELLS";
    }
  | {
      type: "PASTE_CELLS";
      payload: { plainText: string };
    };
