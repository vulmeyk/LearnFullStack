import { useEffect, useRef } from "react";
import { TableCell } from "./TableCell";
import type { TableBodyProps } from "./types";

export function TableBody(props: TableBodyProps) {
  // console.log("render body");

  const { activeCell, selectedRange } = props.state;

  const isEditCellRef = useRef(false);
  isEditCellRef.current = activeCell?.editingValue != null;

  useEffect(() => {
    // console.log("check window");
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return;
      const isEditCell = isEditCellRef.current;

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
          if (isEditCell) return;
          e.preventDefault();
          props.dispatch({
            type: "CLEAR_CELLS",
          });
          break;

        // case "Escape":
        //   if (!isEdit) return;
        //   e.preventDefault();

        //   props.dispatch({
        //     type: "NAVIGATE_CELLS",
        //     payload: {
        //       updateActiveCell: { editingValue: null },
        //     },
        //   });

        //   break;
      }
      if (e.key.length == 1 && !isEditCell) {
        e.preventDefault();

        props.dispatch({
          type: "NAVIGATE_CELLS",
          payload: {
            updateActiveCell: { editingValue: e.key },
          },
        });
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function returnStatus(rowIndex: number, colIndex: number, isvalid: boolean) {
    if (
      activeCell?.rowIndex === rowIndex &&
      activeCell.colIndex === colIndex &&
      activeCell.editingValue !== null
    )
      return "edit";

    if (activeCell?.rowIndex === rowIndex && activeCell.colIndex === colIndex)
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
        status === "edit" && activeCell?.editingValue != null
          ? activeCell.editingValue
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
