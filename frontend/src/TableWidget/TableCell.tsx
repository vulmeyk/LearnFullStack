import type { TableCellProps } from "./types";

export function TableCell(props: TableCellProps) {
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
            const newRows = [...props.rows];
            newRows[props.rowIndex].values[props.colIndex] = e.target.value;
            props.setRows(newRows);
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
            if (!props.isSelecting.current || !props.activeCell) return;
            props.setSelectedRange({
              start: {
                rowIndex: Math.min(props.rowIndex, props.activeCell.rowIndex),
                colIndex: Math.min(props.colIndex, props.activeCell.colIndex),
              },
              end: {
                rowIndex: Math.max(props.rowIndex, props.activeCell.rowIndex),
                colIndex: Math.max(props.colIndex, props.activeCell.colIndex),
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
}
