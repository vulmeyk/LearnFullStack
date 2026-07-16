import type { TableHeaderProps } from "./types";

export function TableHeader(props: TableHeaderProps) {
  return props.columns.map((column, colIndex) => (
    <div
      className="header"
      key={colIndex}
      onClick={() => {
        // console.log("click on header");
        props.setActiveCell(null);

        props.setSelectedRange({
          start: { rowIndex: 0, colIndex: colIndex },
          end: { rowIndex: props.maxRowIndex, colIndex: colIndex },
        });
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        // console.log("start contextMenu");
      }}
    >
      {column["header"]}
    </div>
  ));
}
