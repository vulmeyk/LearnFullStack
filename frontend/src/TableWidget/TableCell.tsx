import type { TableCellProps } from "./types";
import { memo } from "react";

export const TableCell = memo(
  (props: TableCellProps) => {
    if (props.status == "edit") {
      console.log(`render editCell [${props.rowIndex}, ${props.colIndex}]`);

      return (
        <input
          className="cell"
          data-status={props.status}
          defaultValue={props.value}
          autoFocus
          onChange={(e) => {
            // console.log(e.target.value);
            props.dispatch({
              type: "NAVIGATE_CELLS",
              payload: { editCellValue: e.target.value },
            });
          }}
          // onBlur={(e) => {
          //   console.log("check");
          //   props.dispatch({
          //     type: "SAVE_INPUT",
          //     payload: {
          //       index: { rowIndex: props.rowIndex, colIndex: props.colIndex },
          //       value: e.target.value,
          //     },
          //   });
          // }}
        ></input>
      );
    }

    const handleDoubleClick = () => {
      console.log("set edit");
      props.dispatch({
        type: "NAVIGATE_CELLS",
        payload: {
          editCellIndex: {
            rowIndex: props.rowIndex,
            colIndex: props.colIndex,
          },
          isSelecting: true,
        },
      });
    };

    const handleMouseDows = () => {
      props.dispatch({
        type: "NAVIGATE_CELLS",
        payload: {
          activeCell: {
            rowIndex: props.rowIndex,
            colIndex: props.colIndex,
          },
          isSelecting: true,
        },
      });
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
      if (e.buttons !== 1) return;
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

    console.log(
      `render ${props.status}Cell [${props.rowIndex}, ${props.colIndex}]`,
    );
    return (
      <div
        className="cell"
        data-status={props.status}
        onMouseDown={handleMouseDows}
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
