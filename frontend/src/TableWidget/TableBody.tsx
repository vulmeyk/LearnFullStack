import { useEffect, useState } from "react";
import { TableCell } from "./TableCell";
import type { IndexCell } from "./types";

export function TableBody({
  columns,
  rows,
  setRows,
  activeCell,
  setActiveCell,
  isSelecting,
  selectedRange,
  setSelectedRange,
}) {
  // console.log("render body");
  const [editCell, setEditCell] = useState<IndexCell | null>(null);

  useEffect(() => {
    // console.log("check mouse");
    const handleMouseUp = () => {
      isSelecting.current = false;
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    // console.log("check activeCell and editCell");
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeCell) return;

      setSelectedRange(null);

      if (!editCell && e.key.length == 1) {
        // console.log("started input");
        setEditCell(activeCell);
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          setActiveCell((prev) => ({
            ...prev,
            rowIndex: Math.max(0, prev.rowIndex - 1),
          }));

          (document.activeElement as HTMLElement)?.blur();
          break;

        case "ArrowDown":
          setActiveCell((prev) => ({
            ...prev,
            rowIndex: Math.min(rows.length - 1, prev.rowIndex + 1),
          }));
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "ArrowLeft":
          setActiveCell((prev) => ({
            ...prev,
            colIndex: Math.max(0, prev.colIndex - 1),
          }));
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "ArrowRight":
          setActiveCell((prev) => ({
            ...prev,
            colIndex: Math.min(columns.length - 1, prev.colIndex + 1),
          }));
          (document.activeElement as HTMLElement)?.blur();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCell, editCell]);

  const returnStatus = (rowIndex, colIndex, isvalid) => {
    if (editCell?.rowIndex === rowIndex && editCell?.colIndex === colIndex)
      return "edit";

    if (activeCell?.rowIndex === rowIndex && activeCell?.colIndex === colIndex)
      return "active";

    if (
      selectedRange?.startRowIndex <= rowIndex &&
      selectedRange?.endRowIndex >= rowIndex &&
      selectedRange?.startColIndex <= colIndex &&
      selectedRange?.endColIndex >= colIndex
    )
      return "selected";

    if (!isvalid) return "error";
    return "";
  };

  return rows.map((row, rowIndex) =>
    row.values.map((value, colIndex) => {
      const status = returnStatus(rowIndex, colIndex, row.valids[colIndex]);
      return TableCell(
        value,
        rowIndex,
        colIndex,
        status,
        activeCell,
        setActiveCell,
        setEditCell,
        rows,
        setRows,
        isSelecting,
        setSelectedRange
      );
    })
  );
}
