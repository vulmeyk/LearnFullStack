import type { TableCellProps } from "./types";
import { memo } from "react";

export const TableCell = memo(
  (props: TableCellProps) => {
    // console.log(`render cell: [${props.rowIndex}, ${props.colIndex}]`);
    switch (props.status) {
      case "edit":
        // console.log("render editCell");
        return (
          <input
            className="cell"
            data-status={props.status}
            defaultValue={props.value}
            autoFocus
            onBlur={(e) => {
              // console.log("save input");

              props.setRows((prevRows) =>
                prevRows.map((row, rIdx) => {
                  if (rIdx !== props.rowIndex) return row;
                  const newValues = [...row.values];
                  newValues[props.colIndex] = e.target.value;
                  return {
                    ...row,
                    values: newValues,
                  };
                }),
              );
              props.setEditCell(null);
            }}
          ></input>
        );

      case "active":
        // console.log("render activeCell");
        return (
          <div
            className="cell"
            data-status={props.status}
            onDoubleClick={() => {
              // console.log("set edit");
              props.setEditCell({
                rowIndex: props.rowIndex,
                colIndex: props.colIndex,
              });
            }}
          >
            {props.value}
          </div>
        );

      default:
        return (
          <div
            className="cell"
            data-status={props.status}
            onMouseDown={() => {
              // console.log("set active");
              props.setActiveCell({
                rowIndex: props.rowIndex,
                colIndex: props.colIndex,
              });
              props.isSelecting.current = true;
              props.setSelectedRange(null);
            }}
            onMouseEnter={() => {
              const startCell = props.activeCellRef.current;
              if (!props.isSelecting.current || !startCell) return;
              props.setSelectedRange({
                start: {
                  rowIndex: Math.min(props.rowIndex, startCell.rowIndex),
                  colIndex: Math.min(props.colIndex, startCell.colIndex),
                },
                end: {
                  rowIndex: Math.max(props.rowIndex, startCell.rowIndex),
                  colIndex: Math.max(props.colIndex, startCell.colIndex),
                },
              });
            }}
            onDoubleClick={() => {
              // console.log("set edit");
              props.setEditCell({
                rowIndex: props.rowIndex,
                colIndex: props.colIndex,
              });
            }}
          >
            {props.value}
          </div>
        );
    }
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.status === nextProps.status &&
      prevProps.rowIndex === nextProps.rowIndex &&
      prevProps.colIndex === nextProps.colIndex
    );
  },
);
