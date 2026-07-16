import { useEffect, useRef } from "react";
import { TableCell } from "./TableCell";
import type { CellIndex, TableBodyProps, SelectedRange } from "./types";

export function TableBody(props: TableBodyProps) {
  // console.log("render body");

  const activeCellRef = useRef(props.activeCell);
  const editCellRef = useRef(props.editCell);
  const selectedRangeRef = useRef(props.selectedRange);
  const rowsLengthRef = useRef(props.rows.length);
  const columnsLengthRef = useRef(props.columns.length);

  activeCellRef.current = props.activeCell;
  editCellRef.current = props.editCell;
  selectedRangeRef.current = props.selectedRange;
  rowsLengthRef.current = props.rows.length;
  columnsLengthRef.current = props.columns.length;

  const clearCells = (
    activeCell: CellIndex | null,
    selectedRange: SelectedRange | null,
  ) => {
    let startRow: number;
    let endRow: number;
    let startCol: number;
    let endCol: number;

    if (activeCell && !selectedRange) {
      startRow = activeCell.rowIndex;
      endRow = activeCell.rowIndex;
      startCol = activeCell.colIndex;
      endCol = activeCell.colIndex;
    } else if (selectedRange) {
      startRow = selectedRange.start.rowIndex;
      endRow = selectedRange.end.rowIndex;
      startCol = selectedRange.start.colIndex;
      endCol = selectedRange.end.colIndex;
    } else return;

    props.setRows((prevRows) =>
      prevRows.map((row, rIdx) => {
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
      }),
    );
  };

  useEffect(() => {
    // console.log("check document");
    const handleMouseUp = () => {
      props.isSelecting.current = false;
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    // console.log("check window");
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentActive = activeCellRef.current;
      const currentEdit = editCellRef.current;
      const currentRange = selectedRangeRef.current;

      const maxRowIndex = rowsLengthRef.current - 1;
      const maxColIndex = columnsLengthRef.current - 1;

      if (!currentActive && !currentRange) return;
      if (e.ctrlKey || e.metaKey) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          props.setSelectedRange(null);
          props.setActiveCell((prev) => {
            if (!prev) return prev;
            return { ...prev, rowIndex: Math.max(0, prev.rowIndex - 1) };
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "Enter":
        case "ArrowDown":
          e.preventDefault();
          props.setSelectedRange(null);
          props.setActiveCell((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              rowIndex: Math.min(maxRowIndex, prev.rowIndex + 1),
            };
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "ArrowLeft":
          e.preventDefault();
          props.setSelectedRange(null);
          props.setActiveCell((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              colIndex: Math.max(0, prev.colIndex - 1),
            };
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "ArrowRight":
          e.preventDefault();
          props.setSelectedRange(null);
          props.setActiveCell((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              colIndex: Math.min(maxColIndex, prev.colIndex + 1),
            };
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "Delete":
        case "Backspace":
          if (currentEdit) return;
          e.preventDefault();
          clearCells(currentActive, currentRange);
          props.setSelectedRange(null);
          break;

        case "Escape":
          e.preventDefault();
          props.setSelectedRange(null);
          props.setEditCell(null);
          break;
      }

      if (currentActive && !currentEdit && e.key.length == 1) {
        // console.log("start input");
        e.preventDefault();

        props.setSelectedRange(null);
        props.setEditCell({
          rowIndex: currentActive.rowIndex,
          colIndex: currentActive.colIndex,
          value: e.key,
        });
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function returnStatus(rowIndex: number, colIndex: number, isvalid: boolean) {
    if (
      props.editCell?.rowIndex === rowIndex &&
      props.editCell?.colIndex === colIndex
    )
      return "edit";

    if (
      props.activeCell?.rowIndex === rowIndex &&
      props.activeCell?.colIndex === colIndex
    )
      return "active";

    if (
      props.selectedRange &&
      props.selectedRange.start.rowIndex <= rowIndex &&
      props.selectedRange.end.rowIndex >= rowIndex &&
      props.selectedRange.start.colIndex <= colIndex &&
      props.selectedRange.end.colIndex >= colIndex
    )
      return "selected";

    if (!isvalid) return "error";
    return "";
  }

  return props.rows.map((row, rowIndex) =>
    row.values.map((value, colIndex) => {
      const status = returnStatus(rowIndex, colIndex, row.valids[colIndex]);
      const cellValue =
        status === "edit" && props.editCell?.value !== undefined
          ? props.editCell.value
          : value;
      return (
        <TableCell
          key={`${rowIndex}-${colIndex}`}
          value={cellValue}
          rowIndex={rowIndex}
          colIndex={colIndex}
          status={status}
          activeCellRef={activeCellRef}
          isSelecting={props.isSelecting}
          setActiveCell={props.setActiveCell}
          setEditCell={props.setEditCell}
          setRows={props.setRows}
          setSelectedRange={props.setSelectedRange}
        />
      );
    }),
  );
}
