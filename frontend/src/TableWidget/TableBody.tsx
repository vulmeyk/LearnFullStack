import { useEffect } from "react";
import { TableCell } from "./TableCell";

export function TableBody({
  columns,
  rows,
  setRows,
  isSelecting,
  activeCell,
  setActiveCell,
  editingCell,
  setEditingCell,
  selectedRange,
  setSelectedRange,
}) {
  useEffect(() => {
    const handleMouseUp = () => {
      isSelecting.current = false;
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    console.log("  Следим за activeCell");
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeCell) return;

      switch (e.key) {
        case "ArrowUp":
          setActiveCell((prev) => ({
            ...prev,
            rowIndex: Math.max(0, prev.rowIndex - 1),
          }));
          break;
        // case ["ArrowDown", "Enter"]:
        case "ArrowDown":
          setActiveCell((prev) => ({
            ...prev,
            rowIndex: prev.rowIndex + 1,
          }));
          break;

        case "ArrowLeft":
          setActiveCell((prev) => ({
            ...prev,
            colIndex: Math.max(0, prev.colIndex - 1),
          }));
          break;

        case "ArrowRight":
          setActiveCell((prev) => ({
            ...prev,
            colIndex: prev.colIndex + 1,
          }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCell]);

  const returnStatus = (rowIndex, colIndex, isvalid) => {
    if (
      editingCell?.rowIndex === rowIndex &&
      editingCell?.colIndex === colIndex
    )
      return "edit";

    if (activeCell?.rowIndex === rowIndex && activeCell?.colIndex === colIndex)
      return "active";

    if (selectedRange) {
      const minRowIndex = Math.min(
        selectedRange.startRow,
        selectedRange.endRow
      );
      const maxRowIndex = Math.max(
        selectedRange.startRow,
        selectedRange.endRow
      );
      const minColIndex = Math.min(
        selectedRange.startColumn,
        selectedRange.endColumn
      );
      const maxColIndex = Math.max(
        selectedRange.startColumn,
        selectedRange.endColumn
      );
      if (
        minRowIndex <= rowIndex &&
        maxRowIndex >= rowIndex &&
        minColIndex <= colIndex &&
        maxColIndex >= colIndex
      )
        return "selected";
    }

    if (!isvalid) return "error";
    return "";
  };
  console.log(" Проходим по ячейкам");

  return rows.map((row, rowIndex) =>
    row.values.map((value, colIndex) => {
      const status = returnStatus(rowIndex, colIndex, row.valids[colIndex]);
      return TableCell(
        rows,
        setRows,
        columns,
        rowIndex,
        colIndex,
        value,
        status,
        activeCell,
        setActiveCell,
        setEditingCell,
        setSelectedRange,
        isSelecting
      );
    })
  );
}
