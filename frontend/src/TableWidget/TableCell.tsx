import type { TableCellProps } from "./types";
import { memo } from "react";

export const TableCell = memo(
  (props: TableCellProps) => {
    if (props.status === "edit") {
      // console.log(`render editCell [${props.rowIndex}, ${props.colIndex}]`);

      return (
        <input
          className="cell"
          data-status={props.status}
          value={props.value}
          autoFocus
          onChange={(e) => {
            props.dispatch({
              type: "NAVIGATE_CELLS",
              payload: { updateActiveCell: { editingValue: e.target.value } },
            });
          }}
        ></input>
      );
    }

    const handleDoubleClick = () => {
      // console.log("doubleclick on cell");
      props.dispatch({
        type: "NAVIGATE_CELLS",
        payload: {
          updateActiveCell: {
            rowIndex: props.rowIndex,
            colIndex: props.colIndex,
            editingValue: props.value,
          },
        },
      });
    };

    const handleMouseDow = () => {
      if (props.status === "active" || props.status === "edit") {
        return;
      }
      // console.log("click on cell");
      props.dispatch({
        type: "NAVIGATE_CELLS",
        payload: {
          updateActiveCell: {
            rowIndex: props.rowIndex,
            colIndex: props.colIndex,
            editingValue: null,
          },
        },
      });
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
      if (e.buttons !== 1) return;
      // console.log("move across body");
      props.dispatch({
        type: "NAVIGATE_CELLS",
        payload: {
          farCell: {
            rowIndex: props.rowIndex,
            colIndex: props.colIndex,
          },
        },
      });
    };

    // console.log(
    //   `render ${props.status}Cell [${props.rowIndex}, ${props.colIndex}]`,
    // );
    return (
      <div
        className="cell"
        data-status={props.status}
        onMouseDown={handleMouseDow}
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
