import { useEffect, useState } from "react";
import { TableCell } from "./TableCell";
import type { TableBodyProps, CellIndex } from "./types";

export function TableBody(props: TableBodyProps) {
  // console.log("render body");
  const [editCell, setEditCell] = useState<CellIndex | null>(null);

  useEffect(() => {
    // console.log("check mouse");
    const handleMouseUp = () => {
      props.isSelecting.current = false;
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    console.log("check activeCell and editCell");
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!props.activeCell) return;
      if (e.ctrlKey || e.metaKey) return;

      // console.log((e.ctrlKey || e.metaKey) && e.key === "c");

      switch (e.key) {
        case "ArrowUp":
          props.setActiveCell((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              rowIndex: Math.max(0, prev.rowIndex - 1),
            };
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "ArrowDown":
          props.setActiveCell((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              rowIndex: Math.min(props.rows.length - 1, prev.rowIndex + 1),
            };
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "ArrowLeft":
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
          props.setActiveCell((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              colIndex: Math.min(props.columns.length - 1, prev.colIndex + 1),
            };
          });
          (document.activeElement as HTMLElement)?.blur();
          break;
      }

      props.setSelectedRange(null);

      if (!editCell && e.key.length == 1) {
        // console.log("started input");
        setEditCell(props.activeCell);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [props.activeCell, editCell]);

  function returnStatus(rowIndex: number, colIndex: number, isvalid: boolean) {
    if (editCell?.rowIndex === rowIndex && editCell?.colIndex === colIndex)
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
      return (
        <TableCell
          key={`${rowIndex}-${colIndex}-${status}`}
          value={value}
          rowIndex={rowIndex}
          colIndex={colIndex}
          status={status}
          activeCell={props.activeCell}
          setActiveCell={props.setActiveCell}
          setEditCell={setEditCell}
          rows={props.rows}
          setRows={props.setRows}
          isSelecting={props.isSelecting}
          setSelectedRange={props.setSelectedRange}
        />
      );
    }),
  );
}
