import type { TableState, TableAction, EditCell, Row } from "./types";

export function tableReducer(
  state: TableState,
  action: TableAction,
): TableState {
  switch (action.type) {
    case "NAVIGATE_CELLS": {
      let activeCell =
        action.payload.activeCell ?? state.activeCell ?? state.editCell;
      if (!activeCell) return state;

      if (action.payload.editCellIndex || action.payload.editCellValue) {
        const editCell: EditCell = {
          rowIndex:
            action.payload.editCellIndex?.rowIndex ?? activeCell.rowIndex,
          colIndex:
            action.payload.editCellIndex?.colIndex ?? activeCell.colIndex,
          value:
            action.payload.editCellValue ??
            state.rows[activeCell.rowIndex].values[activeCell.colIndex],
        };
        // console.log(editCell);
        return {
          ...state,
          activeCell: null,
          editCell: editCell,
          selectedRange: null,
        };
      }

      if (action.payload.moveActiveCell) {
        const moveActiveCell = action.payload.moveActiveCell;
        const maxRowIndex = state.rows.length - 1;
        const maxColIndex = state.rows[0].values.length - 1;
        const rowIndex = activeCell.rowIndex + moveActiveCell.rowIndex;
        const colIndex = activeCell.colIndex + moveActiveCell.colIndex;
        if (rowIndex < 0 || rowIndex > maxRowIndex) return state;
        if (colIndex < 0 || colIndex > maxColIndex) return state;
        activeCell = { rowIndex, colIndex };
      }

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

      const newRows = state.editCell
        ? state.rows.map((row, rIdx) => {
            console.log("run");
            if (rIdx !== state.editCell?.rowIndex) return row;
            const newValues = [...row.values];
            newValues[state.editCell.colIndex] = state.editCell.value ?? "";

            const newValids = [...row.valids];
            newValids[state.editCell.colIndex] = true;
            return {
              values: newValues,
              valids: newValids,
            };
          })
        : state.rows;

      return {
        ...state,
        activeCell: activeCell,
        editCell: null,
        selectedRange: selectedRange,
        rows: newRows,
      };
    }

    case "CLEAR_CELLS": {
      console.log("clear");
      if (state.editCell || !state.activeCell) return state;
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

    case "SAVE_INPUT": {
      console.log("save input");

      const newRows: Row[] = state.rows.map((row, rIdx) => {
        if (rIdx !== action.payload.index.rowIndex) return row;
        const newValues = [...row.values];
        newValues[action.payload.index.colIndex] = action.payload.value;

        const newValids = [...row.valids];
        newValids[action.payload.index.colIndex] = true;
        return {
          values: newValues,
          valids: newValids,
        };
      });

      return {
        ...state,
        rows: newRows,
        editCell: null,
      };
    }

    //   props.setRows((prevRows) =>
    //     prevRows.map((row, rIdx) => {
    //       if (rIdx !== props.rowIndex) return row;
    //       const newValues = [...row.values];
    //       newValues[props.colIndex] = e.target.value;
    //       return {
    //         ...row,
    //         values: newValues,
    //       };
    //     }),
    //   );
    //   props.setEditCell(null);
    // }}

    default:
      return state;
  }
}
