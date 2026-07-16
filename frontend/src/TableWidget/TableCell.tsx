import type { TableCellProps } from "./types";
import { memo } from "react";

export const TableCell = memo(
  (props: TableCellProps) => {
    if (props.status == "edit") {
      // console.log(`render editCell [${props.rowIndex}, ${props.colIndex}]`);
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
    }

    const handleDoubleClick = () => {
      // console.log("set edit");
      props.setEditCell({
        rowIndex: props.rowIndex,
        colIndex: props.colIndex,
        value: props.value,
      });
    };

    const handleMouseEnter = () => {
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
    };

    if (props.status == "active") {
      // console.log(`render activeCell [${props.rowIndex}, ${props.colIndex}]`);
      return (
        <div
          className="cell"
          data-status={props.status}
          onDoubleClick={handleDoubleClick}
          onMouseDown={() => {
            props.isSelecting.current = true;
            props.setSelectedRange(null);
          }}
          onMouseEnter={handleMouseEnter}
        >
          {props.value}
        </div>
      );
    }

    // console.log(`render defaultCell [${props.rowIndex}, ${props.colIndex}]`);
    return (
      <div
        className="cell"
        data-status={props.status}
        onMouseDown={() => {
          // console.log("click on defaultCell");
          props.setActiveCell({
            rowIndex: props.rowIndex,
            colIndex: props.colIndex,
          });
          props.isSelecting.current = true;
          props.setSelectedRange(null);
        }}
        onMouseEnter={handleMouseEnter}
        onDoubleClick={handleDoubleClick}
      >
        {props.value}
      </div>
    );
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
