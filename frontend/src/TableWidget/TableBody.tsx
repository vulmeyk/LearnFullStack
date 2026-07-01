import { useEffect, useState } from "react";
import { TableCell } from "./TableCell";
import type { IndexCell } from "./types";

export function TableBody({
  columns,
  rows,
  setRows,
  activeCell,
  setActiveCell,
}) {
  console.log("render body");
  const [editCell, setEditCell] = useState<IndexCell | null>(null);

  useEffect(() => {
    console.log("check activeCell and editCell");
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeCell) return;
      if (!editCell && e.key.length == 1) {
        console.log("started input");
        setEditCell(activeCell);
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          setActiveCell((prev) => ({
            ...prev,
            rowIndex: Math.max(0, prev.rowIndex - 1),
          }));
          setEditCell(null);
          break;
        case "ArrowDown":
          setActiveCell((prev) => ({
            ...prev,
            rowIndex: Math.min(rows.length - 1, prev.rowIndex + 1),
          }));
          setEditCell(null);
          break;

        case "ArrowLeft":
          setActiveCell((prev) => ({
            ...prev,
            colIndex: Math.max(0, prev.colIndex - 1),
          }));
          setEditCell(null);
          break;

        case "ArrowRight":
          setActiveCell((prev) => ({
            ...prev,
            colIndex: Math.min(columns.length - 1, prev.colIndex + 1),
          }));
          setEditCell(null);
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
        setActiveCell,
        setEditCell,
        rows,
        setRows
      );
    })
  );
}
