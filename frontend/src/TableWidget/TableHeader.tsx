import type { TableHeaderProps } from "./types";

export function TableHeader(props: TableHeaderProps) {
  const handleMouseDown = (colIndex: number, rowIndex = 0) => {
    // console.log("click on header");
    props.dispatch({
      type: "NAVIGATE_CELLS",
      payload: {
        updateActiveCell: {
          rowIndex: rowIndex,
          colIndex: colIndex,
          editingValue: null,
        },
        farCell: { rowIndex: props.maxRowIndex, colIndex: colIndex },
      },
    });
  };

  const handleMouseEnter = (colIndex: number) => (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    // console.log("move across header");
    props.dispatch({
      type: "NAVIGATE_CELLS",
      payload: {
        farCell: { rowIndex: props.maxRowIndex, colIndex: colIndex },
      },
    });
  };

  return props.columns.map((column, colIndex) => (
    <div
      className="header"
      key={colIndex}
      onMouseDown={() => handleMouseDown(colIndex)}
      onMouseEnter={handleMouseEnter(colIndex)}
      onContextMenu={(e) => {
        e.preventDefault();
        // console.log("start contextMenu");
      }}
    >
      {column["header"]}
    </div>
  ));
}
