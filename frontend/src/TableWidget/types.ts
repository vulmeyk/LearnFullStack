import type { Dispatch, SetStateAction, RefObject } from "react";

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
  setActiveCell: Dispatch<SetStateAction<CellIndex | null>>;
  setSelectedRange: Dispatch<SetStateAction<SelectedRange | null>>;
};

export type TableBodyProps = {
  columns: Column[];
  rows: Row[];
  setRows: Dispatch<SetStateAction<Row[]>>;
  activeCell: CellIndex | null;
  setActiveCell: Dispatch<SetStateAction<CellIndex | null>>;
  editCell: CellIndex | null;
  setEditCell: Dispatch<SetStateAction<CellIndex | null>>;
  isSelecting: RefObject<boolean>;
  selectedRange: SelectedRange | null;
  setSelectedRange: Dispatch<SetStateAction<SelectedRange | null>>;
};

export type TableCellProps = {
  value: string;
  rowIndex: number;
  colIndex: number;
  status: "" | "active" | "edit" | "selected" | "error";
  activeCellRef: RefObject<CellIndex | null>;
  isSelecting: RefObject<boolean>;
  setActiveCell: Dispatch<SetStateAction<CellIndex | null>>;
  setEditCell: Dispatch<SetStateAction<CellIndex | null>>;
  setRows: Dispatch<SetStateAction<Row[]>>;
  setSelectedRange: Dispatch<SetStateAction<SelectedRange | null>>;
};
