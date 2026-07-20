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

export type EditCell = {
  rowIndex: number;
  colIndex: number;
  value?: string;
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
  activeCell: CellIndex | null;
  editCell: EditCell | null;
  selectedRange: SelectedRange | null;
  rows: Row[];
};

export type TableAction =
  | {
      type: "NAVIGATE_CELLS";
      payload: {
        activeCell?: CellIndex;
        editCellIndex?: CellIndex | null;
        editCellValue?: string;
        isSelecting?: boolean;
        farCell?: CellIndex;
        moveActiveCell?: CellIndex;
      };
    }
  | {
      type: "SAVE_INPUT";
      payload: {
        index: CellIndex;
        value: string;
      };
    }
  | {
      type: "CLEAR_CELLS";
    };
