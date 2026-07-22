import type { TableState, TableAction, Row, ActiveCell } from "./types";

function isActiveCell(cell: Partial<ActiveCell>): cell is ActiveCell {
  return (
    cell.rowIndex !== undefined &&
    cell.colIndex !== undefined &&
    cell.editingValue !== undefined
  );
}

export function tableReducer(
  state: TableState,
  action: TableAction,
): TableState {
  switch (action.type) {
    case "NAVIGATE_CELLS": {
      const updateActiveCell = action.payload.updateActiveCell;

      const activeCell = {
        ...state.activeCell,
        ...updateActiveCell,
      };

      if (!isActiveCell(activeCell)) {
        // console.log("dont have activeCell");
        return state;
      }

      if (action.payload.moveActiveCell) {
        const moveActiveCell = action.payload.moveActiveCell;
        const maxRowIndex = state.rows.length - 1;
        const maxColIndex = state.rows[0].values.length - 1;
        const rowIndex = activeCell.rowIndex + moveActiveCell.rowIndex;
        const colIndex = activeCell.colIndex + moveActiveCell.colIndex;
        if (rowIndex < 0 || rowIndex > maxRowIndex) return state;
        if (colIndex < 0 || colIndex > maxColIndex) return state;
        activeCell.rowIndex = rowIndex;
        activeCell.colIndex = colIndex;
        activeCell.editingValue = null;
      }

      if (activeCell.editingValue !== null) {
        // console.log("is edit");
        return {
          ...state,
          activeCell: activeCell,
          selectedRange: null,
        };
      }

      // console.log("is not edit");

      const farCell = action.payload.farCell;

      const selectedRange = farCell
        ? {
            start: {
              rowIndex: Math.min(activeCell.rowIndex, farCell.rowIndex),
              colIndex: Math.min(activeCell.colIndex, farCell.colIndex),
            },
            end: {
              rowIndex: Math.max(activeCell.rowIndex, farCell.rowIndex),
              colIndex: Math.max(activeCell.colIndex, farCell.colIndex),
            },
          }
        : { start: activeCell, end: activeCell };

      const newRows =
        state.activeCell && state.activeCell.editingValue !== null
          ? state.rows.map((row, rIdx) => {
              if (rIdx !== state.activeCell?.rowIndex) return row;
              const newValues = [...row.values];
              newValues[state.activeCell.colIndex] =
                state.activeCell.editingValue ?? "";

              const newValids = [...row.valids];
              newValids[state.activeCell.colIndex] = true;
              return {
                values: newValues,
                valids: newValids,
              };
            })
          : state.rows;

      return {
        ...state,
        activeCell: activeCell,
        selectedRange: selectedRange,
        rows: newRows,
      };
    }

    case "CLEAR_CELLS": {
      // console.log("clear cells");
      if (state.activeCell?.editingValue != undefined || !state.activeCell)
        return state;
      const startRow = state.selectedRange
        ? state.selectedRange.start.rowIndex
        : state.activeCell.rowIndex;
      const endRow = state.selectedRange
        ? state.selectedRange.end.rowIndex
        : state.activeCell.rowIndex;
      const startCol = state.selectedRange
        ? state.selectedRange.start.colIndex
        : state.activeCell.colIndex;
      const endCol = state.selectedRange
        ? state.selectedRange.end.colIndex
        : state.activeCell.colIndex;

      const newRows: Row[] = state.rows.map((row, rIdx) => {
        if (rIdx < startRow || rIdx > endRow) return row;
        const newValues = [...row.values];
        const newValids = [...row.valids];

        for (let c = startCol; c <= endCol; c++) {
          newValues[c] = "";
          newValids[c] = true;
        }
        return {
          ...row,
          values: newValues,
          valids: newValids,
        };
      });
      return {
        ...state,
        rows: newRows,
        selectedRange: null,
      };
    }
    case "PASTE_CELLS": {
      // console.log("start paste");
      if (state.activeCell?.editingValue !== null) return state;
      const activeCell = state.activeCell;

      const plainText = action.payload.plainText;
      if (!plainText) return state;

      const newRows = [...state.rows];

      const maxRowIndex = state.rows.length - 1;
      const maxColIndex = state.rows[0].values.length - 1;

      plainText.split("\n").forEach((rowString, rowOffset) => {
        const targetRowIndex = activeCell.rowIndex + rowOffset;
        if (targetRowIndex > maxRowIndex) return;

        if (newRows[targetRowIndex] === state.rows[targetRowIndex]) {
          newRows[targetRowIndex] = {
            values: [...state.rows[targetRowIndex].values],
            valids: [...state.rows[targetRowIndex].valids],
          };
        }

        rowString.split("\t").forEach((cellValue, colOffset) => {
          const targetColIndex = activeCell.colIndex + colOffset;
          if (targetColIndex > maxColIndex) return;

          newRows[targetRowIndex].values[targetColIndex] = cellValue;
          newRows[targetRowIndex].valids[targetColIndex] = true;
        });
      });

      return {
        ...state,
        rows: newRows,
      };
    }

    default:
      return state;
  }
}
