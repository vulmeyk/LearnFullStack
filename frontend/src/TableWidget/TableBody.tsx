import { useEffect } from "react";
import { TableCell } from "./TableCell";

export function TableBody({
  columns,
  rows,
  setRows,
  activeCell,
  setActiveCell,
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeCell) return;

      switch (e.key) {
        case "ArrowUp":
          setActiveCell((prev) => ({
            ...prev,
            rowIndex: Math.max(0, prev.rowIndex - 1),
          }));
          break;
        case "ArrowDown":
          setActiveCell((prev) => ({
            ...prev,
            rowIndex: Math.min(rows.length - 1, prev.rowIndex + 1),
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
            colIndex: Math.min(columns.length - 1, prev.colIndex + 1),
          }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCell]);

  const returnStatus = (rowIndex, colIndex, isvalid) => {
    if (activeCell?.rowIndex === rowIndex && activeCell?.colIndex === colIndex)
      return "active";

    if (!isvalid) return "error";
    return "";
  };

  return rows.map((row, rowIndex) =>
    row.values.map((value, colIndex) => {
      const status = returnStatus(rowIndex, colIndex, row.valids[colIndex]);
      return TableCell(value, rowIndex, colIndex, status, setActiveCell);
    })
  );
}
