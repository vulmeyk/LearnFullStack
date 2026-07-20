import { useEffect, useRef } from "react";
import { TableCell } from "./TableCell";
import type { TableBodyProps } from "./types";

export function TableBody(props: TableBodyProps) {
  console.log("render body");

  const { activeCell, editCell, selectedRange } = props.state;

  const editCellRef = useRef(editCell);
  editCellRef.current = editCell;

  useEffect(() => {
    console.log("check window");
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return;
      const currentEdit = editCellRef.current;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          props.dispatch({
            type: "NAVIGATE_CELLS",
            payload: {
              moveActiveCell: {
                rowIndex: -1,
                colIndex: 0,
              },
            },
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "Enter":
        case "ArrowDown":
          e.preventDefault();
          props.dispatch({
            type: "NAVIGATE_CELLS",
            payload: {
              moveActiveCell: {
                rowIndex: 1,
                colIndex: 0,
              },
            },
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "ArrowLeft":
          e.preventDefault();
          props.dispatch({
            type: "NAVIGATE_CELLS",
            payload: {
              moveActiveCell: {
                rowIndex: 0,
                colIndex: -1,
              },
            },
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "ArrowRight":
          e.preventDefault();
          props.dispatch({
            type: "NAVIGATE_CELLS",
            payload: {
              moveActiveCell: {
                rowIndex: 0,
                colIndex: 1,
              },
            },
          });
          (document.activeElement as HTMLElement)?.blur();
          break;

        case "Delete":
        case "Backspace":
          if (currentEdit) return;
          e.preventDefault();
          props.dispatch({
            type: "CLEAR_CELLS",
          });
          break;

        case "Escape":
          e.preventDefault();

          props.dispatch({
            type: "NAVIGATE_CELLS",
            payload: {
              editCellIndex: null,
              editCellValue: "",
            },
          });

          break;
      }

      if (e.key.length == 1 && !currentEdit) {
        // console.log("start input");
        e.preventDefault();

        props.dispatch({
          type: "NAVIGATE_CELLS",
          payload: {
            editCellValue: e.key,
          },
        });
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function returnStatus(rowIndex: number, colIndex: number, isvalid: boolean) {
    if (editCell?.rowIndex === rowIndex && editCell?.colIndex === colIndex)
      return "edit";

    if (activeCell?.rowIndex === rowIndex && activeCell?.colIndex === colIndex)
      return "active";

    if (
      selectedRange &&
      selectedRange.start.rowIndex <= rowIndex &&
      selectedRange.end.rowIndex >= rowIndex &&
      selectedRange.start.colIndex <= colIndex &&
      selectedRange.end.colIndex >= colIndex
    )
      return "selected";

    if (!isvalid) return "error";
    return "default";
  }

  return props.state.rows.map((row, rowIndex) =>
    row.values.map((value, colIndex) => {
      const status = returnStatus(rowIndex, colIndex, row.valids[colIndex]);
      const cellValue =
        status === "edit" && editCell?.value !== undefined
          ? editCell.value
          : value;
      return (
        <TableCell
          key={`${rowIndex}-${colIndex}`}
          value={cellValue}
          rowIndex={rowIndex}
          colIndex={colIndex}
          status={status}
          dispatch={props.dispatch}
        />
      );
    }),
  );
}
